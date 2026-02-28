'use client';

import React from 'react';
import { Table, Tag, Card } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { IContractDto } from '@/providers/contractProvider/context';
import { CONTRACT_STATUS_COLORS } from '@/constants/contracts';
import { formatCurrency } from '@/utils/dashboard/opportunities';
import { ContractsExpiringTableProps } from '@/types/componentProps';
import { useStyles } from './style/style';

const ContractsExpiringTable: React.FC<ContractsExpiringTableProps> = ({ contracts, loading }) => {
    const { styles, cx } = useStyles();

    if (!loading && contracts.length === 0) return null;

    const columns: ColumnsType<IContractDto> = [
        {
            title: 'Contract #',
            dataIndex: 'contractNumber',
            key: 'contractNumber',
            render: (v: string) => (
                <span className={styles.contractNumber}>{v}</span>
            ),
        },
        {
            title: 'Client',
            dataIndex: 'clientName',
            key: 'clientName',
            render: (v: string) => <span className={styles.contractTitle}>{v}</span>,
        },

        {
            title: 'Days Left',
            dataIndex: 'daysUntilExpiry',
            key: 'daysUntilExpiry',
            width: 90,
            align: 'center',
            sorter: (a, b) => (a.daysUntilExpiry ?? 0) - (b.daysUntilExpiry ?? 0),
            render: (v: number) => (
                <span className={cx(v < 14 ? styles.daysUrgent : styles.daysWarning)}>{v}d</span>
            ),
        },
        {
            title: 'Value',
            dataIndex: 'contractValue',
            key: 'contractValue',
            align: 'right',
            render: (v: number, record) => (
                <span className={styles.contractValue}>{formatCurrency(v, record.currency)}</span>
            ),
        },
    ];

    return (
        <Card
            title={<span className={styles.warningTitle}>⚠ Contracts Expiring Soon (30 days)</span>}
            className={styles.warningCard}
            loading={loading}
        >
            <Table
                columns={columns}
                dataSource={contracts}
                rowKey="id"
                pagination={false}
                size="small"
                scroll={{ x: 'max-content' }}
                className={styles.transparentBg}
            />
        </Card>
    );
};

export default ContractsExpiringTable;
