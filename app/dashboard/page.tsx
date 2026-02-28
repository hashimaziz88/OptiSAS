'use client';

import React, { useEffect } from 'react';
import { Row, Col, Typography, Button, Divider } from 'antd';
import { ReloadOutlined } from '@ant-design/icons';
import { DashboardProvider, useDashboardActions, useDashboardState } from '@/providers/dashboardProvider';
import { IContractDto } from '@/providers/contractProvider/context';
import { ISalesPerformanceDto } from '@/providers/dashboardProvider/context';
import { useAuthState } from '@/providers/authProvider';
import { isAdminOrManager } from '@/utils/roles';
import { toArray } from '@/utils/helpers';
import KpiCards from '@/components/dashboard/overview/KpiCards';
import ActivitiesSummaryCards from '@/components/dashboard/overview/ActivitiesSummaryCards';
import PipelineBarChart from '@/components/dashboard/overview/PipelineBarChart';
import RevenueTrendChart from '@/components/dashboard/overview/RevenueTrendChart';
import ContractsExpiringTable from '@/components/dashboard/overview/ContractsExpiringTable';
import TopPerformersTable from '@/components/dashboard/overview/TopPerformersTable';
import { useStyles } from '@/components/dashboard/overview/style/style';
import AiInsightsCard from '@/components/aiInsightsCard';

const { Title } = Typography;

const DashboardContent: React.FC = () => {
    const { user } = useAuthState();
    const canViewTopPerformers = isAdminOrManager(user?.roles);
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
        if (canViewTopPerformers) getSalesPerformance(5);
        getContractsExpiring(30);
        getActivitiesSummary();
        getDashboardPipelineMetrics();
    };

    useEffect(() => {
        getDashboardOverview();
        if (canViewTopPerformers) getSalesPerformance(5);
        getContractsExpiring(30);
        getActivitiesSummary();
        getDashboardPipelineMetrics();
    }, [getDashboardOverview, getSalesPerformance, getContractsExpiring, getActivitiesSummary, getDashboardPipelineMetrics, canViewTopPerformers]);

    const performanceList: ISalesPerformanceDto[] = Array.isArray(salesPerformance) ? salesPerformance : [];
    const expiringList = toArray<IContractDto>(contractsExpiring as IContractDto[] | null);
    const pipelineStages = overview?.pipeline.stages ?? [];

    const dashboardContext = {
        pipelineValue: overview?.opportunities?.pipelineValue,
        winRate: overview?.opportunities?.winRate,
        totalOpportunities: overview?.opportunities?.totalCount,
        wonDeals: overview?.opportunities?.wonCount,
        upcomingActivities: overview?.activities?.upcomingCount,
        overdueActivities: overview?.activities?.overdueCount,
        activeContracts: overview?.contracts?.totalActiveCount,
        contractValue: overview?.contracts?.totalContractValue,
        expiringContracts: overview?.contracts?.expiringThisMonthCount,
        revenueThisMonth: overview?.revenue?.thisMonth,
        revenueThisQuarter: overview?.revenue?.thisQuarter,
        revenueThisYear: overview?.revenue?.thisYear,
    };

    return (
        <div className={styles.pageWrapper}>
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

            <Divider className={styles.sectionDivider} />

            {/* Activities Summary */}
            <div className={styles.activitiesHeader}>
                <Title level={5} className={styles.sectionSubtitle}>
                    Activities Overview
                </Title>
                <ActivitiesSummaryCards activities={overview?.activities} loading={isPending} />
            </div>

            <Divider className={styles.sectionDivider} />

            {/* Charts Row */}
            <Row gutter={[16, 16]}>
                <Col xs={24} lg={12}>
                    <PipelineBarChart stages={pipelineStages} loading={isPending} />
                </Col>
                <Col xs={24} lg={12}>
                    <RevenueTrendChart revenue={overview?.revenue} loading={isPending} />
                </Col>
            </Row>

            <Divider className={styles.sectionDivider} />

            {/* AI Business Insights */}
            <AiInsightsCard
                data={dashboardContext}
                type="dashboard"
                disabled={!overview}
            />

            <Divider className={styles.sectionDivider} />

            {/* Bottom Row: Top Performers + Expiring Contracts */}
            <Row gutter={[16, 16]}>
                {canViewTopPerformers && (
                    <Col xs={24} xl={14}>
                        <TopPerformersTable performers={performanceList} loading={isPending} />
                    </Col>
                )}
                <Col xs={24} xl={canViewTopPerformers ? 10 : 24}>
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
