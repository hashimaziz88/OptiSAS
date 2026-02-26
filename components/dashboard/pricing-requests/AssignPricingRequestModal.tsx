'use client';

import React, { useEffect, useState } from 'react';
import { Button, Form, Modal, Select, message } from 'antd';
import { axiosInstance } from '@/utils/axiosInstance';
import { IPricingRequestDto } from '@/providers/pricingRequestProvider/context';
import { useStyles } from './style/style';

const BASE_URL = process.env.NEXT_PUBLIC_API_LINK;

interface UserOption {
    value: string;
    label: string;
}

interface AssignPricingRequestModalProps {
    open: boolean;
    request: IPricingRequestDto | null;
    loading: boolean;
    onAssign: (id: string, userId: string) => Promise<void>;
    onClose: () => void;
}

const AssignPricingRequestModal: React.FC<AssignPricingRequestModalProps> = ({
    open,
    request,
    loading,
    onAssign,
    onClose,
}) => {
    const { styles } = useStyles();
    const [form] = Form.useForm();
    const [users, setUsers] = useState<UserOption[]>([]);
    const [usersLoading, setUsersLoading] = useState(false);

    useEffect(() => {
        if (!open) {
            form.resetFields();
            return;
        }
        const fetchUsers = async () => {
            setUsersLoading(true);
            try {
                const res = await axiosInstance().get(`${BASE_URL}/api/Opportunities`, {
                    params: { pageNumber: 1, pageSize: 100 },
                });
                const items = res.data?.items ?? [];
                const seen = new Set<string>();
                const opts: UserOption[] = [];
                for (const item of items) {
                    if (item.ownerId && !seen.has(item.ownerId)) {
                        seen.add(item.ownerId);
                        opts.push({ value: item.ownerId, label: item.ownerName ?? item.ownerId });
                    }
                }
                setUsers(opts);
            } catch {
                message.error('Failed to load users');
            } finally {
                setUsersLoading(false);
            }
        };
        fetchUsers();
    }, [open, form]);

    const handleSubmit = async () => {
        try {
            const values = await form.validateFields();
            if (!request) return;
            await onAssign(request.id, values.userId);
        } catch { }
    };

    return (
        <Modal
            open={open}
            title={request ? `Assign Request — ${request.requestNumber || request.title}` : 'Assign Request'}
            onCancel={onClose}
            footer={null}
            classNames={{ body: styles.modalBody, container: styles.modalContainer, header: styles.modalHeader }}
            destroyOnHidden
            width={440}
        >
            <div className={styles.formBody}>
                <Form form={form} layout="vertical" requiredMark={false}>
                    <Form.Item
                        name="userId"
                        label="Assign To"
                        rules={[{ required: true, message: 'Please select a team member' }]}
                    >
                        <Select
                            placeholder="Select team member"
                            options={users}
                            loading={usersLoading}
                            showSearch
                            size="large"
                        />
                    </Form.Item>

                    <Button
                        type="primary"
                        className={styles.submitButton}
                        loading={loading}
                        onClick={handleSubmit}
                    >
                        Assign Request
                    </Button>
                </Form>
            </div>
        </Modal>
    );
};

export default AssignPricingRequestModal;
