'use client';

import React, { useEffect, useState } from 'react';
import { Button, Form, Modal, Select, message } from 'antd';
import { axiosInstance } from '@/utils/axiosInstance';
import { AssignOpportunityModalProps } from '@/types/componentProps';
import { useStyles } from '@/components/dashboard/opportunities/style/style';

const AssignOpportunityModal: React.FC<AssignOpportunityModalProps> = ({
    open, loading, currentOwnerId, onSubmit, onClose,
}) => {
    const { styles } = useStyles();
    const [form] = Form.useForm();
    const [users, setUsers] = useState<{ label: string; value: string }[]>([]);
    const [usersLoading, setUsersLoading] = useState(false);

    // Sync the pre-selected value whenever the modal opens or the owner changes
    useEffect(() => {
        if (!open) return;
        form.resetFields();
        form.setFieldsValue({ userId: currentOwnerId });
    }, [open, currentOwnerId, form]);

    // Fetch the users list once per session — skip if already loaded
    useEffect(() => {
        if (!open || users.length > 0) return;
        const controller = new AbortController();
        setUsersLoading(true);
        axiosInstance()
            .get(`${process.env.NEXT_PUBLIC_API_LINK}/api/users`, {
                params: { pageSize: 200 },
                signal: controller.signal,
            })
            .then((res) => {
                setUsers(
                    (res.data?.items ?? []).map((u: { id: string; fullName: string; roles: string[] }) => ({
                        value: u.id,
                        label: `${u.fullName}${u.roles?.length ? ` (${u.roles[0]})` : ''}`,
                    }))
                );
            })
            .catch((err) => {
                if (err.name !== 'CanceledError') message.error('Failed to load users');
            })
            .finally(() => setUsersLoading(false));
        return () => controller.abort();
    }, [open, users.length]);

    return (
        <Modal
            open={open}
            title="Reassign Opportunity"
            onCancel={onClose}
            footer={null}
            classNames={{ body: styles.modalBody, container: styles.modalContainer, header: styles.modalHeader }}
        >
            <div className={styles.formBody}>
                <Form form={form} layout="vertical" requiredMark={false} onFinish={onSubmit}>
                    <Form.Item label="Assign To" name="userId" rules={[{ required: true, message: 'Select a user' }]}>
                        <Select
                            size="large"
                            showSearch
                            options={users}
                            loading={usersLoading}
                            placeholder="Select a user"
                            optionFilterProp="label"
                        />
                    </Form.Item>
                    <Form.Item className={styles.formFooter}>
                        <div className={styles.formFooterActions}>
                            <Button onClick={onClose} size="large">Cancel</Button>
                            <Button type="primary" htmlType="submit" loading={loading} size="large">Reassign</Button>
                        </div>
                    </Form.Item>
                </Form>
            </div>
        </Modal>
    );
};

export default AssignOpportunityModal;
