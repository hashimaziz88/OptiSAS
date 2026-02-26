'use client';

import React, { useEffect } from 'react';
import { Row, Col, Typography, Button, Divider } from 'antd';
import { ReloadOutlined } from '@ant-design/icons';
import { DashboardProvider, useDashboardActions, useDashboardState } from '@/providers/dashboardProvider';
import { IContractDto } from '@/providers/contractProvider/context';
import { ISalesPerformanceDto } from '@/providers/dashboardProvider/context';
import KpiCards from '@/components/dashboard/overview/KpiCards';
import ActivitiesSummaryCards from '@/components/dashboard/overview/ActivitiesSummaryCards';
import PipelineBarChart from '@/components/dashboard/overview/PipelineBarChart';
import RevenueTrendChart from '@/components/dashboard/overview/RevenueTrendChart';
import ContractsExpiringTable from '@/components/dashboard/overview/ContractsExpiringTable';
import TopPerformersTable from '@/components/dashboard/overview/TopPerformersTable';
import { useStyles } from '@/components/dashboard/overview/style/style';

const { Title } = Typography;

const toArray = <T,>(data: T[] | { items?: T[] } | null | undefined): T[] => {
    if (!data) return [];
    if (Array.isArray(data)) return data;
    if (Array.isArray((data as { items?: T[] }).items)) return (data as { items: T[] }).items;
    return [];
};

const DashboardContent: React.FC = () => {
    const {
        getDashboardOverview,
        getSalesPerformance,
        getContractsExpiring,
        getActivitiesSummary,
        getDashboardPipelineMetrics,
    } = useDashboardActions();
    const { isPending, overview, salesPerformance, contractsExpiring } = useDashboardState();
    const { styles } = useStyles();

    const fetchAll = () => {
        getDashboardOverview();
        getSalesPerformance(5);
        getContractsExpiring(30);
        getActivitiesSummary();
        getDashboardPipelineMetrics();
    };

    useEffect(() => {
        getDashboardOverview();
        getSalesPerformance(5);
        getContractsExpiring(30);
        getActivitiesSummary();
        getDashboardPipelineMetrics();
    }, [getDashboardOverview, getSalesPerformance, getContractsExpiring, getActivitiesSummary, getDashboardPipelineMetrics]);

    const performanceList = toArray<ISalesPerformanceDto>(salesPerformance as ISalesPerformanceDto[] | null);
    const expiringList = toArray<IContractDto>(contractsExpiring as IContractDto[] | null);
    const pipelineStages = overview?.pipeline.stages ?? [];

    return (
        <div style={{ paddingBottom: 32 }}>
            {/* Page Header */}
            <div className={styles.pageHeader}>
                <Title level={2} className={styles.pageTitle}>Dashboard Overview</Title>
                <Button
                    icon={<ReloadOutlined spin={isPending} />}
                    onClick={fetchAll}
                    loading={isPending}
                    className={styles.refreshBtn}
                >
                    Refresh
                </Button>
            </div>

            {/* KPI Cards */}
            <KpiCards overview={overview} loading={isPending} />

            <Divider style={{ borderColor: 'rgba(255,255,255,0.06)', margin: '24px 0' }} />

            {/* Activities Summary */}
            <div style={{ marginBottom: 8 }}>
                <Title level={5} style={{ color: '#94a3b8', marginBottom: 14, fontWeight: 500 }}>
                    Activities Overview
                </Title>
                <ActivitiesSummaryCards activities={overview?.activities} loading={isPending} />
            </div>

            <Divider style={{ borderColor: 'rgba(255,255,255,0.06)', margin: '24px 0' }} />

            {/* Charts Row */}
            <Row gutter={[16, 16]}>
                <Col xs={24} lg={12}>
                    <PipelineBarChart stages={pipelineStages} loading={isPending} />
                </Col>
                <Col xs={24} lg={12}>
                    <RevenueTrendChart revenue={overview?.revenue} loading={isPending} />
                </Col>
            </Row>

            <Divider style={{ borderColor: 'rgba(255,255,255,0.06)', margin: '24px 0' }} />

            {/* Bottom Row: Top Performers + Expiring Contracts */}
            <Row gutter={[16, 16]}>
                <Col xs={24} xl={14}>
                    <TopPerformersTable performers={performanceList} loading={isPending} />
                </Col>
                <Col xs={24} xl={10}>
                    <ContractsExpiringTable contracts={expiringList} loading={isPending} />
                </Col>
            </Row>
        </div>
    );
};

const DashboardPage: React.FC = () => (
    <DashboardProvider>
        <DashboardContent />
    </DashboardProvider>
);

export default DashboardPage;
