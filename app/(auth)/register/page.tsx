"use client";

import React, { useState, useEffect } from 'react';
import { Button, Form, Input, Select, Segmented, message } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined, PhoneOutlined, BankOutlined, KeyOutlined } from '@ant-design/icons';
import { useStyles } from '@/app/(auth)/style/style';
import AuthLayout from '@/components/auth/AuthLayout';
import AuthHeader from '@/components/auth/AuthHeader';

import AuthFooterLink from '@/components/auth/AuthFooterLink';
import Spinner from '@/components/spinner/Spinner';
import { useAuthActions, useAuthState } from '@/providers/authProvider';
import { IUserRegisterRequest } from '@/providers/authProvider/context';
import { decodeInvitationCode } from '@/utils/auth/invitationCode';
import { ScenarioType, RegisterFieldType } from '@/types/auth';
import { ROLE_OPTIONS, SCENARIO_OPTIONS, SCENARIO_HINTS } from '@/constants/auth';

const Register: React.FC = () => {
    const { styles } = useStyles();
    const [form] = Form.useForm<RegisterFieldType>();
    const { register } = useAuthActions();
    const { isPending, isError } = useAuthState();
    const [scenario, setScenario] = useState<ScenarioType>('shared');

    useEffect(() => {
        if (isError) {
            message.error('Registration failed. Please check your details and try again.');
        }
    }, [isError]);

    const handleScenarioChange = (val: string | number) => {
        setScenario(val as ScenarioType);
        form.resetFields(['tenantName', 'invitationCode', 'role']);
    };

    const onFinish = (values: RegisterFieldType) => {
        const payload: IUserRegisterRequest = {
            email: values.email,
            password: values.password,
            firstName: values.firstName,
            lastName: values.lastName,
            phoneNumber: values.phoneNumber,
        };

        if (scenario === 'new-org') {
            payload.tenantName = values.tenantName;
        } else if (scenario === 'join-org') {
            const tenantId = decodeInvitationCode(values.invitationCode ?? '');
            if (!tenantId) {
                message.error('Invitation code is invalid or has expired. Please request a new one from your Admin.');
                return;
            }
            payload.tenantId = tenantId;
            payload.role = values.role;
        } else if (values.role) {
            payload.role = values.role;
        }

        register(payload);
    };

    const onFinishFailed = (errorInfo: unknown) => {
        console.error('Failed:', errorInfo);
    };

    if (isPending) {
        return <Spinner />;
    }

    return (
        <AuthLayout>
            <AuthHeader
                title="Create Account"
                subtitle="Join us and start your journey today."
            />

            <div className={styles.segmentedWrapper}>
                <Segmented
                    block
                    options={SCENARIO_OPTIONS}
                    value={scenario}
                    onChange={handleScenarioChange}
                />
                <p className={styles.scenarioHint}>{SCENARIO_HINTS[scenario]}</p>
            </div>

            <Form
                form={form}
                layout="vertical"
                requiredMark={false}
                className={styles.form}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
            >
                {scenario === 'new-org' && (
                    <Form.Item
                        label="Organisation Name"
                        name="tenantName"
                        rules={[{ required: true, message: 'Please enter your organisation name' }]}
                    >
                        <Input prefix={<BankOutlined />} placeholder="Acme Corp" size="large" />
                    </Form.Item>
                )}

                {scenario === 'join-org' && (
                    <>
                        <Form.Item
                            label="Invitation Code"
                            name="invitationCode"
                            rules={[
                                { required: true, message: 'Please enter the invitation code from your Admin' },
                                {
                                    validator: (_, value) => {
                                        if (!value || decodeInvitationCode(value) !== null) return Promise.resolve();
                                        return Promise.reject('Invitation code is invalid or has expired');
                                    },
                                },
                            ]}
                        >
                            <Input
                                prefix={<KeyOutlined />}
                                placeholder="Paste invitation code here"
                                size="large"
                            />
                        </Form.Item>
                        <Form.Item
                            label="Role"
                            name="role"
                            initialValue="SalesRep"
                            rules={[{ required: true, message: 'Please select your role' }]}
                        >
                            <Select size="large" options={ROLE_OPTIONS} />
                        </Form.Item>
                    </>
                )}

                {scenario === 'shared' && (
                    <Form.Item label="Role" name="role" initialValue="SalesRep">
                        <Select size="large" options={ROLE_OPTIONS} />
                    </Form.Item>
                )}

                <Form.Item
                    label="First Name"
                    name="firstName"
                    rules={[{ required: true, message: 'Please enter your first name' }]}
                >
                    <Input prefix={<UserOutlined />} placeholder="John" size="large" />
                </Form.Item>

                <Form.Item
                    label="Last Name"
                    name="lastName"
                    rules={[{ required: true, message: 'Please enter your last name' }]}
                >
                    <Input prefix={<UserOutlined />} placeholder="Doe" size="large" />
                </Form.Item>

                <Form.Item label="Phone Number" name="phoneNumber">
                    <Input prefix={<PhoneOutlined />} placeholder="123-456-7890" size="large" />
                </Form.Item>

                <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                        { required: true, message: 'Please enter your email' },
                        { type: 'email', message: 'Please enter a valid email' },
                    ]}
                >
                    <Input prefix={<MailOutlined />} placeholder="Enter your email" size="large" />
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[
                        { required: true, message: 'Please enter your password' },
                        { min: 6, message: 'Password must be at least 6 characters' },
                    ]}
                >
                    <Input.Password prefix={<LockOutlined />} placeholder="" size="large" />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" size="large" block>
                        Create Account
                    </Button>
                </Form.Item>

                <AuthFooterLink
                    text="Already have an account?"
                    linkHref="/login"
                    linkLabel="Log in"
                />
            </Form>
        </AuthLayout>
    );
};

export default Register;
