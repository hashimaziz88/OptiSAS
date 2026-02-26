'use client';

import React, { useEffect } from 'react';
import { Row, Col, Statistic, Typography, Table, Tag, Card, Progress } from 'antd';
import {
    RiseOutlined,
    FileProtectOutlined,
    CalendarOutlined,
    WarningOutlined,
    TrophyOutlined,
    DollarOutlined,
} from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import { DashboardProvider, useDashboardActions, useDashboardState } from '@/providers/dashboardProvider';
import { IContractDto } from '@/providers/contractProvider/context';
import { ISalesPerformanceDto } from '@/providers/dashboardProvider/context';
import { formatCurrency } from '@/utils/dashboard/opportunities';
import { CONTRACT_STATUS_COLORS } from '@/constants/contracts';

const { Title } = Typography;

const cardStyle: React.CSSProperties = {
    background: 'rgba(255,255,255,0.05)',
    border: '1px solid rgba(255,255,255,0.08)',
    borderRadius: 16,
};

const cardBodyStyle: React.CSSProperties = { padding: '20px 24px' };

// Safely coerce API responses that may be arrays OR paged result objects
const toArray = <T,>(data: T[] | { items?: T[] } | null | undefined): T[] => {
    if (!data) return [];
    if (Array.isArray(data)) return data;
    if (Array.isArray((data as { items?: T[] }).items)) return (data as { items: T[] }).items;
    return [];
};

const DashboardContent: React.FC = () => {
    const { getDashboardOverview, getSalesPerformance, getContractsExpiring } = useDashboardActions();
    const { isPending, overview, salesPerformance, contractsExpiring } = useDashboardState();

    useEffect(() => {
        getDashboardOverview();
        getSalesPerformance(5);
        getContractsExpiring(30);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const performanceList = toArray<ISalesPerformanceDto>(salesPerformance as ISalesPerformanceDto[] | null);
    const expiringList = toArray<IContractDto>(contractsExpiring as IContractDto[] | null);

    const kpiCards = [
        {
            title: 'Pipeline Value',
            value: overview?.opportunities.pipelineValue ?? 0,
            prefix: <RiseOutlined />,
            formatter: (v: number | string) => formatCurrency(Number(v)),
            color: '#60a5fa',
            description: `${overview?.opportunities.totalCount ?? 0} active opportunities`,
        },
        {
            title: 'Win Rate',
            value: overview ? Math.round(overview.opportunities.winRate * 100) : 0,
            prefix: <TrophyOutlined />,
            formatter: (v: number | string) => `${v}%`,
            color: '#34d399',
            description: `${overview?.opportunities.wonCount ?? 0} deals won`,
        },
        {
            title: 'Active Contracts',
            value: overview?.contracts.totalActiveCount ?? 0,
            prefix: <FileProtectOutlined />,
            formatter: (v: number | string) => String(v),
            color: '#a78bfa',
            description: `${overview?.contracts.expiringThisMonthCount ?? 0} expiring this month`,
        },
        {
            title: 'Contract Value',
            value: overview?.contracts.totalContractValue ?? 0,
            prefix: <DollarOutlined />,
            formatter: (v: number | string) => formatCurrency(Number(v)),
            color: '#fbbf24',
            description: 'Total active contract value',
        },
        {
            title: 'Upcoming Activities',
            value: overview?.activities.upcomingCount ?? 0,
            prefix: <CalendarOutlined />,
            formatter: (v: number | string) => String(v),
            color: '#38bdf8',
            description: `${overview?.activities.completedTodayCount ?? 0} completed today`,
        },
        {
            title: 'Overdue Activities',
            value: overview?.activities.overdueCount ?? 0,
            prefix: <WarningOutlined />,
            formatter: (v: number | string) => String(v),
            color: '#f87171',
            description: 'Require immediate attention',
        },
    ];

    const performanceColumns: ColumnsType<ISalesPerformanceDto> = [
        {
            title: 'Rep',
            dataIndex: 'userName',
            key: 'userName',
            render: (v: string) => <span style={{ color: '#e2e8f0', fontWeight: 500 }}>{v}</span>,
        },
        {
            title: 'Deals Won',
            dataIndex: 'dealsWon',
            key: 'dealsWon',
            align: 'center',
            render: (v: number) => <span style={{ color: '#34d399', fontWeight: 600 }}>{v}</span>,
        },
        {
            title: 'Total Value',
            dataIndex: 'totalValue',
            key: 'totalValue',
            render: (v: number) => <span style={{ color: '#60a5fa' }}>{formatCurrency(v)}</span>,
        },
        {
            title: 'Win Rate',
            dataIndex: 'winRate',
            key: 'winRate',
            render: (v: number) => (
                <Progress
                    percent={Math.round(v * 100)}
                    size="small"
                    strokeColor="#34d399"
                    railColor="rgba(255,255,255,0.1)"
                    format={(p) => <span style={{ color: '#cbd5e0', fontSize: 11 }}>{p}%</span>}
                />
            ),
            width: 160,
        },
        {
            title: 'Activities',
            dataIndex: 'activitiesCompleted',
            key: 'activitiesCompleted',
            align: 'center',
            render: (v: number) => <span style={{ color: '#94a3b8' }}>{v}</span>,
        },
    ];

    const expiringColumns: ColumnsType<IContractDto> = [
        {
            title: 'Contract',
            dataIndex: 'contractNumber',
            key: 'contractNumber',
            render: (v: string) => <span style={{ color: '#fb923c', fontFamily: 'monospace', fontSize: 12 }}>{v}</span>,
        },
        {
            title: 'Client',
            dataIndex: 'clientName',
            key: 'clientName',
            render: (v: string) => <span style={{ color: '#94a3b8' }}>{v}</span>,
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            width: 90,
            render: (s: number, record) => <Tag color={CONTRACT_STATUS_COLORS[s]}>{record.statusName || s}</Tag>,
        },
        {
            title: 'Days Left',
            dataIndex: 'daysUntilExpiry',
            key: 'daysUntilExpiry',
            width: 80,
            align: 'center',
            render: (v: number) => <span style={{ color: v < 14 ? '#f87171' : '#fb923c', fontWeight: 600 }}>{v}</span>,
        },
        {
            title: 'Value',
            dataIndex: 'contractValue',
            key: 'contractValue',
            render: (v: number, record) => <span style={{ color: '#34d399' }}>{formatCurrency(v, record.currency)}</span>,
        },
    ];

    const pipelineStages = overview?.pipeline.stages ?? [];

    return (
        <div style={{ paddingBottom: 24 }}>
            <Title level={2} style={{ color: 'white', marginBottom: 24, fontWeight: 700 }}>Dashboard Overview</Title>

            {/* KPI Cards */}
            <Row gutter={[16, 16]} style={{ marginBottom: 28 }}>
                {kpiCards.map((kpi) => (
                    <Col xs={24} sm={12} lg={8} key={kpi.title}>
                        <Card style={cardStyle} styles={{ body: cardBodyStyle }} loading={isPending}>
                            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16 }}>
                                <div style={{
                                    width: 48,
                                    height: 48,
                                    borderRadius: 12,
                                    background: `${kpi.color}20`,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: 20,
                                    color: kpi.color,
                                    flexShrink: 0,
                                }}>
                                    {kpi.prefix}
                                </div>
                                <div style={{ flex: 1, minWidth: 0 }}>
                                    <div style={{ color: '#8c8c8c', fontSize: 13, marginBottom: 4 }}>{kpi.title}</div>
                                    <Statistic
                                        value={kpi.value}
                                        formatter={kpi.formatter as (v: number | string) => React.ReactNode}
                                        styles={{ content: { color: kpi.color, fontSize: 22, fontWeight: 700, lineHeight: '1.2' } }}
                                    />
                                    <div style={{ color: '#64748b', fontSize: 12, marginTop: 4 }}>{kpi.description}</div>
                                </div>
                            </div>
                        </Card>
                    </Col>
                ))}
            </Row>

            <Row gutter={[16, 16]}>
                {/* Pipeline Breakdown */}
                <Col xs={24} lg={10}>
                    <Card
                        title={<span style={{ color: 'white', fontWeight: 600 }}>Pipeline by Stage</span>}
                        style={cardStyle}
                        styles={{ body: cardBodyStyle, header: { background: 'transparent', borderBottom: '1px solid rgba(255,255,255,0.08)', color: 'white' } }}
                        loading={isPending}
                    >
                        {pipelineStages.length > 0 ? (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                                {pipelineStages.map((stage) => {
                                    const totalValue = pipelineStages.reduce((s, st) => s + st.value, 0);
                                    const pct = totalValue > 0 ? Math.round((stage.value / totalValue) * 100) : 0;
                                    return (
                                        <div key={stage.stageName}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                                                <span style={{ color: '#cbd5e0', fontSize: 13 }}>{stage.stageName}</span>
                                                <span style={{ color: '#60a5fa', fontSize: 13, fontWeight: 600 }}>
                                                    {stage.count} · {formatCurrency(stage.value)}
                                                </span>
                                            </div>
                                            <Progress
                                                percent={pct}
                                                showInfo={false}
                                                strokeColor="#3b82f6"
                                                railColor="rgba(255,255,255,0.07)"
                                                size="small"
                                            />
                                        </div>
                                    );
                                })}
                            </div>
                        ) : (
                            <div style={{ color: '#64748b', textAlign: 'center', padding: '20px 0' }}>No pipeline data</div>
                        )}
                    </Card>
                </Col>

                {/* Top Performers */}
                <Col xs={24} lg={14}>
                    <Card
                        title={<span style={{ color: 'white', fontWeight: 600 }}>Top Performers</span>}
                        style={cardStyle}
                        styles={{ body: { padding: 0 }, header: { background: 'transparent', borderBottom: '1px solid rgba(255,255,255,0.08)', color: 'white' } }}
                        loading={isPending}
                    >
                        <Table
                            columns={performanceColumns}
                            dataSource={performanceList}
                            rowKey="userId"
                            pagination={false}
                            size="small"
                            style={{ background: 'transparent' }}
                        />
                    </Card>
                </Col>
            </Row>

            {/* Expiring Contracts */}
            {expiringList.length > 0 && (
                <Row style={{ marginTop: 16 }}>
                    <Col span={24}>
                        <Card
                            title={<span style={{ color: '#fb923c', fontWeight: 600 }}>⚠ Contracts Expiring Soon</span>}
                            style={{ ...cardStyle, borderColor: 'rgba(251,146,60,0.3)' }}
                            styles={{ body: { padding: 0 }, header: { background: 'rgba(251,146,60,0.05)', borderBottom: '1px solid rgba(251,146,60,0.2)' } }}
                            loading={isPending}
                        >
                            <Table
                                columns={expiringColumns}
                                dataSource={expiringList}
                                rowKey="id"
                                pagination={false}
                                size="small"
                                style={{ background: 'transparent' }}
                            />
                        </Card>
                    </Col>
                </Row>
            )}
        </div>
    );
};

const DashboardPage: React.FC = () => (
    <DashboardProvider>
        <DashboardContent />
    </DashboardProvider>
);

export default DashboardPage;
