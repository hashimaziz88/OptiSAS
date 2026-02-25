"use client";
import { Button, Divider } from 'antd';
import { GoogleOutlined } from '@ant-design/icons';
import { useStyles } from '@/app/(auth)/style/style';

interface AuthSocialDividerProps {
    label: string;
}

const AuthSocialDivider: React.FC<AuthSocialDividerProps> = ({ label }) => {
    const { styles } = useStyles();

    return (
        <>
            <Divider className={styles.divider} plain>OR</Divider>
            <Button className={styles.socialButton} icon={<GoogleOutlined />}>
                {label}
            </Button>
        </>
    );
};

export default AuthSocialDivider;
