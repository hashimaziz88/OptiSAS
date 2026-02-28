'use client';

import React, { useEffect, useState } from 'react';
import { Form, Input, InputNumber, Select, Modal, Button, DatePicker } from 'antd';
import dayjs from 'dayjs';
import { IOpportunityDto, ICreateOpportunityDto, IUpdateOpportunityDto } from '@/providers/opportunityProvider/context';
import { IClientDto } from '@/providers/clientProvider/context';
import { OPPORTUNITY_STAGE_OPTIONS, OPPORTUNITY_SOURCE_OPTIONS } from '@/constants/opportunities';
import { OpportunityFormModalProps } from '@/types/componentProps';
import { useAuthState } from '@/providers/authProvider';
import { axiosInstance } from '@/utils/axiosInstance';
import { useStyles } from './style/style';

const BASE_URL = process.env.NEXT_PUBLIC_API_LINK;

const OpportunityFormModal: React.FC<OpportunityFormModalProps> = ({
    open, editing, loading, clients, canAssign, onSubmit, onClose,
}) => {
    const { styles } = useStyles();
    const [form] = Form.useForm();
    const { user } = useAuthState();
    const currentUserName = [user?.firstName, user?.lastName].filter(Boolean).join(' ') || user?.email || 'You';

    const [userOptions, setUserOptions] = useState<{ value: string; label: string }[]>([]);
    const [usersLoading, setUsersLoading] = useState(false);
    const [assignToUserId, setAssignToUserId] = useState<string | undefined>(undefined);

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
                setAssignToUserId(undefined);
            }

            if (canAssign && !editing && userOptions.length === 0) {
                setUsersLoading(true);
                axiosInstance()
                    .get(`${BASE_URL}/api/users`, { params: { pageSize: 200 } })
                    .then((res) => {
                        setUserOptions(
                            (res.data?.items ?? []).map((u: { id: string; fullName: string; roles: string[] }) => ({
                                value: u.id,
                                label: `${u.fullName}${u.roles?.length ? ` (${u.roles[0]})` : ''}`,
                            }))
                        );
                    })
                    .catch(() => { })
                    .finally(() => setUsersLoading(false));
            }
        }
    }, [open, editing, form, canAssign, userOptions.length]);

    const clientOptions = clients.map((c: IClientDto) => ({ label: c.name, value: c.id }));

    const handleFinish = (values: Record<string, unknown>) => {
        const payload = {
            ...values,
            expectedCloseDate: values.expectedCloseDate
                ? (values.expectedCloseDate as dayjs.Dayjs).toISOString()
                : undefined,
        };
        onSubmit(payload as ICreateOpportunityDto | IUpdateOpportunityDto, !editing ? assignToUserId : undefined);
    };

    return (
        <Modal
            open={open}
            title={editing ? 'Edit Opportunity' : 'New Opportunity'}
            onCancel={onClose}
            footer={null}
            width={620}
            destroyOnHidden
            classNames={{ body: styles.modalBody, container: styles.modalContainer, header: styles.modalHeader }}
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
                                optionFilterProp="label"
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
                                className={styles.fullWidth}
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
                                className={styles.fullWidth}
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
                            <DatePicker size="large" className={styles.fullWidth} />
                        </Form.Item>
                    </div>

                    <Form.Item label="Description" name="description">
                        <Input.TextArea placeholder="Brief summary of the opportunity..." rows={3} />
                    </Form.Item>

                    {!editing && (
                        canAssign ? (
                            <Form.Item label="Assign To">
                                <Select
                                    size="large"
                                    showSearch
                                    optionFilterProp="label"
                                    options={userOptions}
                                    loading={usersLoading}
                                    placeholder="Select a team member (optional)"
                                    allowClear
                                    value={assignToUserId}
                                    onChange={(val) => setAssignToUserId(val)}
                                />
                            </Form.Item>
                        ) : (
                            <Form.Item label="Owner">
                                <Input
                                    size="large"
                                    value={currentUserName}
                                    disabled
                                    className={styles.disabledInput}
                                    suffix={<span className={styles.inputSuffix}>you</span>}
                                />
                            </Form.Item>
                        )
                    )}

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
