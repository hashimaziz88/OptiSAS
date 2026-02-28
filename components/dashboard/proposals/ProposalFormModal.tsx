'use client';

import React, { useEffect, useState } from 'react';
import {
    Button, DatePicker, Form, Input, InputNumber, Modal,
    Select, Table, Typography, message,
} from 'antd';
import { DeleteOutlined, PlusOutlined, ThunderboltOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import dayjs from 'dayjs';
import { ICreateProposalDto, ICreateProposalLineItemDto, IProposalDto, IUpdateProposalDto } from '@/providers/proposalProvider/context';
import { axiosInstance } from '@/utils/axiosInstance';
import { calcLineTotal } from '@/utils/dashboard/proposals';
import { ProposalFormModalProps, DraftLineItem, OpportunityWithClientOption } from '@/types/componentProps';
import { useStyles } from './style/style';

const { Text } = Typography;
const BASE_URL = process.env.NEXT_PUBLIC_API_LINK;

interface OpportunityRaw {
    id: string;
    title: string;
    clientId: string;
    clientName: string;
    stageName: string;
    estimatedValue: number;
    currency: string;
    probability: number;
    description: string;
    expectedCloseDate: string;
}

const ProposalFormModal: React.FC<ProposalFormModalProps> = ({
    open,
    editing,
    loading,
    onSubmit,
    onClose,
}) => {
    const { styles } = useStyles();
    const [form] = Form.useForm();

    const [opportunities, setOpportunities] = useState<OpportunityWithClientOption[]>([]);
    const [opportunitiesRaw, setOpportunitiesRaw] = useState<OpportunityRaw[]>([]);
    const [selectedClientName, setSelectedClientName] = useState<string>('');
    const [optionsLoading, setOptionsLoading] = useState(false);
    const [lineItems, setLineItems] = useState<DraftLineItem[]>([]);
    const [nextKey, setNextKey] = useState(1);
    const [lineForm] = Form.useForm();
    const [aiDraftLoading, setAiDraftLoading] = useState(false);
    const selectedOppId = Form.useWatch('opportunityId', form);

    useEffect(() => {
        if (!open) {
            form.resetFields();
            lineForm.resetFields();
            setLineItems([]);
            setOpportunitiesRaw([]);
            return;
        }

        if (editing) {
            form.setFieldsValue({
                title: editing.title,
                description: editing.description,
                validUntil: editing.validUntil ? dayjs(editing.validUntil) : undefined,
            });
        } else {
            form.resetFields();
            setLineItems([]);
            setSelectedClientName('');
        }

        const fetchOptions = async () => {
            setOptionsLoading(true);
            try {
                const oppRes = await axiosInstance().get(`${BASE_URL}/api/Opportunities`, { params: { pageNumber: 1, pageSize: 200 } });
                const items: OpportunityRaw[] = oppRes.data?.items ?? [];
                setOpportunitiesRaw(items);
                setOpportunities(
                    items.map((o) => ({
                        value: o.id,
                        label: o.title,
                        clientId: o.clientId,
                        clientName: o.clientName,
                    }))
                );
            } catch {
                message.error('Failed to load opportunities');
            } finally {
                setOptionsLoading(false);
            }
        };

        fetchOptions();
    }, [open, editing, form, lineForm]);

    const addLineItem = async () => {
        try {
            const values = await lineForm.validateFields();
            setLineItems((prev) => [...prev, { ...values, _key: nextKey }]);
            setNextKey((k) => k + 1);
            lineForm.resetFields();
        } catch { }
    };

    const removeLineItem = (key: number) => {
        setLineItems((prev) => prev.filter((li) => li._key !== key));
    };

    const handleDraftWithAI = async () => {
        const opp = opportunitiesRaw.find((o) => o.id === selectedOppId);
        if (!opp) return;

        setAiDraftLoading(true);
        try {
            const res = await fetch('/api/ai-proposal-draft', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    opportunityTitle: opp.title,
                    clientName: opp.clientName,
                    stage: opp.stageName,
                    estimatedValue: opp.estimatedValue,
                    currency: opp.currency || 'ZAR',
                    probability: opp.probability ?? 0,
                    description: opp.description,
                    expectedCloseDate: opp.expectedCloseDate,
                }),
            });

            if (!res.ok) {
                const err = await res.json() as { error?: string };
                message.error(err.error ?? 'AI draft failed. Please try again.');
                return;
            }

            const data = await res.json() as { title: string; description: string };
            form.setFieldsValue({ title: data.title, description: data.description });
            message.success('AI has drafted your proposal title and description.');
        } catch {
            message.error('Failed to connect to the AI service.');
        } finally {
            setAiDraftLoading(false);
        }
    };

    const grandTotal = lineItems.reduce((sum, li) => sum + calcLineTotal(li), 0);

    const lineColumns: ColumnsType<DraftLineItem> = [
        { title: 'Product / Service', dataIndex: 'productServiceName', key: 'productServiceName', ellipsis: true },
        { title: 'Qty', dataIndex: 'quantity', key: 'quantity', width: 60 },
        { title: 'Unit Price', dataIndex: 'unitPrice', key: 'unitPrice', width: 100, render: (v: number) => v.toFixed(2) },
        { title: 'Disc %', dataIndex: 'discount', key: 'discount', width: 70, render: (v: number) => `${v ?? 0}%` },
        { title: 'Tax %', dataIndex: 'taxRate', key: 'taxRate', width: 70, render: (v: number) => `${v ?? 0}%` },
        { title: 'Total', key: 'total', width: 100, render: (_: unknown, record) => calcLineTotal(record).toFixed(2) },
        {
            title: '',
            key: 'actions',
            width: 50,
            render: (_: unknown, record) => (
                <Button
                    type="text"
                    size="small"
                    icon={<DeleteOutlined />}
                    className={styles.deleteAction}
                    onClick={() => removeLineItem(record._key)}
                />
            ),
        },
    ];

    const handleSubmit = async () => {
        try {
            const values = await form.validateFields();
            const payload = {
                ...values,
                currency: 'ZAR',
                validUntil: values.validUntil ? values.validUntil.toISOString() : undefined,
                ...(!editing && {
                    lineItems: lineItems.map((li): ICreateProposalLineItemDto => ({
                        productServiceName: li.productServiceName,
                        description: li.description,
                        quantity: li.quantity,
                        unitPrice: li.unitPrice,
                        discount: li.discount,
                        taxRate: li.taxRate,
                    })),
                }),
            };
            await onSubmit(payload);
        } catch { }
    };

    return (
        <Modal
            open={open}
            title={editing ? 'Edit Proposal' : 'Create Proposal'}
            onCancel={onClose}
            footer={null}
            classNames={{ body: styles.modalBody, container: styles.modalContainer, header: styles.modalHeader }}
            destroyOnHidden
            width={760}
        >
            <div className={styles.formBody}>
                <Form form={form} layout="vertical" requiredMark={false}>
                    {!editing && (
                        <>
                            <Form.Item
                                name="opportunityId"
                                label="Opportunity"
                                rules={[{ required: true, message: 'Select an opportunity' }]}
                            >
                                <Select
                                    placeholder="Select opportunity"
                                    options={opportunities}
                                    loading={optionsLoading}
                                    showSearch
                                    optionFilterProp="label"
                                    size="large"
                                    onChange={(value: string) => {
                                        const opp = opportunities.find((o) => o.value === value);
                                        if (opp) {
                                            form.setFieldValue('clientId', opp.clientId);
                                            setSelectedClientName(opp.clientName);
                                        }
                                    }}
                                />
                            </Form.Item>
                            <Form.Item name="clientId" hidden>
                                <Input />
                            </Form.Item>
                            {selectedClientName && (
                                <Form.Item label="Client">
                                    <Input value={selectedClientName} size="large" disabled />
                                </Form.Item>
                            )}
                        </>
                    )}

                    {!editing && (
                        <div className={styles.aiDraftRow}>
                            <Button
                                type="default"
                                size="small"
                                icon={<ThunderboltOutlined />}
                                loading={aiDraftLoading}
                                disabled={!selectedOppId || aiDraftLoading}
                                onClick={handleDraftWithAI}
                                className={styles.aiDraftBtn}
                            >
                                Draft with AI
                            </Button>
                        </div>
                    )}

                    <Form.Item
                        name="title"
                        label="Title"
                        rules={[{ required: true, message: 'Please enter a title' }]}
                    >
                        <Input placeholder="e.g. Enterprise Software Licence Proposal" size="large" />
                    </Form.Item>

                    <Form.Item name="description" label="Description">
                        <Input.TextArea placeholder="Optional – describe the scope of this proposal..." rows={3} size="large" />
                    </Form.Item>

                    <Form.Item name="validUntil" label="Valid Until">
                        <DatePicker
                            className={styles.fullWidth}
                            size="large"
                            disabledDate={(d) => d?.isBefore(dayjs(), 'day')}
                        />
                    </Form.Item>

                    {!editing && (
                        <>
                            <div className={styles.sectionTitle}>Line Items</div>

                            <Form form={lineForm} layout="vertical" className={styles.addLineItemRow}>
                                <div className={styles.lineItemTopRow}>
                                    <Form.Item
                                        name="productServiceName"
                                        label="Product / Service"
                                        rules={[{ required: true, message: 'Required' }]}
                                        className={styles.lineItemField}
                                    >
                                        <Input placeholder="e.g. Software Licence" />
                                    </Form.Item>
                                    <Form.Item
                                        name="description"
                                        label="Description"
                                        className={styles.lineItemField}
                                    >
                                        <Input placeholder="Optional details" />
                                    </Form.Item>
                                </div>
                                <div className={styles.lineItemBottomRow}>
                                    <Form.Item
                                        name="quantity"
                                        label="Qty"
                                        rules={[{ required: true, message: 'Required' }]}
                                        className={styles.lineItemField}
                                    >
                                        <InputNumber placeholder="1" min={1} className={styles.fullWidth} />
                                    </Form.Item>
                                    <Form.Item
                                        name="unitPrice"
                                        label="Unit Price"
                                        rules={[{ required: true, message: 'Required' }]}
                                        className={styles.lineItemField}
                                    >
                                        <InputNumber placeholder="0.00" min={0} className={styles.fullWidth} />
                                    </Form.Item>
                                    <Form.Item name="discount" label="Disc %" className={styles.lineItemField}>
                                        <InputNumber placeholder="0" min={0} max={100} className={styles.fullWidth} />
                                    </Form.Item>
                                    <Form.Item name="taxRate" label="Tax %" className={styles.lineItemField}>
                                        <InputNumber placeholder="0" min={0} className={styles.fullWidth} />
                                    </Form.Item>
                                    <Form.Item label=" " className={styles.lineItemField}>
                                        <Button icon={<PlusOutlined />} type="dashed" onClick={addLineItem} block>
                                            Add
                                        </Button>
                                    </Form.Item>
                                </div>
                            </Form>

                            {lineItems.length > 0 && (
                                <>
                                    <Table<DraftLineItem>
                                        className={styles.lineItemsTable}
                                        rowKey="_key"
                                        columns={lineColumns}
                                        dataSource={lineItems}
                                        pagination={false}
                                        size="small"
                                        scroll={{ x: 480 }}
                                    />
                                    <div className={styles.totalRow}>
                                        <Text>Grand Total:</Text>
                                        <Text strong>
                                            {grandTotal.toLocaleString('en-ZA', { minimumFractionDigits: 2 })}
                                        </Text>
                                    </div>
                                </>
                            )}
                        </>
                    )}

                    <Button
                        type="primary"
                        className={styles.submitButton}
                        loading={loading}
                        onClick={handleSubmit}
                    >
                        {editing ? 'Save Changes' : 'Create Proposal'}
                    </Button>
                </Form>
            </div>
        </Modal>
    );
};

export default ProposalFormModal;
