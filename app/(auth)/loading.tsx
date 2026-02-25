"use client";
import React from 'react';
import Spinner from '@/components/spinner/Spinner';
import { useStyles } from '@/app/(auth)/style/style';

const Loading: React.FC = () => {
    const { styles } = useStyles();

    return (
        <div className={styles.container}>
            <Spinner tip="Loading..." />
        </div>
    );
};

export default Loading;