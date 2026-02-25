"use client";
import Link from 'next/link';
import { Button, Form, Input, Typography, Divider } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined, GoogleOutlined } from '@ant-design/icons';
import { useStyles } from '../style/style';
import LogoImage from '@/components/logoImage/LogoImage';

const { Text, Title } = Typography;

const Register: React.FC = () => {
    const { styles } = useStyles();

    return (
        <div className={styles.container}>
            <div className={styles.backgroundGlow} />
            <div className={styles.formContainer}>
                <Link href="/" className={styles.logoContainer}>
                    <LogoImage height={80} width={160} />
                </Link>

                <div className={styles.headerSection}>
                    <Title level={2} className={styles.formHeading}>Create Account</Title>
                    <Text className={styles.formSubtitle}>Join us and start your journey today.</Text>
                </div>

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
                        <Input.Password prefix={<LockOutlined />} placeholder="••••••••" size="large" />
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" size="large" block>
                            Create Account
                        </Button>
                    </Form.Item>

                    <Divider className={styles.divider} plain>OR</Divider>

                    <Button className={styles.socialButton} icon={<GoogleOutlined />}>
                        Sign up with Google
                    </Button>

                    <div className={styles.footerLinkSection}>
                        <Text className={styles.footerLinkText}>Already have an account?</Text>
                        <Link href="/login">Log in</Link>
                    </div>
                </Form>
            </div>
        </div>
    );
};

export default Register;
