'use client';

import React from 'react';
import { Table, Tag, Card } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { IContractDto } from '@/providers/contractProvider/context';
import { CONTRACT_STATUS_COLORS } from '@/constants/contracts';
import { formatCurrency } from '@/utils/dashboard/opportunities';
import { ContractsExpiringTableProps } from '@/types/componentProps';
import { useStyles } from './style/style';

const columns: ColumnsType<IContractDto> = [
    {
        title: 'Contract #',
        dataIndex: 'contractNumber',
        key: 'contractNumber',
        render: (v: string) => (
            <span style={{ color: '#fb923c', fontFamily: 'monospace', fontSize: 12 }}>{v}</span>
        ),
    },
    {
        title: 'Client',
        dataIndex: 'clientName',
        key: 'clientName',
        render: (v: string) => <span style={{ color: '#e2e8f0' }}>{v}</span>,
    },

    {
        title: 'Days Left',
        dataIndex: 'daysUntilExpiry',
        key: 'daysUntilExpiry',
        width: 90,
        align: 'center',
        sorter: (a, b) => (a.daysUntilExpiry ?? 0) - (b.daysUntilExpiry ?? 0),
        render: (v: number) => (
            <span style={{ color: v < 14 ? '#f87171' : '#fb923c', fontWeight: 700 }}>{v}d</span>
        ),
    },
    {
        title: 'Value',
        dataIndex: 'contractValue',
        key: 'contractValue',
        align: 'right',
        render: (v: number, record) => (
            <span style={{ color: '#34d399' }}>{formatCurrency(v, record.currency)}</span>
        ),
    },
];

const ContractsExpiringTable: React.FC<ContractsExpiringTableProps> = ({ contracts, loading }) => {
    const { styles } = useStyles();

    if (!loading && contracts.length === 0) return null;

    return (
        <Card
            title={<span style={{ color: '#fb923c', fontWeight: 600 }}>⚠ Contracts Expiring Soon (30 days)</span>}
            className={styles.warningCard}
            styles={{
                body: { padding: 0 },
                header: {
                    background: 'rgba(251,146,60,0.05)',
                    borderBottom: '1px solid rgba(251,146,60,0.2)',
                },
            }}
            loading={loading}
        >
            <Table
                columns={columns}
                dataSource={contracts}
                rowKey="id"
                pagination={false}
                size="small"
                scroll={{ x: 'max-content' }}
                style={{ background: 'transparent' }}
            />
        </Card>
    );
};

export default ContractsExpiringTable;
