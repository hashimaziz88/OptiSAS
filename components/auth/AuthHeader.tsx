"use client";
import Link from 'next/link';
import { Typography } from 'antd';
import { useStyles } from '@/app/(auth)/style/style';
import LogoImage from '@/components/logoImage/LogoImage';
import { AuthHeaderProps } from '@/types/componentProps';

const { Text, Title } = Typography;

const AuthHeader: React.FC<AuthHeaderProps> = ({ title, subtitle }) => {
    const { styles } = useStyles();

    return (
        <>
            <Link href="/" className={styles.logoContainer}>
                <LogoImage height={56} width={112} />
            </Link>
            <div className={styles.headerSection}>
                <Title level={2} className={styles.formHeading}>{title}</Title>
                <Text className={styles.formSubtitle}>{subtitle}</Text>
            </div>
        </>
    );
};

export default AuthHeader;
