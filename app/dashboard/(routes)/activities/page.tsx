'use client';

import React, { useEffect, useState } from 'react';
import {
    Button, Input, Select, Typography, message, Drawer,
    Descriptions, Tag, Space, Tabs, Badge,
} from 'antd';
import { PlusOutlined, SearchOutlined, ReloadOutlined } from '@ant-design/icons';
import { ActivityProvider, useActivityActions, useActivityState } from '@/providers/activityProvider';
import {
    IActivityDto,
    ICreateActivityDto,
    IUpdateActivityDto,
} from '@/providers/activityProvider/context';
import {
    ACTIVITY_TYPE_LABELS,
    ACTIVITY_TYPE_COLORS,
    ACTIVITY_TYPE_OPTIONS,
    ACTIVITY_STATUS_LABELS,
    ACTIVITY_STATUS_COLORS,
    ACTIVITY_STATUS_OPTIONS,
    ACTIVITIES_PAGE_SIZE,
} from '@/constants/activities';
import ActivitiesTable from '@/components/dashboard/activities/ActivitiesTable';
import ActivityFormModal from '@/components/dashboard/activities/ActivityFormModal';
import CompleteActivityModal from '@/components/dashboard/activities/CompleteActivityModal';
import { useStyles } from '@/components/dashboard/activities/style/style';

const { Title } = Typography;

const PRIORITY_LABELS: Record<number, string> = { 1: 'Low', 2: 'Medium', 3: 'High', 4: 'Urgent' };
const PRIORITY_COLORS: Record<number, string> = { 1: 'default', 2: 'blue', 3: 'orange', 4: 'red' };

const ActivitiesContent: React.FC = () => {
    const { styles } = useStyles();
    const {
        getActivities,
        getMyActivities,
        getUpcomingActivities,
        getOverdueActivities,
        createActivity,
        updateActivity,
        deleteActivity,
        completeActivity,
        cancelActivity,
    } = useActivityActions();
    const { isPending, pagedResult, upcomingActivities, overdueActivities } = useActivityState();

    const [activeTab, setActiveTab] = useState<'all' | 'mine' | 'upcoming' | 'overdue'>('all');

    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(ACTIVITIES_PAGE_SIZE);
    const [searchTerm, setSearchTerm] = useState('');
    const [typeFilter, setTypeFilter] = useState<number | undefined>(undefined);
    const [statusFilter, setStatusFilter] = useState<number | undefined>(undefined);

    const [modalOpen, setModalOpen] = useState(false);
    const [editingActivity, setEditingActivity] = useState<IActivityDto | null>(null);
    const [viewingActivity, setViewingActivity] = useState<IActivityDto | null>(null);
    const [completingActivity, setCompletingActivity] = useState<IActivityDto | null>(null);

    const fetchAll = (p = page, ps = pageSize) => {
        getActivities({
            pageNumber: p,
            pageSize: ps,
            type: typeFilter,
            status: statusFilter,
        });
    };

    const fetchMine = (p = page, ps = pageSize) => {
        getMyActivities({ pageNumber: p, pageSize: ps, status: statusFilter });
    };

    useEffect(() => {
        if (activeTab === 'all') {
            getActivities({ pageNumber: page, pageSize, type: typeFilter, status: statusFilter });
        } else if (activeTab === 'mine') {
            getMyActivities({ pageNumber: page, pageSize, status: statusFilter });
        } else if (activeTab === 'upcoming') {
            getUpcomingActivities(14);
        } else if (activeTab === 'overdue') {
            getOverdueActivities();
        }
    }, [activeTab, page, pageSize, typeFilter, statusFilter, getActivities, getMyActivities, getUpcomingActivities, getOverdueActivities]);

    const handleTabChange = (key: string) => {
        setActiveTab(key as typeof activeTab);
        setPage(1);
    };

    const handlePageChange = (newPage: number, newPageSize: number) => {
        setPage(newPage);
        setPageSize(newPageSize);
    };

    const handleCreate = () => {
        setEditingActivity(null);
        setModalOpen(true);
    };

    const handleEdit = (activity: IActivityDto) => {
        setEditingActivity(activity);
        setModalOpen(true);
    };

    const handleDelete = async (id: string) => {
        await deleteActivity(id);
        message.success('Activity deleted');
        if (activeTab === 'all') fetchAll();
        else if (activeTab === 'mine') fetchMine();
    };

    const handleSubmit = async (values: ICreateActivityDto | IUpdateActivityDto) => {
        if (editingActivity) {
            await updateActivity(editingActivity.id, values as IUpdateActivityDto);
            message.success('Activity updated');
        } else {
            await createActivity(values as ICreateActivityDto);
            message.success('Activity logged');
        }
        setModalOpen(false);
        setEditingActivity(null);
        if (activeTab === 'all') fetchAll();
        else if (activeTab === 'mine') fetchMine();
    };

    const handleComplete = async (outcome: string) => {
        if (!completingActivity) return;
        await completeActivity(completingActivity.id, { outcome });
        message.success('Activity marked as completed');
        setCompletingActivity(null);
        if (activeTab === 'all') fetchAll();
        else if (activeTab === 'mine') fetchMine();
        else if (activeTab === 'upcoming') getUpcomingActivities(14);
        else if (activeTab === 'overdue') getOverdueActivities();
    };

    const handleCancel = async (id: string) => {
        await cancelActivity(id);
        message.success('Activity cancelled');
        if (activeTab === 'all') fetchAll();
        else if (activeTab === 'mine') fetchMine();
        else if (activeTab === 'upcoming') getUpcomingActivities(14);
        else getOverdueActivities();
    };

    const getTableData = (): IActivityDto[] => {
        if (activeTab === 'upcoming') return upcomingActivities ?? [];
        if (activeTab === 'overdue') return overdueActivities ?? [];
        const items = pagedResult?.items ?? [];
        if (!searchTerm) return items;
        return items.filter((a) =>
            a.subject.toLowerCase().includes(searchTerm.toLowerCase())
        );
    };

    const getTotal = () => {
        if (activeTab === 'upcoming') return upcomingActivities?.length ?? 0;
        if (activeTab === 'overdue') return overdueActivities?.length ?? 0;
        return pagedResult?.totalCount ?? 0;
    };

    const tabItems = [
        { key: 'all', label: 'All Activities' },
        { key: 'mine', label: 'My Activities' },
        {
            key: 'upcoming',
            label: (
                <span>
                    Upcoming
                    {upcomingActivities && upcomingActivities.length > 0 && (
                        <Badge count={upcomingActivities.length} size="small" style={{ marginLeft: 6 }} />
                    )}
                </span>
            ),
        },
        {
            key: 'overdue',
            label: (
                <span>
                    Overdue
                    {overdueActivities && overdueActivities.length > 0 && (
                        <Badge count={overdueActivities.length} color="red" size="small" style={{ marginLeft: 6 }} />
                    )}
                </span>
            ),
        },
    ];

    return (
        <>
            <div className={styles.pageHeader}>
                <Title level={2} className={styles.pageTitle}>Activities</Title>
                <Button
                    type="primary"
                    icon={<PlusOutlined />}
                    size="large"
                    onClick={handleCreate}
                >
                    Log Activity
                </Button>
            </div>

            <Tabs
                activeKey={activeTab}
                onChange={handleTabChange}
                items={tabItems}
                className={styles.tabs}
            />

            <div className={styles.filterBar}>
                <Input
                    prefix={<SearchOutlined />}
                    placeholder="Search activities..."
                    className={styles.searchInput}
                    value={searchTerm}
                    onChange={(e) => { setSearchTerm(e.target.value); setPage(1); }}
                    allowClear
                    size="large"
                />
                {activeTab !== 'upcoming' && activeTab !== 'overdue' && (
                    <>
                        <Select
                            className={styles.filterSelect}
                            placeholder="All Types"
                            allowClear
                            options={ACTIVITY_TYPE_OPTIONS}
                            value={typeFilter}
                            onChange={(value) => { setTypeFilter(value); setPage(1); }}
                            size="large"
                        />
                        <Select
                            className={styles.filterSelect}
                            placeholder="All Statuses"
                            allowClear
                            options={ACTIVITY_STATUS_OPTIONS}
                            value={statusFilter}
                            onChange={(value) => { setStatusFilter(value); setPage(1); }}
                            size="large"
                        />
                    </>
                )}
                <Button
                    icon={<ReloadOutlined />}
                    size="large"
                    className={styles.refreshButton}
                    onClick={() => {
                        if (activeTab === 'all') fetchAll();
                        else if (activeTab === 'mine') fetchMine();
                        else if (activeTab === 'upcoming') getUpcomingActivities(14);
                        else getOverdueActivities();
                    }}
                >
                    Refresh
                </Button>
            </div>

            <ActivitiesTable
                data={getTableData()}
                total={getTotal()}
                page={page}
                pageSize={pageSize}
                loading={isPending}
                onPageChange={handlePageChange}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onView={setViewingActivity}
                onComplete={setCompletingActivity}
                onCancel={handleCancel}
            />

            <ActivityFormModal
                open={modalOpen}
                editing={editingActivity}
                loading={isPending}
                onSubmit={handleSubmit}
                onClose={() => { setModalOpen(false); setEditingActivity(null); }}
            />

            <CompleteActivityModal
                open={!!completingActivity}
                loading={isPending}
                onSubmit={handleComplete}
                onClose={() => setCompletingActivity(null)}
            />

            <Drawer
                open={!!viewingActivity}
                title={viewingActivity?.subject ?? 'Activity Details'}
                onClose={() => setViewingActivity(null)}
                size="large"
                styles={{
                    wrapper: { background: '#1e2128' },
                    header: { background: '#1e2128', borderBottom: '1px solid rgba(255,255,255,0.08)', color: 'white' },
                    body: { background: '#1e2128', padding: '24px' },
                }}
                classNames={{ body: styles.drawerBody, header: styles.drawerHeader }}
            >
                {viewingActivity && (
                    <>
                        <Space wrap style={{ marginBottom: 16 }}>
                            <Tag color={ACTIVITY_TYPE_COLORS[viewingActivity.type]}>
                                {ACTIVITY_TYPE_LABELS[viewingActivity.type]}
                            </Tag>
                            <Tag color={ACTIVITY_STATUS_COLORS[viewingActivity.status]}>
                                {ACTIVITY_STATUS_LABELS[viewingActivity.status]}
                            </Tag>
                            <Tag color={PRIORITY_COLORS[viewingActivity.priority]}>
                                {PRIORITY_LABELS[viewingActivity.priority]} Priority
                            </Tag>
                            {viewingActivity.isOverdue && <Tag color="red">Overdue</Tag>}
                        </Space>

                        <Descriptions column={1} size="small" layout="vertical">
                            <Descriptions.Item label="Description">
                                {viewingActivity.description || '—'}
                            </Descriptions.Item>
                            <Descriptions.Item label="Assigned To">
                                {viewingActivity.assignedToName || '—'}
                            </Descriptions.Item>
                            <Descriptions.Item label="Related To">
                                {viewingActivity.relatedToTitle
                                    ? `${viewingActivity.relatedToTypeName}: ${viewingActivity.relatedToTitle}`
                                    : '—'}
                            </Descriptions.Item>
                            <Descriptions.Item label="Due Date">
                                {viewingActivity.dueDate
                                    ? new Date(viewingActivity.dueDate).toLocaleString()
                                    : '—'}
                            </Descriptions.Item>
                            <Descriptions.Item label="Duration">
                                {viewingActivity.duration ? `${viewingActivity.duration} min` : '—'}
                            </Descriptions.Item>
                            <Descriptions.Item label="Location">{viewingActivity.location || '—'}</Descriptions.Item>
                            {viewingActivity.status === 2 && (
                                <>
                                    <Descriptions.Item label="Completed Date">
                                        {viewingActivity.completedDate
                                            ? new Date(viewingActivity.completedDate).toLocaleString()
                                            : '—'}
                                    </Descriptions.Item>
                                    <Descriptions.Item label="Outcome">
                                        {viewingActivity.outcome || '—'}
                                    </Descriptions.Item>
                                </>
                            )}
                            <Descriptions.Item label="Created By">{viewingActivity.createdByName || '—'}</Descriptions.Item>
                            <Descriptions.Item label="Created At">
                                {new Date(viewingActivity.createdAt).toLocaleDateString()}
                            </Descriptions.Item>
                        </Descriptions>

                        {viewingActivity.status === 1 && (
                            <div className={styles.drawerActions}>
                                <Button
                                    type="primary"
                                    onClick={() => {
                                        setViewingActivity(null);
                                        handleEdit(viewingActivity);
                                    }}
                                >
                                    Edit
                                </Button>
                                <Button
                                    style={{ background: '#22c55e', borderColor: '#22c55e', color: 'white' }}
                                    onClick={() => {
                                        setViewingActivity(null);
                                        setCompletingActivity(viewingActivity);
                                    }}
                                >
                                    Complete
                                </Button>
                            </div>
                        )}
                    </>
                )}
            </Drawer>
        </>
    );
};

const ActivitiesPage: React.FC = () => (
    <ActivityProvider>
        <ActivitiesContent />
    </ActivityProvider>
);

export default ActivitiesPage;