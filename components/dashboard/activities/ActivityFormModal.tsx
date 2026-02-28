'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { Form, Input, Select, Modal, Button, DatePicker, InputNumber, Row, Col } from 'antd';
import dayjs from 'dayjs';
import { IActivityDto, ICreateActivityDto, IUpdateActivityDto } from '@/providers/activityProvider/context';
import { ACTIVITY_TYPE_OPTIONS, PRIORITY_OPTIONS, ACTIVITY_RELATED_TO_TYPE_OPTIONS, ACTIVITY_RELATED_ENDPOINTS } from '@/constants/activities';
import { axiosInstance } from '@/utils/axiosInstance';
import { useAuthState } from '@/providers/authProvider';
import { ActivityFormModalProps } from '@/types/componentProps';
import { useStyles } from './style/style';

const BASE_URL = process.env.NEXT_PUBLIC_API_LINK;

const getRecordLabel = (type: number, record: Record<string, string>): string => {
    if (type === 1) return record.name;
    return record.title;
};

const ActivityFormModal: React.FC<ActivityFormModalProps> = ({ open, editing, loading, canAssign, onSubmit, onClose }) => {
    const { styles } = useStyles();
    const [form] = Form.useForm();
    const { user } = useAuthState();
    const userId = user?.userId;
    const currentUserName = [user?.firstName, user?.lastName].filter(Boolean).join(' ') || user?.email || 'You';
    const [relatedToType, setRelatedToType] = useState<number | undefined>(undefined);
    const [relatedOptions, setRelatedOptions] = useState<{ value: string; label: string }[]>([]);
    const [relatedLoading, setRelatedLoading] = useState(false);
    const [userOptions, setUserOptions] = useState<{ value: string; label: string }[]>([]);
    const [usersLoading, setUsersLoading] = useState(false);

    const fetchRelatedRecords = useCallback(async (type: number) => {
        setRelatedLoading(true);
        setRelatedOptions([]);
        try {
            const res = await axiosInstance().get(`${BASE_URL}${ACTIVITY_RELATED_ENDPOINTS[type]}`, {
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
                form.setFieldsValue({ priority: 2, assignedToId: userId });
                setRelatedToType(undefined);
                setRelatedOptions([]);
            }

            if (canAssign && userOptions.length === 0) {
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
    }, [open, editing, form, userId, canAssign, userOptions.length]);

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
                                        options={ACTIVITY_RELATED_TO_TYPE_OPTIONS}
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
                                        optionFilterProp="label"
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

                    {canAssign ? (
                        <Form.Item label="Assigned To" name="assignedToId" rules={[{ required: true, message: 'Please assign this activity' }]}>
                            <Select
                                size="large"
                                showSearch
                                optionFilterProp="label"
                                options={userOptions}
                                loading={usersLoading}
                                placeholder="Select a team member"
                            />
                        </Form.Item>
                    ) : (
                        <>
                            <Form.Item name="assignedToId" hidden><Input /></Form.Item>
                            <Form.Item label="Assigned To">
                                <Input
                                    size="large"
                                    value={currentUserName}
                                    disabled
                                    className={styles.disabledInput}
                                    suffix={<span className={styles.inputSuffix}>you</span>}
                                />
                            </Form.Item>
                        </>
                    )}

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
