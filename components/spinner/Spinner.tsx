"use client";
import React from 'react';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { useStyles } from './style/style';
import { SpinnerProps } from '@/types/componentProps';

const Spinner: React.FC<SpinnerProps> = ({ tip = "LOADING...", size = 48 }) => {
    const { styles } = useStyles();

    const antIcon = (
        <LoadingOutlined
            className={styles.loadingIcon}
            style={{ fontSize: size }}
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