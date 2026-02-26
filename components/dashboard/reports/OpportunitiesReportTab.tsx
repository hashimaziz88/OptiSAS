'use client';

import React, { useState, useCallback } from 'react';
import { Button, Col, DatePicker, Empty, Row, Select, Statistic, Table, Tag, Tooltip } from 'antd';
import type { ColumnsType, TableProps } from 'antd/es/table';
import { ReloadOutlined, SearchOutlined } from '@ant-design/icons';
import type { Dayjs } from 'dayjs';
import { IOpportunityReportItemDto } from '@/providers/reportProvider/context';
import { useReportState, useReportActions } from '@/providers/reportProvider';
import {
    OPPORTUNITY_STAGE_COLORS,
    OPPORTUNITY_STAGE_LABELS,
    OPPORTUNITY_STAGE_OPTIONS,
} from '@/constants/opportunities';
import { useStyles } from './style/style';
import { formatCurrency } from './utils';

const { RangePicker } = DatePicker;

const OpportunitiesReportTab: React.FC = () => {
    const { styles } = useStyles();
    const { isPending, opportunitiesReport } = useReportState();
    const { getOpportunitiesReport } = useReportActions();

    const [dateRange, setDateRange] = useState<[Dayjs | null, Dayjs | null] | null>(null);
    const [stage, setStage] = useState<number | undefined>();

    const load = useCallback(() => {
        getOpportunitiesReport({
            startDate: dateRange?.[0]?.toISOString() ?? undefined,
            endDate: dateRange?.[1]?.endOf('day').toISOString() ?? undefined,
            stage,
        });
    }, [dateRange, stage, getOpportunitiesReport]);

    const rows = opportunitiesReport ?? [];
    const totalValue = rows.reduce((sum, r) => sum + (r.estimatedValue ?? 0), 0);
    const avgDeal = rows.length ? totalValue / rows.length : 0;
    const wonCount = rows.filter(r => r.stage === 5).length;
    const lostCount = rows.filter(r => r.stage === 6).length;

    const columns: ColumnsType<IOpportunityReportItemDto> = [
        {
            title: 'Opportunity',
            dataIndex: 'title',
            key: 'title',
            sorter: (a, b) => a.title.localeCompare(b.title),
            width: 200,
        },
        {
            title: 'Client',
            dataIndex: 'clientName',
            key: 'clientName',
            sorter: (a, b) => a.clientName.localeCompare(b.clientName),
            width: 160,
        },
        {
            title: 'Owner',
            dataIndex: 'ownerName',
            key: 'ownerName',
            sorter: (a, b) => a.ownerName.localeCompare(b.ownerName),
            width: 140,
        },
        {
            title: 'Stage',
            dataIndex: 'stage',
            key: 'stage',
            sorter: (a, b) => a.stage - b.stage,
            width: 130,
            render: (val: number) => (
                <Tag color={OPPORTUNITY_STAGE_COLORS[val]}>
                    {OPPORTUNITY_STAGE_LABELS[val]}
                </Tag>
            ),
        },
        {
            title: 'Est. Value',
            dataIndex: 'estimatedValue',
            key: 'estimatedValue',
            sorter: (a, b) => (a.estimatedValue ?? 0) - (b.estimatedValue ?? 0),
            defaultSortOrder: 'descend',
            width: 160,
            render: (val: number) => formatCurrency(val),
        },
        {
            title: 'Expected Close',
            dataIndex: 'expectedCloseDate',
            key: 'expectedCloseDate',
            sorter: (a, b) =>
                new Date(a.expectedCloseDate ?? 0).getTime() -
                new Date(b.expectedCloseDate ?? 0).getTime(),
            width: 140,
            render: (val: string) => val ? new Date(val).toLocaleDateString('en-ZA') : '—',
        },
        {
            title: 'Created',
            dataIndex: 'createdAt',
            key: 'createdAt',
            sorter: (a, b) =>
                new Date(a.createdAt ?? 0).getTime() -
                new Date(b.createdAt ?? 0).getTime(),
            width: 120,
            render: (val: string) => val ? new Date(val).toLocaleDateString('en-ZA') : '—',
        },
    ];

    const tableProps: TableProps<IOpportunityReportItemDto> = {
        rowKey: 'id',
        columns,
        dataSource: rows,
        loading: isPending,
        pagination: { pageSize: 15, showSizeChanger: false, showTotal: (t) => `${t} records` },
        scroll: { x: 1100 },
        size: 'small',
        locale: { emptyText: <Empty description="Run a report to see results" /> },
    };

    return (
        <>
            <div className={styles.filterBar}>
                <span className={styles.filterLabel}>Date Range:</span>
                <RangePicker
                    value={dateRange as [Dayjs, Dayjs] | null}
                    onChange={(vals) => setDateRange(vals as [Dayjs | null, Dayjs | null] | null)}
                    allowClear
                />
                <span className={styles.filterLabel}>Stage:</span>
                <Select
                    className={styles.filterSelect}
                    placeholder="All Stages"
                    options={OPPORTUNITY_STAGE_OPTIONS}
                    value={stage}
                    onChange={setStage}
                    allowClear
                />
                <Button type="primary" icon={<SearchOutlined />} onClick={load} loading={isPending}>
                    Run Report
                </Button>
                <Tooltip title="Reset filters">
                    <Button
                        icon={<ReloadOutlined />}
                        onClick={() => {
                            setDateRange(null);
                            setStage(undefined);
                            getOpportunitiesReport({});
                        }}
                    />
                </Tooltip>
            </div>

            <Row gutter={16} className={styles.statsRow}>
                <Col xs={12} sm={6}>
                    <div className={styles.statCard}>
                        <Statistic title="Total Opportunities" value={rows.length} />
                    </div>
                </Col>
                <Col xs={12} sm={6}>
                    <div className={styles.statCardAccent}>
                        <Statistic
                            title="Total Est. Value"
                            value={totalValue}
                            formatter={(v) => formatCurrency(v as number)}
                        />
                    </div>
                </Col>
                <Col xs={12} sm={6}>
                    <div className={styles.statCard}>
                        <Statistic
                            title="Avg. Deal Size"
                            value={avgDeal}
                            formatter={(v) => formatCurrency(v as number)}
                        />
                    </div>
                </Col>
                <Col xs={12} sm={6}>
                    <div className={styles.statCard}>
                        <Statistic
                            title="Won / Lost"
                            value={wonCount}
                            suffix={<span style={{ color: '#f87171', fontSize: 20 }}>/ {lostCount}</span>}
                            styles={{ content: { color: '#22c55e' } }}
                        />
                    </div>
                </Col>
            </Row>

            <Table<IOpportunityReportItemDto> className={styles.table} {...tableProps} />
        </>
    );
};

export default OpportunitiesReportTab;
