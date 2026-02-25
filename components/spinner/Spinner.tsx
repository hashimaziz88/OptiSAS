"use client";
import React from 'react';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { useStyles } from './style/style';

interface SpinnerProps {
    tip?: string;
    size?: number;
}

const Spinner: React.FC<SpinnerProps> = ({ tip = "LOADING...", size = 48 }) => {
    const { styles } = useStyles();

    const antIcon = (
        <LoadingOutlined
            style={{ fontSize: size, color: '#1890ff' }}
            spin
        />
    );

    return (
        <div className={styles.spinnerWrapper}>
            <Spin indicator={antIcon} />
            {tip && <div className={styles.spinnerText}>{tip}</div>}
        </div>
    );
};

export default Spinner;