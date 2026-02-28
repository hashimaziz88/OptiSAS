'use client';

import React from 'react';
import { Tooltip, Typography } from 'antd';
import { CopyOutlined } from '@ant-design/icons';
import { useStyles } from '@/components/profile/style/style';

const { Text } = Typography;

interface InfoRowProps {
    label: string;
    value: React.ReactNode;
    copyable?: boolean;
    onCopy?: (value: string, label: string) => void;
}

const InfoRow: React.FC<InfoRowProps> = ({ label, value, copyable, onCopy }) => {
    const { styles } = useStyles();

    return (
        <div className={styles.infoRow}>
            <Text className={styles.infoRowLabel}>{label}</Text>
            <div className={styles.infoRowValue}>
                {copyable && typeof value === 'string' ? (
                    <span className={styles.copyableValue}>
                        <span className={styles.flexOne}>{value}</span>
                        <Tooltip title="Copy">
                            <CopyOutlined
                                className={styles.clickableIconBlue}
                                onClick={() => onCopy?.(value, label)}
                            />
                        </Tooltip>
                    </span>
                ) : (
                    value
                )}
            </div>
        </div>
    );
};

export default InfoRow;
