'use client';

import React, { useEffect, useState } from 'react';
import {
    Button, DatePicker, Form, Input, InputNumber, Modal,
    Select, Table, Typography, message,
} from 'antd';
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import dayjs from 'dayjs';
import { ICreateProposalDto, ICreateProposalLineItemDto, IProposalDto, IUpdateProposalDto } from '@/providers/proposalProvider/context';
import { axiosInstance } from '@/utils/axiosInstance';
import { useStyles } from './style/style';

const { Text } = Typography;
const BASE_URL = process.env.NEXT_PUBLIC_API_LINK;

interface OpportunityOption {
    value: string;
    label: string;
    clientId: string;
    clientName: string;
}

interface DraftLineItem extends ICreateProposalLineItemDto {
    _key: number;
}

const calcLineTotal = (item: ICreateProposalLineItemDto): number => {
    const qty = item.quantity ?? 0;
    const price = item.unitPrice ?? 0;
    const disc = item.discount ?? 0;
    const tax = item.taxRate ?? 0;
    return qty * price * (1 - disc / 100) * (1 + tax / 100);
};

interface ProposalFormModalProps {
    open: boolean;
    editing: IProposalDto | null;
    loading: boolean;
    onSubmit: (values: ICreateProposalDto | IUpdateProposalDto) => Promise<void>;
    onClose: () => void;
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

    const [opportunities, setOpportunities] = useState<OpportunityOption[]>([]);
    const [selectedClientName, setSelectedClientName] = useState<string>('');
    const [optionsLoading, setOptionsLoading] = useState(false);
    const [lineItems, setLineItems] = useState<DraftLineItem[]>([]);
    const [nextKey, setNextKey] = useState(1);
    const [lineForm] = Form.useForm();

    useEffect(() => {
        if (!open) {
            form.resetFields();
            lineForm.resetFields();
            setLineItems([]);
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
                setOpportunities(
                    (oppRes.data?.items ?? []).map((o: { id: string; title: string; clientId: string; clientName: string }) => ({
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
        } catch {
            // validation failed
        }
    };

    const removeLineItem = (key: number) => {
        setLineItems((prev) => prev.filter((li) => li._key !== key));
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
                    style={{ color: '#f87171' }}
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
        } catch {
            // validation failed
        }
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
                            style={{ width: '100%' }}
                            size="large"
                            disabledDate={(d) => d?.isBefore(dayjs(), 'day')}
                        />
                    </Form.Item>

                    {!editing && (
                        <>
                            <div className={styles.sectionTitle}>Line Items</div>

                            <Form form={lineForm} layout="inline" className={styles.addLineItemRow}>
                                <Form.Item
                                    name="productServiceName"
                                    rules={[{ required: true, message: 'Required' }]}
                                    style={{ flex: 2, minWidth: 120 }}
                                >
                                    <Input placeholder="Product / Service" size="middle" />
                                </Form.Item>
                                <Form.Item name="description" style={{ flex: 2, minWidth: 100 }}>
                                    <Input placeholder="Description" size="middle" />
                                </Form.Item>
                                <Form.Item
                                    name="quantity"
                                    rules={[{ required: true, message: 'Required' }]}
                                    style={{ width: 70 }}
                                >
                                    <InputNumber placeholder="Qty" min={1} size="middle" style={{ width: '100%' }} />
                                </Form.Item>
                                <Form.Item
                                    name="unitPrice"
                                    rules={[{ required: true, message: 'Required' }]}
                                    style={{ width: 100 }}
                                >
                                    <InputNumber placeholder="Price" min={0} size="middle" style={{ width: '100%' }} />
                                </Form.Item>
                                <Form.Item name="discount" style={{ width: 80 }}>
                                    <InputNumber placeholder="Disc%" min={0} max={100} size="middle" style={{ width: '100%' }} />
                                </Form.Item>
                                <Form.Item name="taxRate" style={{ width: 80 }}>
                                    <InputNumber placeholder="Tax%" min={0} size="middle" style={{ width: '100%' }} />
                                </Form.Item>
                                <Form.Item>
                                    <Button icon={<PlusOutlined />} type="dashed" onClick={addLineItem} size="middle">
                                        Add
                                    </Button>
                                </Form.Item>
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
