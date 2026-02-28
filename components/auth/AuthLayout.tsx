"use client";
import { useStyles } from '@/app/(auth)/style/style';

interface AuthLayoutProps {
    children: React.ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
    const { styles } = useStyles();

    return (
        <div className={styles.container}>
            <div className={styles.backgroundGlow} />
            <div className={styles.formContainer}>
                {children}
            </div>
        </div>
    );
};

export default AuthLayout;
