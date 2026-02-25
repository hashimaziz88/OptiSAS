"use client";
import { Button, Form, Input } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons';
import { useStyles } from '../style/style';
import AuthLayout from '../components/AuthLayout';
import AuthHeader from '../components/AuthHeader';
import AuthSocialDivider from '../components/AuthSocialDivider';
import AuthFooterLink from '../components/AuthFooterLink';

const Register: React.FC = () => {
    const { styles } = useStyles();

    return (
        <AuthLayout>
            <AuthHeader
                title="Create Account"
                subtitle="Join us and start your journey today."
            />
            <Form
                layout="vertical"
                requiredMark={false}
                className={styles.form}
            >
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

                <Form.Item
                    label="Email Address"
                    name="email"
                    rules={[
                        { required: true, message: 'Please enter your email address' },
                        { type: 'email', message: 'Please enter a valid email address' },
                    ]}
                >
                    <Input prefix={<MailOutlined />} placeholder="name@company.com" size="large" />
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[{ required: true, message: 'Please enter your password' }]}
                >
                    <Input.Password prefix={<LockOutlined />} placeholder="" size="large" />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" size="large" block>
                        Create Account
                    </Button>
                </Form.Item>

                <AuthSocialDivider label="Sign up with Google" />
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
