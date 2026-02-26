'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { Form, Input, Select, Modal, Button, DatePicker, InputNumber, Row, Col } from 'antd';
import dayjs from 'dayjs';
import { IActivityDto, ICreateActivityDto, IUpdateActivityDto } from '@/providers/activityProvider/context';
import { ACTIVITY_TYPE_OPTIONS } from '@/constants/activities';
import { axiosInstance } from '@/utils/axiosInstance';
import { useAuthState } from '@/providers/authProvider';
import { useStyles } from './style/style';

const BASE_URL = process.env.NEXT_PUBLIC_API_LINK;

const PRIORITY_OPTIONS = [
    { value: 1, label: 'Low' },
    { value: 2, label: 'Medium' },
    { value: 3, label: 'High' },
    { value: 4, label: 'Urgent' },
];

const RELATED_TO_TYPE_OPTIONS = [
    { value: 1, label: 'Client' },
    { value: 2, label: 'Opportunity' },
    { value: 3, label: 'Proposal' },
    { value: 4, label: 'Contract' },
];

const RELATED_ENDPOINTS: Record<number, string> = {
    1: '/api/Clients',
    2: '/api/Opportunities',
    3: '/api/Proposals',
    4: '/api/Contracts',
};

const getRecordLabel = (type: number, record: Record<string, string>): string => {
    if (type === 1) return record.name;
    return record.title;
};

interface ActivityFormModalProps {
    open: boolean;
    editing?: IActivityDto | null;
    loading: boolean;
    onSubmit: (values: ICreateActivityDto | IUpdateActivityDto) => void;
    onClose: () => void;
}

const ActivityFormModal: React.FC<ActivityFormModalProps> = ({ open, editing, loading, onSubmit, onClose }) => {
    const { styles } = useStyles();
    const [form] = Form.useForm();
    const { user } = useAuthState();
    const currentUserName = [user?.firstName, user?.lastName].filter(Boolean).join(' ') || user?.email || 'You';
    const [relatedToType, setRelatedToType] = useState<number | undefined>(undefined);
    const [relatedOptions, setRelatedOptions] = useState<{ value: string; label: string }[]>([]);
    const [relatedLoading, setRelatedLoading] = useState(false);

    const fetchRelatedRecords = useCallback(async (type: number) => {
        setRelatedLoading(true);
        setRelatedOptions([]);
        try {
            const res = await axiosInstance().get(`${BASE_URL}${RELATED_ENDPOINTS[type]}`, {
                params: { pageSize: 100, pageNumber: 1 },
            });
            const items: Record<string, string>[] = res.data?.items ?? res.data ?? [];
            setRelatedOptions(
                items.map((r) => ({ value: r.id, label: getRecordLabel(type, r) }))
            );
        } catch {
            setRelatedOptions([]);
        } finally {
            setRelatedLoading(false);
        }
    }, []);

    const handleRelatedTypeChange = (value: number | undefined) => {
        setRelatedToType(value);
        form.setFieldValue('relatedToId', undefined);
        if (value) fetchRelatedRecords(value);
        else setRelatedOptions([]);
    };

    useEffect(() => {
        if (open) {
            if (editing) {
                form.setFieldsValue({
                    subject: editing.subject,
                    description: editing.description,
                    assignedToId: editing.assignedToId,
                    priority: editing.priority,
                    dueDate: editing.dueDate ? dayjs(editing.dueDate) : undefined,
                    duration: editing.duration,
                    location: editing.location,
                });
            } else {
                form.resetFields();
                form.setFieldsValue({ priority: 2, assignedToId: user?.userId });
                setRelatedToType(undefined);
                setRelatedOptions([]);
            }
        }
    }, [open, editing, form, user?.userId ?? '']);

    const handleFinish = (values: Record<string, unknown>) => {
        const payload = {
            ...values,
            dueDate: values.dueDate ? (values.dueDate as dayjs.Dayjs).toISOString() : undefined,
        };
        delete payload.dueDate;
        const dueDateVal = values.dueDate ? (values.dueDate as dayjs.Dayjs).toISOString() : undefined;
        onSubmit({ ...payload, dueDate: dueDateVal } as ICreateActivityDto | IUpdateActivityDto);
    };

    const isEditing = !!editing;

    return (
        <Modal
            open={open}
            title={isEditing ? 'Edit Activity' : 'Log New Activity'}
            onCancel={onClose}
            footer={null}
            width={600}
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
                    {!isEditing && (
                        <Form.Item
                            label="Activity Type"
                            name="type"
                            rules={[{ required: true, message: 'Please select the activity type' }]}
                        >
                            <Select size="large" options={ACTIVITY_TYPE_OPTIONS} placeholder="Select type" />
                        </Form.Item>
                    )}

                    <Form.Item
                        label="Subject"
                        name="subject"
                        rules={[{ required: !isEditing, message: 'Please enter a subject' }]}
                    >
                        <Input placeholder="e.g. Discovery call with Acme Corp" size="large" />
                    </Form.Item>

                    <Form.Item label="Description" name="description">
                        <Input.TextArea
                            placeholder="Add notes or context..."
                            rows={3}
                            className={styles.noResize}
                        />
                    </Form.Item>

                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                label="Due Date"
                                name="dueDate"
                                rules={[{ required: !isEditing, message: 'Please select a due date' }]}
                            >
                                <DatePicker
                                    size="large"
                                    className={styles.fullWidth}
                                    showTime
                                    format="YYYY-MM-DD HH:mm"
                                />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label="Priority" name="priority">
                                <Select size="large" options={PRIORITY_OPTIONS} placeholder="Select priority" />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item label="Duration (minutes)" name="duration">
                                <InputNumber
                                    size="large"
                                    min={1}
                                    placeholder="e.g. 60"
                                    className={styles.fullWidth}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label="Location" name="location">
                                <Input placeholder="e.g. Online / Office" size="large" />
                            </Form.Item>
                        </Col>
                    </Row>

                    {!isEditing && (
                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item label="Related To Type" name="relatedToType">
                                    <Select
                                        size="large"
                                        options={RELATED_TO_TYPE_OPTIONS}
                                        placeholder="Select entity type"
                                        allowClear
                                        onChange={handleRelatedTypeChange}
                                    />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item label="Related Record" name="relatedToId">
                                    <Select
                                        size="large"
                                        showSearch
                                        placeholder={relatedToType ? 'Search & select a record' : 'Select a type first'}
                                        disabled={!relatedToType}
                                        loading={relatedLoading}
                                        options={relatedOptions}
                                        allowClear
                                        notFoundContent={relatedLoading ? 'Loading...' : 'No records found'}
                                    />
                                </Form.Item>
                            </Col>
                        </Row>
                    )}

                    <Form.Item label="Assigned To" name="assignedToId" hidden>
                        <Input />
                    </Form.Item>
                    <Form.Item label="Assigned To">
                        <Input
                            size="large"
                            value={currentUserName}
                            disabled
                            className={styles.disabledInput}
                            suffix={<span className={styles.inputSuffix}>you</span>}
                        />
                    </Form.Item>

                    <Form.Item className={styles.formItemNm}>
                        <Button
                            type="primary"
                            htmlType="submit"
                            loading={loading}
                            className={styles.submitButton}
                            size="large"
                        >
                            {isEditing ? 'Save Changes' : 'Log Activity'}
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </Modal>
    );
};

export default ActivityFormModal;
