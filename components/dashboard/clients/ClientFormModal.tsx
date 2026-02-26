'use client';

import React, { useEffect } from 'react';
import { Form, Input, Select, Switch, Modal, Button } from 'antd';
import { IClientDto, ICreateClientDto, IUpdateClientDto } from '@/providers/clientProvider/context';
import { CLIENT_TYPE_OPTIONS, INDUSTRY_OPTIONS, COMPANY_SIZE_OPTIONS } from '@/constants/clients';
import { useStyles, modalStyles } from './style/style';

interface ClientFormModalProps {
    open: boolean;
    editing?: IClientDto | null;
    loading: boolean;
    onSubmit: (values: ICreateClientDto | IUpdateClientDto) => void;
    onClose: () => void;
}

const ClientFormModal: React.FC<ClientFormModalProps> = ({ open, editing, loading, onSubmit, onClose }) => {
    const { styles } = useStyles();
    const [form] = Form.useForm();

    useEffect(() => {
        if (open) {
            if (editing) {
                form.setFieldsValue({
                    name: editing.name,
                    industry: editing.industry,
                    companySize: editing.companySize,
                    website: editing.website,
                    billingAddress: editing.billingAddress,
                    taxNumber: editing.taxNumber,
                    clientType: editing.clientType,
                    isActive: editing.isActive,
                });
            } else {
                form.resetFields();
                form.setFieldsValue({ isActive: true, clientType: 2 });
            }
        }
    }, [open, editing, form]);

    const handleFinish = (values: ICreateClientDto & { isActive?: boolean }) => {
        onSubmit(values);
    };

    return (
        <Modal
            open={open}
            title={editing ? 'Edit Client' : 'Add New Client'}
            onCancel={onClose}
            footer={null}
            width={560}
            destroyOnHidden
            className={styles.modal}
            styles={modalStyles}
        >
            <div className={styles.formBody}>
                <Form
                    form={form}
                    layout="vertical"
                    requiredMark={false}
                    onFinish={handleFinish}
                >
                    <Form.Item
                        label="Client Name"
                        name="name"
                        rules={[{ required: true, message: 'Please enter the client name' }]}
                    >
                        <Input placeholder="Acme Corporation" size="large" />
                    </Form.Item>

                    <Form.Item label="Client Type" name="clientType">
                        <Select size="large" options={CLIENT_TYPE_OPTIONS} placeholder="Select type" />
                    </Form.Item>

                    <Form.Item label="Industry" name="industry">
                        <Select size="large" options={INDUSTRY_OPTIONS} placeholder="Select industry" />
                    </Form.Item>

                    <Form.Item label="Company Size" name="companySize">
                        <Select size="large" options={COMPANY_SIZE_OPTIONS} placeholder="Select size" />
                    </Form.Item>

                    <Form.Item label="Website" name="website">
                        <Input placeholder="https://example.com" size="large" />
                    </Form.Item>

                    <Form.Item label="Billing Address" name="billingAddress">
                        <Input.TextArea placeholder="123 Main St, Johannesburg" rows={2} />
                    </Form.Item>

                    <Form.Item label="Tax Number" name="taxNumber">
                        <Input placeholder="ZA1234567" size="large" />
                    </Form.Item>

                    {editing && (
                        <Form.Item label="Active" name="isActive" valuePropName="checked">
                            <Switch />
                        </Form.Item>
                    )}

                    <Form.Item className={styles.formFooter}>
                        <div className={styles.formFooterActions}>
                            <Button onClick={onClose} size="large">Cancel</Button>
                            <Button type="primary" htmlType="submit" loading={loading} size="large">
                                {editing ? 'Save Changes' : 'Add Client'}
                            </Button>
                        </div>
                    </Form.Item>
                </Form>
            </div>
        </Modal>
    );
};

export default ClientFormModal;
