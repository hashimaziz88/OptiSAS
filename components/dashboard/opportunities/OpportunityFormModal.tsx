'use client';

import React, { useEffect } from 'react';
import { Form, Input, InputNumber, Select, Modal, Button, DatePicker } from 'antd';
import dayjs from 'dayjs';
import { IOpportunityDto, ICreateOpportunityDto, IUpdateOpportunityDto } from '@/providers/opportunityProvider/context';
import { IClientDto } from '@/providers/clientProvider/context';
import { OPPORTUNITY_STAGE_OPTIONS, OPPORTUNITY_SOURCE_OPTIONS } from '@/constants/opportunities';
import { useStyles, modalStyles } from './style/style';

interface OpportunityFormModalProps {
    open: boolean;
    editing?: IOpportunityDto | null;
    loading: boolean;
    clients: IClientDto[];
    onSubmit: (values: ICreateOpportunityDto | IUpdateOpportunityDto) => void;
    onClose: () => void;
}

const OpportunityFormModal: React.FC<OpportunityFormModalProps> = ({
    open, editing, loading, clients, onSubmit, onClose,
}) => {
    const { styles } = useStyles();
    const [form] = Form.useForm();

    useEffect(() => {
        if (open) {
            if (editing) {
                form.setFieldsValue({
                    title: editing.title,
                    clientId: editing.clientId,
                    estimatedValue: editing.estimatedValue,
                    currency: 'ZAR',
                    stage: editing.stage,
                    probability: editing.probability,
                    source: editing.source,
                    expectedCloseDate: editing.expectedCloseDate ? dayjs(editing.expectedCloseDate) : null,
                    description: editing.description,
                });
            } else {
                form.resetFields();
                form.setFieldsValue({ currency: 'ZAR', stage: 1, probability: 10 });
            }
        }
    }, [open, editing, form]);

    const clientOptions = clients.map((c) => ({ label: c.name, value: c.id }));

    const handleFinish = (values: Record<string, unknown>) => {
        const payload = {
            ...values,
            expectedCloseDate: values.expectedCloseDate
                ? (values.expectedCloseDate as dayjs.Dayjs).toISOString()
                : undefined,
        };
        onSubmit(payload as ICreateOpportunityDto | IUpdateOpportunityDto);
    };

    return (
        <Modal
            open={open}
            title={editing ? 'Edit Opportunity' : 'New Opportunity'}
            onCancel={onClose}
            footer={null}
            width={620}
            destroyOnHidden
            className={styles.modal}
            styles={modalStyles}
        >
            <div className={styles.formBody}>
                <Form
                    form={form}
                    layout="vertical"
                    requiredMark={false}
                    onFinish={handleFinish}
                >
                    <Form.Item
                        label="Title"
                        name="title"
                        rules={[{ required: true, message: 'Please enter a title' }]}
                    >
                        <Input placeholder="ERP System Implementation" size="large" />
                    </Form.Item>

                    {!editing && (
                        <Form.Item
                            label="Client"
                            name="clientId"
                            rules={[{ required: true, message: 'Please select a client' }]}
                        >
                            <Select
                                size="large"
                                placeholder="Select a client"
                                options={clientOptions}
                                showSearch
                            />
                        </Form.Item>
                    )}

                    <div className={styles.formRow}>
                        <Form.Item
                            label="Estimated Value"
                            name="estimatedValue"
                            rules={[{ required: true, message: 'Required' }]}
                        >
                            <InputNumber<number>
                                size="large"
                                placeholder="500000"
                                min={0}
                                formatter={(v) => `${v}`.replaceAll(/(?<=\d)(?=(\d{3})+$)/g, ',')}
                                parser={(v): number => Number(v?.replaceAll(',', '') ?? '0')}
                                style={{ width: '100%' }}
                            />
                        </Form.Item>

                        <Form.Item label="Currency" name="currency" hidden initialValue="ZAR">
                            <Input />
                        </Form.Item>
                    </div>

                    <div className={styles.formRow}>
                        {!editing && (
                            <Form.Item label="Stage" name="stage">
                                <Select size="large" options={OPPORTUNITY_STAGE_OPTIONS} />
                            </Form.Item>
                        )}

                        <Form.Item label="Probability (%)" name="probability">
                            <InputNumber<number>
                                size="large"
                                min={0}
                                max={100}
                                formatter={(v) => `${v}%`}
                                parser={(v): number => Number(v?.replaceAll('%', '') ?? '0')}
                                style={{ width: '100%' }}
                            />
                        </Form.Item>
                    </div>

                    <div className={styles.formRow}>
                        <Form.Item label="Source" name="source">
                            <Select size="large" options={OPPORTUNITY_SOURCE_OPTIONS} placeholder="Select source" allowClear />
                        </Form.Item>

                        <Form.Item
                            label="Expected Close Date"
                            name="expectedCloseDate"
                            rules={[{ required: true, message: 'Required' }]}
                        >
                            <DatePicker size="large" style={{ width: '100%' }} />
                        </Form.Item>
                    </div>

                    <Form.Item label="Description" name="description">
                        <Input.TextArea placeholder="Brief summary of the opportunity..." rows={3} />
                    </Form.Item>

                    <Form.Item className={styles.formFooter}>
                        <div className={styles.formFooterActions}>
                            <Button onClick={onClose} size="large">Cancel</Button>
                            <Button type="primary" htmlType="submit" loading={loading} size="large">
                                {editing ? 'Save Changes' : 'Create Opportunity'}
                            </Button>
                        </div>
                    </Form.Item>
                </Form>
            </div>
        </Modal>
    );
};

export default OpportunityFormModal;
