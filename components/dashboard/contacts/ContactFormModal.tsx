'use client';

import React, { useEffect } from 'react';
import { Form, Input, Select, Switch, Modal, Button } from 'antd';
import { IContactDto, ICreateContactDto, IUpdateContactDto } from '@/providers/contactProvider/context';
import { IClientDto } from '@/providers/clientProvider/context';
import { useStyles, modalStyles } from './style/style';

interface ContactFormModalProps {
    open: boolean;
    editing?: IContactDto | null;
    loading: boolean;
    clients: IClientDto[];
    defaultClientId?: string;
    onSubmit: (values: ICreateContactDto | IUpdateContactDto) => void;
    onClose: () => void;
}

const ContactFormModal: React.FC<ContactFormModalProps> = ({
    open, editing, loading, clients, defaultClientId, onSubmit, onClose,
}) => {
    const { styles } = useStyles();
    const [form] = Form.useForm();

    useEffect(() => {
        if (open) {
            if (editing) {
                form.setFieldsValue({
                    firstName: editing.firstName,
                    lastName: editing.lastName,
                    email: editing.email,
                    phoneNumber: editing.phoneNumber,
                    position: editing.position,
                    isPrimaryContact: editing.isPrimaryContact,
                    isActive: editing.isActive,
                    clientId: editing.clientId,
                });
            } else {
                form.resetFields();
                form.setFieldsValue({
                    isPrimaryContact: false,
                    ...(defaultClientId ? { clientId: defaultClientId } : {}),
                });
            }
        }
    }, [open, editing, form, defaultClientId]);

    const clientOptions = clients.map((c) => ({ label: c.name, value: c.id }));

    const handleFinish = (values: ICreateContactDto & { isActive?: boolean }) => {
        onSubmit(values);
    };

    return (
        <Modal
            open={open}
            title={editing ? 'Edit Contact' : 'Add New Contact'}
            onCancel={onClose}
            footer={null}
            width={580}
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
                    {!editing && (
                        <Form.Item
                            label="Client"
                            name="clientId"
                            rules={[{ required: true, message: 'Please select a client' }]}
                        >
                            <Select
                                size="large"
                                placeholder="Select a client"
                                options={clientOptions}
                                showSearch
                            />
                        </Form.Item>
                    )}

                    <div className={styles.formRow}>
                        <Form.Item
                            label="First Name"
                            name="firstName"
                            rules={[{ required: true, message: 'Required' }]}
                        >
                            <Input placeholder="Jane" size="large" />
                        </Form.Item>

                        <Form.Item
                            label="Last Name"
                            name="lastName"
                            rules={[{ required: true, message: 'Required' }]}
                        >
                            <Input placeholder="Doe" size="large" />
                        </Form.Item>
                    </div>

                    <Form.Item label="Position / Title" name="position">
                        <Input placeholder="Sales Director" size="large" />
                    </Form.Item>

                    <div className={styles.formRow}>
                        <Form.Item label="Email" name="email">
                            <Input placeholder="jane@example.com" size="large" />
                        </Form.Item>

                        <Form.Item label="Phone Number" name="phoneNumber">
                            <Input placeholder="+27 11 000 0000" size="large" />
                        </Form.Item>
                    </div>

                    <Form.Item label="Primary Contact" name="isPrimaryContact" valuePropName="checked">
                        <Switch />
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
                                {editing ? 'Save Changes' : 'Add Contact'}
                            </Button>
                        </div>
                    </Form.Item>
                </Form>
            </div>
        </Modal>
    );
};

export default ContactFormModal;
