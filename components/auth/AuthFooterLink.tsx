"use client";
import Link from 'next/link';
import { Typography } from 'antd';
import { useStyles } from '@/app/(auth)/style/style';
import { AuthFooterLinkProps } from '@/types/componentProps';

const { Text } = Typography;

const AuthFooterLink: React.FC<AuthFooterLinkProps> = ({ text, linkHref, linkLabel }) => {
    const { styles } = useStyles();

    return (
        <div className={styles.footerLinkSection}>
            <Text className={styles.footerLinkText}>{text}</Text>
            <Link href={linkHref}>{linkLabel}</Link>
        </div>
    );
};

export default AuthFooterLink;
