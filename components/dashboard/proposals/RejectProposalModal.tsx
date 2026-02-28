'use client';

import React from 'react';
import { Button, Form, Input, Modal } from 'antd';
import { IProposalDto } from '@/providers/proposalProvider/context';
import { RejectProposalModalProps } from '@/types/componentProps';
import { useStyles } from './style/style';

const RejectProposalModal: React.FC<RejectProposalModalProps> = ({
    open,
    proposal,
    loading,
    onReject,
    onClose,
}) => {
    const { styles } = useStyles();
    const [form] = Form.useForm();

    const handleSubmit = async () => {
        try {
            const { reason } = await form.validateFields();
            if (proposal) {
                await onReject(proposal.id, reason);
                form.resetFields();
            }
        } catch { }
    };

    const handleCancel = () => {
        form.resetFields();
        onClose();
    };

    return (
        <Modal
            open={open}
            title="Reject Proposal"
            onCancel={handleCancel}
            classNames={{ body: styles.modalBody, container: styles.modalContainer, header: styles.modalHeader }}
            destroyOnHidden
            footer={[
                <Button key="cancel" onClick={handleCancel}>
                    Cancel
                </Button>,
                <Button key="reject" danger type="primary" loading={loading} onClick={handleSubmit}>
                    Reject
                </Button>,
            ]}
        >
            <div className={styles.formBody}>
                <Form form={form} layout="vertical" requiredMark={false}>
                    <Form.Item
                        name="reason"
                        label="Rejection Reason"
                        rules={[{ required: true, message: 'Please provide a reason for rejection' }]}
                    >
                        <Input.TextArea
                            placeholder="Explain why this proposal is being rejected..."
                            rows={4}
                            size="large"
                        />
                    </Form.Item>
                </Form>
            </div>
        </Modal>
    );
};

export default RejectProposalModal;
