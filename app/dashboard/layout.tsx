"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UserOutlined,
    DashboardOutlined,
    TeamOutlined,
    ContactsOutlined,
    RiseOutlined,
    CalendarOutlined,
    FileTextOutlined,
    FolderOutlined,
    DollarOutlined,
    FileDoneOutlined,
    FileProtectOutlined,
    BarChartOutlined,
    LogoutOutlined,
} from '@ant-design/icons';
import { Button, Layout, Menu } from 'antd';
import { useStyles } from '@/app/dashboard/style/style';
import LogoImage from '@/components/logoImage/LogoImage';
import { useAuthActions } from '@/providers/authProvider';

import withAuth from "@/hoc/withAuth";

const { Header, Sider, Content } = Layout;

const DashboardLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [collapsed, setCollapsed] = useState(false);
    const { styles } = useStyles();
    const router = useRouter();
    const pathname = usePathname();
    const { logout } = useAuthActions();

    const handleLogout = async () => {
        await logout();
        router.push('/login');
    };

    const menuItems = [
        { key: '/dashboard', icon: <DashboardOutlined />, label: 'Dashboard' },
        { key: '/dashboard/clients', icon: <TeamOutlined />, label: 'Clients' },
        { key: '/dashboard/contacts', icon: <ContactsOutlined />, label: 'Contacts' },
        { key: '/dashboard/opportunities', icon: <RiseOutlined />, label: 'Opportunities' },
        { key: '/dashboard/activities', icon: <CalendarOutlined />, label: 'Activities' },
        { key: '/dashboard/notes', icon: <FileTextOutlined />, label: 'Notes' },
        { key: '/dashboard/documents', icon: <FolderOutlined />, label: 'Documents' },
        { key: '/dashboard/pricing-requests', icon: <DollarOutlined />, label: 'Pricing Requests' },
        { key: '/dashboard/proposals', icon: <FileDoneOutlined />, label: 'Proposals' },
        { key: '/dashboard/contracts', icon: <FileProtectOutlined />, label: 'Contracts' },
        { key: '/dashboard/reports', icon: <BarChartOutlined />, label: 'Reports' },
        { key: '/dashboard/profile', icon: <UserOutlined />, label: 'Profile' },
    ];

    return (
        <Layout className={styles.container}>
            <Sider
                trigger={null}
                collapsible
                collapsed={collapsed}
                className={styles.sider}
                width={200}
                collapsedWidth={80}
            >
                <Link href="/" className={styles.logoWrapper}>
                    <LogoImage height={collapsed ? 50 : 80} width={collapsed ? 70 : 160} />
                </Link>
                <Menu
                    theme="dark"
                    mode="inline"
                    selectedKeys={[pathname]}
                    onClick={({ key }) => router.push(key)}
                    items={menuItems}
                />
            </Sider>
            <Layout style={{ background: 'transparent' }}>
                <Header className={styles.header}>
                    <Button
                        type="text"
                        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                        onClick={() => setCollapsed(!collapsed)}
                        className={styles.triggerBtn}
                    />
                    <Button
                        type="text"
                        icon={<LogoutOutlined />}
                        onClick={handleLogout}
                        className={styles.logoutBtn}
                    >
                        Logout
                    </Button>
                </Header>
                <Content className={styles.content}>
                    {children}
                </Content>
            </Layout>
        </Layout>
    );
};

export default withAuth(DashboardLayout);