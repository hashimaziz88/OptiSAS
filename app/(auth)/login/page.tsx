"use client";
import { Button, Checkbox, Form, Input } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useStyles } from '../style/style';
import AuthLayout from '../components/AuthLayout';
import AuthHeader from '../components/AuthHeader';
import AuthSocialDivider from '../components/AuthSocialDivider';
import AuthFooterLink from '../components/AuthFooterLink';

type FieldType = {
    email?: string;
    password?: string;
    remember?: boolean;
};

const Login: React.FC = () => {
    const { styles } = useStyles();

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
            >
                <Form.Item<FieldType>
                    label="Email"
                    name="email"
                    rules={[{ required: true, message: 'Please enter your email' }]}
                >
                    <Input prefix={<UserOutlined />} placeholder="Enter your email" size="large" />
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

                <AuthSocialDivider label="Continue with Google" />
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
