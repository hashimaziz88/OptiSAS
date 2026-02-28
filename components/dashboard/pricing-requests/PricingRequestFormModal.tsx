'use client';

import React, { useEffect, useState } from 'react';
import { Button, DatePicker, Form, Input, Modal, Select, message } from 'antd';
import dayjs from 'dayjs';
import { ICreatePricingRequestDto, IPricingRequestDto, IUpdatePricingRequestDto } from '@/providers/pricingRequestProvider/context';
import { PRIORITY_OPTIONS } from '@/constants/pricingRequests';
import { useAuthState } from '@/providers/authProvider';
import { axiosInstance } from '@/utils/axiosInstance';
import { PricingRequestFormModalProps } from '@/types/componentProps';
import { useStyles } from './style/style';

const BASE_URL = process.env.NEXT_PUBLIC_API_LINK;

const PricingRequestFormModal: React.FC<PricingRequestFormModalProps> = ({
    open,
    editing,
    loading,
    canAssign,
    onSubmit,
    onClose,
}) => {
    const { styles } = useStyles();
    const [form] = Form.useForm();
    const { user } = useAuthState();
    const currentUserName = [user?.firstName, user?.lastName].filter(Boolean).join(' ') || user?.email || 'You';

    const [opportunities, setOpportunities] = useState<{ value: string; label: string }[]>([]);
    const [opportunitiesLoading, setOpportunitiesLoading] = useState(false);
    const [userOptions, setUserOptions] = useState<{ value: string; label: string }[]>([]);
    const [usersLoading, setUsersLoading] = useState(false);
    const [assignToUserId, setAssignToUserId] = useState<string | undefined>(undefined);

    useEffect(() => {
        if (!open) {
            form.resetFields();
            setAssignToUserId(undefined);
            return;
        }
        if (editing) {
            form.setFieldsValue({
                title: editing.title,
                description: editing.description,
                priority: editing.priority,
                opportunityId: editing.opportunityId,
                requiredByDate: editing.requiredByDate ? dayjs(editing.requiredByDate) : undefined,
            });
        } else {
            form.resetFields();
            setAssignToUserId(undefined);
        }

        const fetchOpportunities = async () => {
            setOpportunitiesLoading(true);
            try {
                const res = await axiosInstance().get(`${BASE_URL}/api/Opportunities`, {
                    params: { pageNumber: 1, pageSize: 200 },
                });
                const items = res.data?.items ?? [];
                setOpportunities(
                    items.map((item: { id: string; title: string }) => ({
                        value: item.id,
                        label: item.title,
                    }))
                );
            } catch {
                message.error('Failed to load opportunities');
            } finally {
                setOpportunitiesLoading(false);
            }
        };

        fetchOpportunities();

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
    }, [open, editing, form, canAssign, userOptions.length]);

    const handleSubmit = async () => {
        try {
            const values = await form.validateFields();
            const payload = {
                ...values,
                requiredByDate: values.requiredByDate
                    ? values.requiredByDate.toISOString()
                    : undefined,
                ...(!editing && { requestedById: user?.userId }),
            };
            await onSubmit(payload, !editing ? assignToUserId : undefined);
        } catch { }
    };

    return (
        <Modal
            open={open}
            title={editing ? 'Edit Pricing Request' : 'Create Pricing Request'}
            onCancel={onClose}
            footer={null}
            classNames={{ body: styles.modalBody, container: styles.modalContainer, header: styles.modalHeader }}
            destroyOnHidden
            width={540}
        >
            <div className={styles.formBody}>
                <Form form={form} layout="vertical" requiredMark={false}>
                    <Form.Item
                        name="opportunityId"
                        label="Opportunity"
                        rules={[{ required: true, message: 'Please select an opportunity' }]}
                    >
                        <Select
                            placeholder="Select opportunity"
                            options={opportunities}
                            loading={opportunitiesLoading}
                            showSearch
                            optionFilterProp="label"
                            size="large"
                        />
                    </Form.Item>

                    <Form.Item
                        name="title"
                        label="Title"
                        rules={[{ required: true, message: 'Please enter a title' }]}
                    >
                        <Input placeholder="e.g. Q3 Enterprise Licence Pricing" size="large" />
                    </Form.Item>

                    <Form.Item name="description" label="Description">
                        <Input.TextArea
                            placeholder="Describe what pricing information is needed..."
                            rows={3}
                            size="large"
                        />
                    </Form.Item>

                    <Form.Item name="priority" label="Priority">
                        <Select
                            placeholder="Select priority"
                            options={PRIORITY_OPTIONS}
                            allowClear
                            size="large"
                        />
                    </Form.Item>

                    <Form.Item name="requiredByDate" label="Required By">
                        <DatePicker
                            className={styles.fullWidth}
                            size="large"
                            disabledDate={(d) => d?.isBefore(dayjs(), 'day')}
                        />
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
                            <Form.Item label="Requested By">
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

                    <Button
                        type="primary"
                        className={styles.submitButton}
                        loading={loading}
                        onClick={handleSubmit}
                    >
                        {editing ? 'Save Changes' : 'Create Request'}
                    </Button>
                </Form>
            </div>
        </Modal>
    );
};

export default PricingRequestFormModal;
