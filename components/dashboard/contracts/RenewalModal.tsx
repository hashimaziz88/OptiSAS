'use client';

import React from 'react';
import { Button, Form, Input, InputNumber, Modal } from 'antd';
import { ICreateContractRenewalDto } from '@/providers/contractProvider/context';
import { RenewalModalProps } from '@/types/componentProps';
import { useStyles } from './style/style';

const RenewalModal: React.FC<RenewalModalProps> = ({
    open,
    contract,
    loading,
    onSubmit,
    onClose,
}) => {
    const { styles } = useStyles();
    const [form] = Form.useForm();

    const handleSubmit = async () => {
        try {
            const values = await form.validateFields();
            if (!contract) return;
            const payload: ICreateContractRenewalDto = {
                proposedValue: values.proposedValue,
                notes: values.notes,
            };
            await onSubmit(contract.id, payload);
            form.resetFields();
        } catch { }
    };

    const handleCancel = () => {
        form.resetFields();
        onClose();
    };

    return (
        <Modal
            open={open}
            title={`Create Renewal — ${contract?.contractNumber ?? ''}`}
            onCancel={handleCancel}
            classNames={{ body: styles.modalBody, container: styles.modalContainer, header: styles.modalHeader }}
            destroyOnHidden
            footer={[
                <Button key="cancel" onClick={handleCancel}>
                    Cancel
                </Button>,
                <Button key="submit" type="primary" loading={loading} onClick={handleSubmit}>
                    Create Renewal
                </Button>,
            ]}
        >
            <div className={styles.formBody}>
                <Form form={form} layout="vertical" requiredMark={false}>
                    <Form.Item
                        name="proposedValue"
                        label="Proposed Value (ZAR)"
                        rules={[{ required: true, message: 'Required' }]}
                    >
                        <InputNumber<number>
                            placeholder="0"
                            min={0}
                            size="large"
                            className={styles.fullWidth}
                            formatter={(v) => `${v}`.replaceAll(/(?<=\d)(?=(\d{3})+$)/g, ',')}
                            parser={(v): number => Number(v?.replaceAll(',', '') ?? '0')}
                        />
                    </Form.Item>

                    <Form.Item name="notes" label="Notes">
                        <Input.TextArea
                            placeholder="Optional renewal notes..."
                            rows={3}
                            size="large"
                        />
                    </Form.Item>
                </Form>
            </div>
        </Modal>
    );
};

export default RenewalModal;
