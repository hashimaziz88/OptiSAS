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
            icon: <CalendarOutlined className={styles.activityIcon} />,
            description: 'Scheduled & not started',
        },
        {
            label: 'Overdue',
            value: activities?.overdueCount ?? 0,
            color: '#f87171',
            icon: <WarningOutlined className={styles.activityIcon} />,
            description: 'Past due date',
        },
        {
            label: 'Completed Today',
            value: activities?.completedTodayCount ?? 0,
            color: '#34d399',
            icon: <CheckCircleOutlined className={styles.activityIcon} />,
            description: 'Finished today',
        },
    ];

    return (
        <Row gutter={[16, 16]}>
            {items.map((item) => (
                <Col xs={24} sm={8} key={item.label}>
                    <Card
                        className={styles.activityCard}
                        loading={loading}
                    >
                        <div className={styles.activityIconWrap} style={{ color: item.color }}>{item.icon}</div>
                        <div className={styles.activityValue} style={{ color: item.color }}>
                            {item.value}
                        </div>
                        <div className={styles.activityLabelText}>{item.label}</div>
                        <div className={styles.activityLabel}>{item.description}</div>
                    </Card>
                </Col>
            ))}
        </Row>
    );
};

export default ActivitiesSummaryCards;
