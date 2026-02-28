"use client";

import React, { useEffect } from 'react';
import { Button, Checkbox, Form, FormProps, Input, message } from 'antd';
import { LockOutlined, MailOutlined } from '@ant-design/icons';
import { useStyles } from '@/app/(auth)/style/style';
import AuthLayout from '@/components/auth/AuthLayout';
import AuthHeader from '@/components/auth/AuthHeader';

import AuthFooterLink from '@/components/auth/AuthFooterLink';
import { useAuthState, useAuthActions } from '@/providers/authProvider';
import { IUserLoginRequest } from '@/providers/authProvider/context';
import Spinner from '@/components/spinner/Spinner';

type FieldType = {
    email?: string;
    password?: string;
    remember?: boolean;
};

const Login: React.FC = () => {
    const { styles } = useStyles();
    const { login } = useAuthActions();
    const { isPending, isError } = useAuthState();

    useEffect(() => {
        if (isError) {
            message.error('Login failed. Please check your credentials and try again.');
        }
    }, [isError]);

    const onFinish: FormProps<IUserLoginRequest>['onFinish'] = (values) => {
        login({ email: values.email, password: values.password });
    };

    const onFinishFailed: FormProps<IUserLoginRequest>['onFinishFailed'] = (errorInfo) => {
        console.error('Failed:', errorInfo);
    };

    if (isPending) {
        return <Spinner />;
    }
    return (
        <AuthLayout>
            <AuthHeader
                title="Welcome Back"
                subtitle="Enter your credentials to access your account."
            />
            <Form
                name="login_form"
                layout="vertical"
                requiredMark={false}
                initialValues={{ remember: true }}
                className={styles.form}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
            >
                <Form.Item<FieldType>
                    label="Email"
                    name="email"
                    rules={[{ required: true, message: 'Please enter your email' }]}
                >
                    <Input prefix={<MailOutlined />} placeholder="Enter your email" size="large" />
                </Form.Item>

                <Form.Item<FieldType>
                    label="Password"
                    name="password"
                    rules={[{ required: true, message: 'Please enter your password' }]}
                >
                    <Input.Password prefix={<LockOutlined />} placeholder="" size="large" />
                </Form.Item>

                <div className={styles.checkBoxContainer}>
                    <Form.Item name="remember" valuePropName="checked" noStyle>
                        <Checkbox className={styles.checkbox}>Remember me</Checkbox>
                    </Form.Item>
                </div>

                <Form.Item>
                    <Button type="primary" htmlType="submit" size="large" block>
                        Log In
                    </Button>
                </Form.Item>

                <AuthFooterLink
                    text="Don't have an account?"
                    linkHref="/register"
                    linkLabel="Sign up for free"
                />
            </Form>
        </AuthLayout>
    );
};

export default Login;
