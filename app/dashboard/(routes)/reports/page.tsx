'use client';

import React from 'react';
import { Tabs, Typography } from 'antd';
import OpportunitiesReportTab from '@/components/dashboard/reports/OpportunitiesReportTab';
import SalesByPeriodTab from '@/components/dashboard/reports/SalesByPeriodTab';
import { useStyles } from '@/components/dashboard/reports/style/style';

const { Title } = Typography;

const tabItems = [
    { key: 'opportunities', label: 'Opportunities Report', children: <OpportunitiesReportTab /> },
    { key: 'sales-by-period', label: 'Sales by Period', children: <SalesByPeriodTab /> },
];

const ReportsContent: React.FC = () => {
    const { styles } = useStyles();

    return (
        <div>
            <div className={styles.pageHeader}>
                <Title level={2} className={styles.pageTitle}>Reports</Title>
            </div>
            <Tabs defaultActiveKey="opportunities" items={tabItems} className={styles.tabsWrap} />
        </div>
    );
};

const ReportsPage: React.FC = () => (
        <ReportsContent />
);

export default ReportsPage;
