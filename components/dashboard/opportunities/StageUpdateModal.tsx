'use client';

import React, { useEffect } from 'react';
import { Button, Form, Input, Modal, Select } from 'antd';
import { OPPORTUNITY_STAGE_OPTIONS } from '@/constants/opportunities';
import { useStyles } from '@/components/dashboard/opportunities/style/style';

interface StageUpdateModalProps {
    open: boolean;
    loading: boolean;
    initialStage?: number;
    onSubmit: (values: { stage: number; reason?: string }) => void;
    onClose: () => void;
}

const StageUpdateModal: React.FC<StageUpdateModalProps> = ({
    open, loading, initialStage, onSubmit, onClose,
}) => {
    const { styles } = useStyles();
    const [form] = Form.useForm();

    useEffect(() => {
        if (open) {
            form.resetFields();
            form.setFieldsValue({ stage: initialStage });
        }
    }, [open, initialStage, form]);

    return (
        <Modal
            open={open}
            title="Change Stage"
            onCancel={onClose}
            footer={null}
            classNames={{ body: styles.modalBody, container: styles.modalContainer, header: styles.modalHeader }}
        >
            <div className={styles.formBody}>
                <Form form={form} layout="vertical" requiredMark={false} onFinish={onSubmit}>
                    <Form.Item label="New Stage" name="stage" rules={[{ required: true }]}>
                        <Select size="large" options={OPPORTUNITY_STAGE_OPTIONS} />
                    </Form.Item>
                    <Form.Item label="Reason / Notes" name="reason">
                        <Input.TextArea placeholder="Optional notes about this stage change..." rows={3} />
                    </Form.Item>
                    <Form.Item className={styles.formFooter}>
                        <div className={styles.formFooterActions}>
                            <Button onClick={onClose} size="large">Cancel</Button>
                            <Button type="primary" htmlType="submit" loading={loading} size="large">Update Stage</Button>
                        </div>
                    </Form.Item>
                </Form>
            </div>
        </Modal>
    );
};

export default StageUpdateModal;
