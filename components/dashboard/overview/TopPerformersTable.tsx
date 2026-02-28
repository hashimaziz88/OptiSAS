'use client';

import React from 'react';
import { Table, Card, Progress } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { ISalesPerformanceDto } from '@/providers/dashboardProvider/context';
import { formatCurrency } from '@/utils/dashboard/opportunities';
import { TopPerformersTableProps } from '@/types/componentProps';
import { useStyles } from './style/style';

const TopPerformersTable: React.FC<TopPerformersTableProps> = ({ performers, loading }) => {
    const { styles } = useStyles();

    const columns: ColumnsType<ISalesPerformanceDto> = [
        {
            title: 'Rep',
            dataIndex: 'userName',
            key: 'userName',
            render: (v: string) => (
                <span className={styles.performerName}>{v?.trim() || '—'}</span>
            ),
        },
        {
            title: 'Won',
            dataIndex: 'wonCount',
            key: 'wonCount',
            align: 'center',
            sorter: (a, b) => a.wonCount - b.wonCount,
            render: (v: number) => (
                <span className={styles.wonCount}>{v}</span>
            ),
        },
        {
            title: 'Total Revenue',
            dataIndex: 'totalRevenue',
            key: 'totalRevenue',
            sorter: (a, b) => a.totalRevenue - b.totalRevenue,
            render: (v: number) => <span className={styles.valueBlue}>{formatCurrency(v)}</span>,
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
                    format={(p) => <span className={styles.progressPercent}>{p}%</span>}
                />
            ),
        },
        {
            title: 'Avg. Deal',
            dataIndex: 'averageDealSize',
            key: 'averageDealSize',
            sorter: (a, b) => a.averageDealSize - b.averageDealSize,
            render: (v: number) => <span className={styles.lostValue}>{formatCurrency(v)}</span>,
        },
    ];

    return (
        <Card
            title={<span className={styles.cardTitle}>Top Performers</span>}
            className={styles.tableCard}
            loading={loading && performers.length === 0}
        >
            <Table
                columns={columns}
                dataSource={performers}
                rowKey="userId"
                pagination={false}
                size="small"
                scroll={{ x: 'max-content' }}
                className={styles.transparentBg}
                locale={{ emptyText: <span className={styles.emptyDataText}>No performance data</span> }}
            />
        </Card>
    );
};

export default TopPerformersTable;
