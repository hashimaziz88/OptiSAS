'use client';

import React from 'react';
import { Row, Col, Card } from 'antd';
import { CalendarOutlined, WarningOutlined, CheckCircleOutlined } from '@ant-design/icons';
import { IActivitiesDashboardSummaryDto } from '@/providers/dashboardProvider/context';
import { ActivitiesSummaryCardsProps } from '@/types/componentProps';
import { useStyles } from './style/style';

const ActivitiesSummaryCards: React.FC<ActivitiesSummaryCardsProps> = ({ activities, loading }) => {
    const { styles } = useStyles();

    const items = [
        {
            label: 'Upcoming',
            value: activities?.upcomingCount ?? 0,
            color: '#38bdf8',
            icon: <CalendarOutlined style={{ fontSize: 24 }} />,
            description: 'Scheduled & not started',
        },
        {
            label: 'Overdue',
            value: activities?.overdueCount ?? 0,
            color: '#f87171',
            icon: <WarningOutlined style={{ fontSize: 24 }} />,
            description: 'Past due date',
        },
        {
            label: 'Completed Today',
            value: activities?.completedTodayCount ?? 0,
            color: '#34d399',
            icon: <CheckCircleOutlined style={{ fontSize: 24 }} />,
            description: 'Finished today',
        },
    ];

    return (
        <Row gutter={[16, 16]}>
            {items.map((item) => (
                <Col xs={24} sm={8} key={item.label}>
                    <Card
                        className={styles.activityCard}
                        styles={{ body: { padding: '24px 16px' } }}
                        loading={loading}
                    >
                        <div style={{ color: item.color, marginBottom: 12 }}>{item.icon}</div>
                        <div className={styles.activityValue} style={{ color: item.color }}>
                            {item.value}
                        </div>
                        <div style={{ color: 'white', fontWeight: 600, fontSize: 14, marginTop: 6 }}>{item.label}</div>
                        <div className={styles.activityLabel}>{item.description}</div>
                    </Card>
                </Col>
            ))}
        </Row>
    );
};

export default ActivitiesSummaryCards;
