'use client';

import React, { useEffect, useState } from 'react';
import {
    Button, Checkbox, DatePicker, Form, Input, InputNumber, Modal,
    Select, message,
} from 'antd';
import dayjs from 'dayjs';
import { IContractDto, ICreateContractDto, IUpdateContractDto } from '@/providers/contractProvider/context';
import { useAuthState } from '@/providers/authProvider';
import { axiosInstance } from '@/utils/axiosInstance';
import { ContractFormModalProps, OpportunityWithClientOption } from '@/types/componentProps';
import { useStyles } from './style/style';

const BASE_URL = process.env.NEXT_PUBLIC_API_LINK;

const ContractFormModal: React.FC<ContractFormModalProps> = ({
    open,
    editing,
    loading,
    onSubmit,
    onClose,
}) => {
    const { styles } = useStyles();
    const { user } = useAuthState();
    const [form] = Form.useForm();

    const [opportunities, setOpportunities] = useState<OpportunityWithClientOption[]>([]);
    const [optionsLoading, setOptionsLoading] = useState(false);
    const [selectedClientName, setSelectedClientName] = useState('');

    useEffect(() => {
        if (!open) {
            form.resetFields();
            setSelectedClientName('');
            return;
        }

        if (editing) {
            form.setFieldsValue({
                title: editing.title,
                contractValue: editing.contractValue,
                endDate: editing.endDate ? dayjs(editing.endDate) : undefined,
                renewalNoticePeriod: editing.renewalNoticePeriod,
                autoRenew: editing.autoRenew,
                terms: editing.terms,
            });
        } else {
            form.resetFields();
            setSelectedClientName('');
            const fetchOptions = async () => {
                setOptionsLoading(true);
                try {
                    const oppRes = await axiosInstance().get(`${BASE_URL}/api/Opportunities`, { params: { pageNumber: 1, pageSize: 200 } });
                    setOpportunities((oppRes.data?.items ?? []).map((o: { id: string; title: string; clientId: string; clientName: string }) => ({
                        value: o.id,
                        label: o.title,
                        clientId: o.clientId,
                        clientName: o.clientName,
                    })));
                } catch {
                    message.error('Failed to load options');
                } finally {
                    setOptionsLoading(false);
                }
            };
            fetchOptions();
        }
    }, [open, editing, form]);

    const handleOpportunityChange = (value: string) => {
        const opp = opportunities.find((o) => o.value === value);
        if (opp) {
            form.setFieldValue('clientId', opp.clientId);
            setSelectedClientName(opp.clientName);
        }
    };

    const handleSubmit = async () => {
        try {
            const values = await form.validateFields();
            if (editing) {
                const payload: IUpdateContractDto = {
                    title: values.title,
                    contractValue: values.contractValue,
                    endDate: values.endDate ? values.endDate.toISOString() : undefined,
                    renewalNoticePeriod: values.renewalNoticePeriod,
                    autoRenew: values.autoRenew,
                    terms: values.terms,
                };
                await onSubmit(payload);
            } else {
                const payload: ICreateContractDto = {
                    clientId: values.clientId,
                    opportunityId: values.opportunityId || undefined,
                    title: values.title,
                    contractValue: values.contractValue,
                    currency: 'ZAR',
                    startDate: values.startDate.toISOString(),
                    endDate: values.endDate.toISOString(),
                    renewalNoticePeriod: values.renewalNoticePeriod,
                    autoRenew: values.autoRenew ?? false,
                    terms: values.terms,
                    ownerId: user?.userId ?? '',
                };
                await onSubmit(payload);
            }
        } catch { }
    };

    return (
        <Modal
            open={open}
            title={editing ? 'Edit Contract' : 'Create Contract'}
            onCancel={onClose}
            footer={null}
            classNames={{ body: styles.modalBody, container: styles.modalContainer, header: styles.modalHeader }}
            destroyOnHidden
            width={680}
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
                                    placeholder="Select linked opportunity"
                                    options={opportunities}
                                    loading={optionsLoading}
                                    showSearch
                                    optionFilterProp="label"
                                    size="large"
                                    allowClear
                                    onChange={handleOpportunityChange}
                                    onClear={() => {
                                        form.setFieldValue('clientId', undefined);
                                        setSelectedClientName('');
                                    }}
                                />
                            </Form.Item>

                            <Form.Item name="clientId" hidden rules={[{ required: true, message: 'Select a client' }]}>
                                <Input />
                            </Form.Item>
                            <Form.Item label="Client">
                                <Input
                                    value={selectedClientName}
                                    readOnly
                                    placeholder="Auto-filled from opportunity"
                                    size="large"
                                    className={styles.disabledClientInput}
                                    style={{
                                        color: selectedClientName ? 'rgba(255,255,255,0.85)' : '#666',
                                        WebkitTextFillColor: selectedClientName ? 'rgba(255,255,255,0.85)' : '#666',
                                    }}
                                />
                            </Form.Item>
                        </>
                    )}

                    <Form.Item
                        name="title"
                        label="Title"
                        rules={[{ required: true, message: 'Please enter a title' }]}
                    >
                        <Input placeholder="e.g. Enterprise SLA 2026" size="large" />
                    </Form.Item>

                    <Form.Item
                        name="contractValue"
                        label="Contract Value (ZAR)"
                        rules={[{ required: true, message: 'Please enter a value' }]}
                    >
                        <InputNumber<number>
                            placeholder="0"
                            min={0}
                            size="large"
                            className={styles.fullWidth}
                            formatter={(v) => `${v}`.replaceAll(/(?<=\d)(?=(\d{3})+$)/g, ',')}
                            parser={(v): number => Number(v?.replaceAll(',', '') ?? '0')}
                        />
                    </Form.Item>

                    <div className={styles.formRow}>
                        {!editing && (
                            <Form.Item
                                name="startDate"
                                label="Start Date"
                                rules={[{ required: true, message: 'Select start date' }]}
                            >
                                <DatePicker className={styles.fullWidth} size="large" />
                            </Form.Item>
                        )}
                        <Form.Item
                            name="endDate"
                            label="End Date"
                            rules={[{ required: true, message: 'Select end date' }]}
                            className={editing ? styles.gridSpanFull : undefined}
                        >
                            <DatePicker className={styles.fullWidth} size="large" />
                        </Form.Item>
                    </div>

                    <div className={styles.formRow}>
                        <Form.Item name="renewalNoticePeriod" label="Renewal Notice (days)">
                            <InputNumber placeholder="30" min={0} size="large" className={styles.fullWidth} />
                        </Form.Item>
                        <Form.Item name="autoRenew" valuePropName="checked" >
                            <Checkbox className={styles.whiteCheckboxLabel}>Enable auto-renewal</Checkbox>
                        </Form.Item>
                    </div>

                    <Form.Item name="terms" label="Terms">
                        <Input.TextArea placeholder="Contract terms and conditions..." rows={4} size="large" />
                    </Form.Item>

                    <Button
                        type="primary"
                        className={styles.submitButton}
                        loading={loading}
                        onClick={handleSubmit}
                    >
                        {editing ? 'Save Changes' : 'Create Contract'}
                    </Button>
                </Form>
            </div>
        </Modal>
    );
};

export default ContractFormModal;
