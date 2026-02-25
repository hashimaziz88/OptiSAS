"use client";
import Link from 'next/link';
import { Button, Checkbox, Form, Input, Typography, Divider } from 'antd';
import { UserOutlined, LockOutlined, GoogleOutlined } from '@ant-design/icons';
import { useStyles } from '../style/style';
import LogoImage from '@/components/logoImage/LogoImage';

const { Text, Title } = Typography;

type FieldType = {
    email?: string;
    password?: string;
    remember?: boolean;
};

const Login: React.FC = () => {
    const { styles } = useStyles();

    return (
        <div className={styles.container}>
            <div className={styles.backgroundGlow} />
            <div className={styles.formContainer}>
                <Link href="/" className={styles.logoContainer}>
                    <LogoImage height={80} width={160} />
                </Link>

                <div className={styles.headerSection}>
                    <Title level={2} className={styles.formHeading}>Welcome Back</Title>
                    <Text className={styles.formSubtitle}>Enter your credentials to access your account.</Text>
                </div>

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
                        <Input.Password prefix={<LockOutlined />} placeholder="••••••••" size="large" />
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

                    <Divider className={styles.divider} plain>OR</Divider>

                    <Button className={styles.socialButton} icon={<GoogleOutlined />}>
                        Continue with Google
                    </Button>

                    <div className={styles.footerLinkSection}>
                        <Text className={styles.footerLinkText}>Don&apos;t have an account?</Text>
                        <Link href="/register">Sign up for free</Link>
                    </div>
                </Form>
            </div>
        </div>
    );
};

export default Login;