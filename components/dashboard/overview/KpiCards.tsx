'use client';

import React from 'react';
import { Row, Col, Card, Statistic } from 'antd';
import {
    RiseOutlined,
    TrophyOutlined,
    FileProtectOutlined,
    DollarOutlined,
    CalendarOutlined,
    WarningOutlined,
} from '@ant-design/icons';
import { IDashboardOverviewDto } from '@/providers/dashboardProvider/context';
import { formatCurrency } from '@/utils/dashboard/opportunities';
import { KpiCardsProps } from '@/types/componentProps';
import { useStyles } from './style/style';

const KpiCards: React.FC<KpiCardsProps> = ({ overview, loading }) => {
    const { styles } = useStyles();

    const cards = [
        {
            title: 'Pipeline Value',
            value: overview?.opportunities.pipelineValue ?? 0,
            icon: <RiseOutlined />,
            color: '#60a5fa',
            formatter: (v: number | string) => formatCurrency(Number(v)),
            description: `${overview?.opportunities.totalCount ?? 0} active opportunities`,
        },
        {
            title: 'Win Rate',
            value: overview ? Math.round(overview.opportunities.winRate) : 0,
            icon: <TrophyOutlined />,
            color: '#34d399',
            formatter: (v: number | string) => `${v}%`,
            description: `${overview?.opportunities.wonCount ?? 0} deals won`,
        },
        {
            title: 'Active Contracts',
            value: overview?.contracts.totalActiveCount ?? 0,
            icon: <FileProtectOutlined />,
            color: '#a78bfa',
            formatter: (v: number | string) => `${v}`,
            description: `${overview?.contracts.expiringThisMonthCount ?? 0} expiring this month`,
        },
        {
            title: 'Contract Value',
            value: overview?.contracts.totalContractValue ?? 0,
            icon: <DollarOutlined />,
            color: '#fbbf24',
            formatter: (v: number | string) => formatCurrency(Number(v)),
            description: 'Total active contract value',
        },
        {
            title: 'Upcoming Activities',
            value: overview?.activities.upcomingCount ?? 0,
            icon: <CalendarOutlined />,
            color: '#38bdf8',
            formatter: (v: number | string) => `${v}`,
            description: `${overview?.activities.completedTodayCount ?? 0} completed today`,
        },
        {
            title: 'Overdue Activities',
            value: overview?.activities.overdueCount ?? 0,
            icon: <WarningOutlined />,
            color: '#f87171',
            formatter: (v: number | string) => `${v}`,
            description: 'Require immediate attention',
        },
    ];

    return (
        <Row gutter={[16, 16]}>
            {cards.map((kpi) => (
                <Col xs={24} sm={12} lg={8} key={kpi.title}>
                    <Card
                        className={styles.kpiCard}
                        loading={loading}
                    >
                        <div className={styles.kpiRow}>
                            <div
                                className={styles.kpiIconBox}
                                style={{
                                    background: `${kpi.color}20`,
                                    color: kpi.color,
                                }}
                            >
                                {kpi.icon}
                            </div>
                            <div className={styles.kpiContent}>
                                <div className={styles.kpiLabel}>{kpi.title}</div>
                                <Statistic
                                    value={kpi.value}
                                    formatter={kpi.formatter as (v: number | string) => React.ReactNode}
                                    styles={{ content: { color: kpi.color } }}
                                />
                                <div className={styles.kpiDescription}>{kpi.description}</div>
                            </div>
                        </div>
                    </Card>
                </Col>
            ))}
        </Row>
    );
};

export default KpiCards;
