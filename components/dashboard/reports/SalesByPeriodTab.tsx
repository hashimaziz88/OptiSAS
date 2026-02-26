'use client';

import React, { useState, useCallback } from 'react';
import { Button, Col, DatePicker, Empty, Row, Select, Statistic, Table, Tag, Tooltip } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { ReloadOutlined, SearchOutlined } from '@ant-design/icons';
import type { Dayjs } from 'dayjs';
import { ISalesByPeriodItemDto } from '@/providers/reportProvider/context';
import { useReportState, useReportActions } from '@/providers/reportProvider';
import { useStyles } from './style/style';
import { formatCurrency } from './utils';

const { RangePicker } = DatePicker;

const SalesByPeriodTab: React.FC = () => {
    const { styles } = useStyles();
    const { isPending, salesByPeriodReport } = useReportState();
    const { getSalesByPeriodReport } = useReportActions();

    const [dateRange, setDateRange] = useState<[Dayjs | null, Dayjs | null] | null>(null);
    const [groupBy, setGroupBy] = useState<'month' | 'week'>('month');

    const load = useCallback(() => {
        getSalesByPeriodReport({
            startDate: dateRange?.[0]?.toISOString() ?? undefined,
            endDate: dateRange?.[1]?.endOf('day').toISOString() ?? undefined,
            groupBy,
        });
    }, [dateRange, groupBy, getSalesByPeriodReport]);

    const rows = salesByPeriodReport ?? [];
    const maxValue = rows.length ? Math.max(...rows.map(r => r.totalValue ?? 0)) : 1;
    const totalWon = rows.reduce((sum, r) => sum + (r.dealsWon ?? 0), 0);
    const totalValue = rows.reduce((sum, r) => sum + (r.totalValue ?? 0), 0);

    const columns: ColumnsType<ISalesByPeriodItemDto> = [
        {
            title: 'Period',
            dataIndex: 'period',
            key: 'period',
            sorter: (a, b) => a.period.localeCompare(b.period),
            width: 140,
        },
        {
            title: 'Deals Won',
            dataIndex: 'dealsWon',
            key: 'dealsWon',
            sorter: (a, b) => a.dealsWon - b.dealsWon,
            width: 110,
            render: (v: number) => <Tag color="green">{v}</Tag>,
        },
        {
            title: 'Total Value',
            dataIndex: 'totalValue',
            key: 'totalValue',
            sorter: (a, b) => a.totalValue - b.totalValue,
            defaultSortOrder: 'descend',
            width: 180,
            render: (v: number) => formatCurrency(v),
        },
        {
            title: 'Avg. Deal Size',
            dataIndex: 'averageDealSize',
            key: 'averageDealSize',
            sorter: (a, b) => a.averageDealSize - b.averageDealSize,
            width: 180,
            render: (v: number) => formatCurrency(v),
        },
        {
            title: 'Revenue Bar',
            key: 'bar',
            render: (_, record) => {
                const pct = maxValue > 0 ? ((record.totalValue ?? 0) / maxValue) * 100 : 0;
                return (
                    <div style={{ background: 'rgba(255,255,255,0.08)', borderRadius: 4, height: 10, minWidth: 120 }}>
                        <div style={{
                            width: `${pct}%`,
                            height: '100%',
                            background: 'linear-gradient(90deg, #6366f1, #a78bfa)',
                            borderRadius: 4,
                            transition: 'width 0.4s ease',
                        }} />
                    </div>
                );
            },
        },
    ];

    return (
        <>
            <div className={styles.filterBar}>
                <span className={styles.filterLabel}>Date Range:</span>
                <RangePicker
                    value={dateRange as [Dayjs, Dayjs] | null}
                    onChange={(vals) => setDateRange(vals as [Dayjs | null, Dayjs | null] | null)}
                    allowClear
                    style={{ background: 'rgba(255,255,255,0.05)', borderColor: 'rgba(255,255,255,0.12)' }}
                />
                <span className={styles.filterLabel}>Group By:</span>
                <Select
                    className={styles.filterSelect}
                    value={groupBy}
                    onChange={(v) => setGroupBy(v)}
                    options={[
                        { value: 'month', label: 'Month' },
                        { value: 'week', label: 'Week' },
                    ]}
                    style={{ minWidth: 120 }}
                />
                <Button type="primary" icon={<SearchOutlined />} onClick={load} loading={isPending}>
                    Run Report
                </Button>
                <Tooltip title="Reset filters">
                    <Button
                        icon={<ReloadOutlined />}
                        onClick={() => {
                            setDateRange(null);
                            setGroupBy('month');
                            getSalesByPeriodReport({ groupBy: 'month' });
                        }}
                    />
                </Tooltip>
            </div>

            <Row gutter={16} className={styles.statsRow}>
                <Col xs={12} sm={8}>
                    <div className={styles.statCard}>
                        <Statistic title="Periods" value={rows.length} />
                    </div>
                </Col>
                <Col xs={12} sm={8}>
                    <div className={styles.statCardAccent}>
                        <Statistic
                            title="Total Revenue"
                            value={totalValue}
                            formatter={(v) => formatCurrency(v as number)}
                        />
                    </div>
                </Col>
                <Col xs={12} sm={8}>
                    <div className={styles.statCard}>
                        <Statistic
                            title="Total Deals Won"
                            value={totalWon}
                            styles={{ content: { color: '#22c55e' } }}
                        />
                    </div>
                </Col>
            </Row>

            {rows.length > 0 && (
                <div className={styles.chartCard}>
                    <div className={styles.chartTitle}>
                        Revenue by {groupBy === 'month' ? 'Month' : 'Week'}
                    </div>
                    {rows.map((r) => {
                        const pct = maxValue > 0 ? ((r.totalValue ?? 0) / maxValue) * 100 : 0;
                        return (
                            <div key={r.period} style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
                                <span style={{ width: 90, color: 'rgba(255,255,255,0.6)', fontSize: 12, flexShrink: 0 }}>
                                    {r.period}
                                </span>
                                <div style={{ flex: 1, background: 'rgba(255,255,255,0.06)', borderRadius: 6, height: 24 }}>
                                    <div style={{
                                        width: `${pct}%`,
                                        height: '100%',
                                        background: 'linear-gradient(90deg, #6366f1, #a78bfa)',
                                        borderRadius: 6,
                                        transition: 'width 0.5s ease',
                                    }} />
                                </div>
                                <span style={{ width: 170, color: '#e2e8f0', fontSize: 12, textAlign: 'right', flexShrink: 0 }}>
                                    {formatCurrency(r.totalValue)} ({r.dealsWon} won)
                                </span>
                            </div>
                        );
                    })}
                </div>
            )}

            <Table<ISalesByPeriodItemDto>
                className={styles.table}
                rowKey="period"
                columns={columns}
                dataSource={rows}
                loading={isPending}
                pagination={false}
                scroll={{ x: 800 }}
                size="small"
                locale={{ emptyText: <Empty description="Run a report to see results" /> }}
            />
        </>
    );
};

export default SalesByPeriodTab;
