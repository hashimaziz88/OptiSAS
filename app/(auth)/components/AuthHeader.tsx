"use client";
import Link from 'next/link';
import { Typography } from 'antd';
import { useStyles } from '../style/style';
import LogoImage from '@/components/logoImage/LogoImage';

const { Text, Title } = Typography;

interface AuthHeaderProps {
    title: string;
    subtitle: string;
}

const AuthHeader: React.FC<AuthHeaderProps> = ({ title, subtitle }) => {
    const { styles } = useStyles();

    return (
        <>
            <Link href="/" className={styles.logoContainer}>
                <LogoImage height={80} width={160} />
            </Link>
            <div className={styles.headerSection}>
                <Title level={2} className={styles.formHeading}>{title}</Title>
                <Text className={styles.formSubtitle}>{subtitle}</Text>
            </div>
        </>
    );
};

export default AuthHeader;
