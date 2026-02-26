"use client";

import React, { useState, useEffect } from 'react';
import { Button, Form, Input, Select, Segmented, message } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined, PhoneOutlined, BankOutlined, KeyOutlined } from '@ant-design/icons';
import { useStyles } from '@/app/(auth)/style/style';
import AuthLayout from '@/components/auth/components/AuthLayout';
import AuthHeader from '@/components/auth/components/AuthHeader';

import AuthFooterLink from '@/components/auth/components/AuthFooterLink';
import Spinner from '@/components/spinner/Spinner';
import { useAuthActions, useAuthState } from '@/providers/authProvider';
import { IUserRegisterRequest } from '@/providers/authProvider/context';

type ScenarioType = 'shared' | 'new-org' | 'join-org';

type FieldType = {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    phoneNumber?: string;
    tenantName?: string;
    tenantId?: string;
    role?: string;
};

const ROLE_OPTIONS = [
    { value: 'SalesRep', label: 'Sales Representative' },
    { value: 'SalesManager', label: 'Sales Manager' },
    { value: 'BusinessDevelopmentManager', label: 'Business Development Manager' },
];

const SCENARIO_OPTIONS = [
    { value: 'shared', label: 'Shared' },
    { value: 'new-org', label: 'New Org' },
    { value: 'join-org', label: 'Join Org' },
];

const SCENARIO_HINTS: Record<ScenarioType, string> = {
    shared: 'Access the default shared workspace. Defaults to Sales Representative.',
    'new-org': 'Create a new isolated organisation. You will become its Admin.',
    'join-org': 'Join an existing organisation using a Tenant ID provided by your Admin.',
};

const Register: React.FC = () => {
    const { styles } = useStyles();
    const [form] = Form.useForm<FieldType>();
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
        form.resetFields(['tenantName', 'tenantId', 'role']);
    };

    const onFinish = (values: FieldType) => {
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
            payload.tenantId = values.tenantId;
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
                            label="Tenant ID"
                            name="tenantId"
                            rules={[{ required: true, message: 'Please enter the Tenant ID from your Admin' }]}
                        >
                            <Input
                                prefix={<KeyOutlined />}
                                placeholder="xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
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
