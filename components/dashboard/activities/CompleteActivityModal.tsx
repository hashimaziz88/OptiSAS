'use client';

import React from 'react';
import { Form, Input, Modal, Button } from 'antd';
import { useStyles } from './style/style';

interface CompleteActivityModalProps {
    open: boolean;
    loading: boolean;
    onSubmit: (outcome: string) => void;
    onClose: () => void;
}

const CompleteActivityModal: React.FC<CompleteActivityModalProps> = ({ open, loading, onSubmit, onClose }) => {
    const { styles } = useStyles();
    const [form] = Form.useForm();

    const handleFinish = (values: { outcome?: string }) => {
        onSubmit(values.outcome ?? '');
        form.resetFields();
    };

    return (
        <Modal
            open={open}
            title="Complete Activity"
            onCancel={() => { form.resetFields(); onClose(); }}
            footer={null}
            width={480}
            destroyOnHidden
            classNames={{ body: styles.modalBody, container: styles.modalContainer, header: styles.modalHeader }}
        >
            <div className={styles.formBody}>
                <Form form={form} layout="vertical" requiredMark={false} onFinish={handleFinish}>
                    <Form.Item
                        label="Outcome"
                        name="outcome"
                        extra={<span className={styles.helperText}>Briefly describe what was achieved or discussed.</span>}
                    >
                        <Input.TextArea
                            rows={4}
                            placeholder="e.g. Demo completed, client requested a formal proposal..."
                            className={styles.noResize}
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
                            Mark as Completed
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </Modal>
    );
};

export default CompleteActivityModal;
