'use client';

import React, { useState, useCallback } from 'react';
import { Button, Col, DatePicker, Empty, Row, Select, Statistic, Table, Tag, Tooltip } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { FilePdfOutlined, ReloadOutlined, SearchOutlined } from '@ant-design/icons';
import type { Dayjs } from 'dayjs';
import { ISalesByPeriodItemDto } from '@/providers/reportProvider/context';
import { useReportState, useReportActions } from '@/providers/reportProvider';
import { SALES_GROUP_BY_OPTIONS } from '@/constants/reports';
import { useStyles } from './style/style';
import { formatCurrency } from './utils';
import { generateSalesByPeriodReportPdf } from './generatePdf';
import AiInsightsCard from '@/components/aiInsightsCard';

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
    const maxTotalValue = rows.length ? Math.max(...rows.map(r => r.totalValue ?? 0)) : 1;

    const totalPipeline = rows.reduce((sum, r) => sum + (r.totalValue ?? 0), 0);
    const totalWonRevenue = rows.reduce((sum, r) => sum + (r.wonValue ?? 0), 0);
    const totalWonDeals = rows.reduce((sum, r) => sum + (r.wonCount ?? 0), 0);
    const avgWinRate = rows.length
        ? rows.reduce((sum, r) => sum + (r.winRate ?? 0), 0) / rows.length
        : 0;

    const salesContext = {
        periods: rows.length,
        totalPipelineValue: totalPipeline,
        totalWonRevenue,
        totalWonDeals,
        avgWinRate: parseFloat(avgWinRate.toFixed(1)),
        groupBy: groupBy === 'month' ? 'Monthly' : 'Weekly',
        dateRange: dateRange
            ? `${dateRange[0]?.format('DD/MM/YYYY')} to ${dateRange[1]?.format('DD/MM/YYYY')}`
            : 'All time',
    };

    const columns: ColumnsType<ISalesByPeriodItemDto> = [
        {
            title: 'Period',
            dataIndex: 'periodName',
            key: 'periodName',
            sorter: (a, b) => {
                if (a.year !== b.year) return a.year - b.year;
                if (a.month != null && b.month != null) return a.month - b.month;
                if (a.week != null && b.week != null) return a.week - b.week;
                return 0;
            },
            width: 150,
        },
        {
            title: 'Opportunities',
            dataIndex: 'opportunitiesCount',
            key: 'opportunitiesCount',
            sorter: (a, b) => a.opportunitiesCount - b.opportunitiesCount,
            align: 'center',
            width: 110,
            render: (v: number) => <Tag color="blue">{v}</Tag>,
        },
        {
            title: 'Won',
            dataIndex: 'wonCount',
            key: 'wonCount',
            sorter: (a, b) => a.wonCount - b.wonCount,
            align: 'center',
            width: 70,
            render: (v: number) => <Tag color="green">{v}</Tag>,
        },
        {
            title: 'Lost',
            dataIndex: 'lostCount',
            key: 'lostCount',
            sorter: (a, b) => a.lostCount - b.lostCount,
            align: 'center',
            width: 70,
            render: (v: number) => <Tag color="red">{v}</Tag>,
        },
        {
            title: 'Win Rate',
            dataIndex: 'winRate',
            key: 'winRate',
            sorter: (a, b) => a.winRate - b.winRate,
            align: 'center',
            width: 100,
            render: (v: number) => (
                <span className={v >= 50 ? styles.winRateHigh : v >= 30 ? styles.winRateMedium : styles.winRateLow}>
                    {v.toFixed(1)}%
                </span>
            ),
        },
        {
            title: 'Won Revenue',
            dataIndex: 'wonValue',
            key: 'wonValue',
            sorter: (a, b) => (a.wonValue ?? 0) - (b.wonValue ?? 0),
            defaultSortOrder: 'descend',
            align: 'right',
            width: 190,
            render: (v: number) => formatCurrency(v),
        },
        {
            title: 'Pipeline Value',
            dataIndex: 'totalValue',
            key: 'totalValue',
            sorter: (a, b) => a.totalValue - b.totalValue,
            align: 'right',
            width: 190,
            render: (v: number) => formatCurrency(v),
        },
        {
            title: 'Pipeline / Won',
            key: 'bar',
            render: (_, record) => {
                const totalPct = maxTotalValue > 0 ? ((record.totalValue ?? 0) / maxTotalValue) * 100 : 0;
                const wonPct = record.totalValue > 0 ? ((record.wonValue ?? 0) / record.totalValue) * totalPct : 0;
                return (
                    <div className={styles.barTrackSmall}>
                        <div className={styles.barPipeline} style={{ width: `${totalPct}%` }} />
                        <div className={styles.barWon} style={{ width: `${wonPct}%` }} />
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
                />
                <span className={styles.filterLabel}>Group By:</span>
                <Select
                    className={styles.filterSelectMin}
                    value={groupBy}
                    onChange={(v) => setGroupBy(v)}
                    options={SALES_GROUP_BY_OPTIONS}
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
                <Tooltip title={rows.length === 0 ? 'Run a report first' : 'Export as PDF'}>
                    <Button
                        icon={<FilePdfOutlined />}
                        disabled={rows.length === 0}
                        onClick={() =>
                            generateSalesByPeriodReportPdf(rows, {
                                dateRange: dateRange
                                    ? `${dateRange[0]?.format('DD/MM/YYYY')} – ${dateRange[1]?.format('DD/MM/YYYY')}`
                                    : undefined,
                                groupBy: groupBy.charAt(0).toUpperCase() + groupBy.slice(1),
                            })
                        }
                    >
                        Export PDF
                    </Button>
                </Tooltip>
            </div>

            <Row gutter={16} className={styles.statsRow}>
                <Col xs={12} sm={6}>
                    <div className={styles.statCard}>
                        <Statistic title="Periods" value={rows.length} />
                    </div>
                </Col>
                <Col xs={12} sm={6}>
                    <div className={styles.statCardAccent}>
                        <Statistic
                            title="Pipeline Value"
                            value={totalPipeline}
                            formatter={(v) => formatCurrency(v as number)}
                            classNames={{ content: styles.statAccentValue }}
                        />
                    </div>
                </Col>
                <Col xs={12} sm={6}>
                    <div className={styles.statCard}>
                        <Statistic
                            title="Won Revenue"
                            value={totalWonRevenue}
                            formatter={(v) => formatCurrency(v as number)}
                            styles={{ content: { color: '#22c55e' } }}
                        />
                    </div>
                </Col>
                <Col xs={12} sm={6}>
                    <div className={styles.statCard}>
                        <Statistic
                            title="Total Won Deals"
                            value={totalWonDeals}
                            suffix={
                                <span className={styles.winRateSuffix}>
                                    &nbsp;avg {avgWinRate.toFixed(1)}% win
                                </span>
                            }
                            styles={{ content: { color: '#a78bfa' } }}
                        />
                    </div>
                </Col>
            </Row>

            <div className={styles.sectionSpacing}>
                <AiInsightsCard
                    data={salesContext}
                    type="report"
                    title="AI Sales Performance Analysis"
                    disabled={!salesByPeriodReport || salesByPeriodReport.length === 0}
                />
            </div>

            {rows.length > 0 && (
                <div className={styles.chartCard}>
                    <div className={styles.chartTitle}>
                        Revenue by {groupBy === 'month' ? 'Month' : 'Week'}
                    </div>
                    {rows.map((r, i) => {
                        const totalPct = maxTotalValue > 0 ? ((r.totalValue ?? 0) / maxTotalValue) * 100 : 0;
                        const wonPct = r.totalValue > 0 ? ((r.wonValue ?? 0) / r.totalValue) * totalPct : 0;
                        return (
                            <div key={r.periodName ?? i} className={styles.barRow}>
                                <span className={styles.periodLabel}>
                                    {r.periodName}
                                </span>
                                <div className={styles.barTrack}>
                                    <div className={styles.barPipelineChart} style={{ width: `${totalPct}%` }} />
                                    <div className={styles.barWonChart} style={{ width: `${wonPct}%` }} />
                                </div>
                                <span className={styles.barValues}>
                                    {formatCurrency(r.wonValue)} won · {r.winRate.toFixed(1)}% rate
                                </span>
                            </div>
                        );
                    })}
                    <div className={styles.legendContainer}>
                        <span>
                            <span className={styles.legendSwatchPipeline} />
                            Pipeline Value
                        </span>
                        <span>
                            <span className={styles.legendSwatchWon} />
                            Won Revenue
                        </span>
                    </div>
                </div>
            )}

            <Table<ISalesByPeriodItemDto>
                className={styles.table}
                rowKey="periodName"
                columns={columns}
                dataSource={rows}
                loading={isPending}
                pagination={false}
                scroll={{ x: 1000 }}
                size="small"
                locale={{ emptyText: <Empty description="Run a report to see results" /> }}
            />
        </>
    );
};

export default SalesByPeriodTab;
