'use client';

import React from 'react';
import { Table, Card, Progress } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { ISalesPerformanceDto } from '@/providers/dashboardProvider/context';
import { formatCurrency } from '@/utils/dashboard/opportunities';
import { TopPerformersTableProps } from '@/types/componentProps';
import { useStyles } from './style/style';

const columns: ColumnsType<ISalesPerformanceDto> = [
    {
        title: 'Rep',
        dataIndex: 'userName',
        key: 'userName',
        render: (v: string) => (
            <span style={{ color: '#e2e8f0', fontWeight: 500 }}>{v?.trim() || '—'}</span>
        ),
    },
    {
        title: 'Won',
        dataIndex: 'wonCount',
        key: 'wonCount',
        align: 'center',
        sorter: (a, b) => a.wonCount - b.wonCount,
        render: (v: number) => (
            <span style={{ color: '#34d399', fontWeight: 700, fontSize: 15 }}>{v}</span>
        ),
    },
    {
        title: 'Total Revenue',
        dataIndex: 'totalRevenue',
        key: 'totalRevenue',
        sorter: (a, b) => a.totalRevenue - b.totalRevenue,
        render: (v: number) => <span style={{ color: '#60a5fa' }}>{formatCurrency(v)}</span>,
    },
    {
        title: 'Win Rate',
        dataIndex: 'winRate',
        key: 'winRate',
        width: 170,
        sorter: (a, b) => a.winRate - b.winRate,
        render: (v: number) => (
            <Progress
                percent={Math.round(v)}
                size="small"
                strokeColor="#34d399"
                format={(p) => <span style={{ color: '#cbd5e0', fontSize: 11 }}>{p}%</span>}
            />
        ),
    },
    {
        title: 'Avg. Deal',
        dataIndex: 'averageDealSize',
        key: 'averageDealSize',
        sorter: (a, b) => a.averageDealSize - b.averageDealSize,
        render: (v: number) => <span style={{ color: '#94a3b8' }}>{formatCurrency(v)}</span>,
    },
];

const TopPerformersTable: React.FC<TopPerformersTableProps> = ({ performers, loading }) => {
    const { styles } = useStyles();

    return (
        <Card
            title={<span style={{ color: 'white', fontWeight: 600 }}>Top Performers</span>}
            className={styles.tableCard}
            styles={{
                body: { padding: 0 },
                header: {
                    background: 'transparent',
                    borderBottom: '1px solid rgba(255,255,255,0.08)',
                },
            }}
            loading={loading && performers.length === 0}
        >
            <Table
                columns={columns}
                dataSource={performers}
                rowKey="userId"
                pagination={false}
                size="small"
                style={{ background: 'transparent' }}
                locale={{ emptyText: <span style={{ color: '#64748b' }}>No performance data</span> }}
            />
        </Card>
    );
};

export default TopPerformersTable;
