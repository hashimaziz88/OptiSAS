'use client';

import React, { useEffect, useState } from 'react';
import { Button, DatePicker, Form, Input, Modal, Select, message } from 'antd';
import dayjs from 'dayjs';
import { ICreatePricingRequestDto, IPricingRequestDto, IUpdatePricingRequestDto } from '@/providers/pricingRequestProvider/context';
import { PRIORITY_OPTIONS } from '@/constants/pricingRequests';
import { useAuthState } from '@/providers/authProvider';
import { axiosInstance } from '@/utils/axiosInstance';
import { useStyles } from './style/style';

const BASE_URL = process.env.NEXT_PUBLIC_API_LINK;

interface OpportunityOption {
    value: string;
    label: string;
}

interface PricingRequestFormModalProps {
    open: boolean;
    editing: IPricingRequestDto | null;
    loading: boolean;
    onSubmit: (values: ICreatePricingRequestDto | IUpdatePricingRequestDto) => Promise<void>;
    onClose: () => void;
}

const PricingRequestFormModal: React.FC<PricingRequestFormModalProps> = ({
    open,
    editing,
    loading,
    onSubmit,
    onClose,
}) => {
    const { styles } = useStyles();
    const [form] = Form.useForm();
    const { user } = useAuthState();

    const [opportunities, setOpportunities] = useState<OpportunityOption[]>([]);
    const [opportunitiesLoading, setOpportunitiesLoading] = useState(false);

    useEffect(() => {
        if (!open) {
            form.resetFields();
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
    }, [open, editing, form]);

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
            await onSubmit(payload);
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
                            style={{ width: '100%' }}
                            size="large"
                            disabledDate={(d) => d?.isBefore(dayjs(), 'day')}
                        />
                    </Form.Item>

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
