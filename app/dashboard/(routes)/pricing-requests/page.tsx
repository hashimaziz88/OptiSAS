'use client';

import React, { useEffect, useState } from 'react';
import {
    Badge, Button, Descriptions, Drawer, Input, Popconfirm, Select, Space, Tag, Tabs, Typography, message,
} from 'antd';
import { PlusOutlined, ReloadOutlined, SearchOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { axiosInstance } from '@/utils/axiosInstance';
import {
    usePricingRequestActions,
    usePricingRequestState,
} from '@/providers/pricingRequestProvider';
import {
    ICreatePricingRequestDto,
    IPricingRequestDto,
    IUpdatePricingRequestDto,
} from '@/providers/pricingRequestProvider/context';
import {
    PRICING_REQUEST_STATUS_COLORS,
    PRICING_REQUEST_STATUS_LABELS,
    PRICING_REQUEST_STATUS_OPTIONS,
    PRICING_REQUESTS_PAGE_SIZE,
    PRIORITY_COLORS,
    PRIORITY_LABELS,
    PRIORITY_OPTIONS,
} from '@/constants/pricingRequests';
import PricingRequestsTable from '@/components/dashboard/pricing-requests/PricingRequestsTable';
import PricingRequestFormModal from '@/components/dashboard/pricing-requests/PricingRequestFormModal';
import AssignPricingRequestModal from '@/components/dashboard/pricing-requests/AssignPricingRequestModal';
import { useStyles } from '@/components/dashboard/pricing-requests/style/style';
import ClientSelectFilter from '@/components/dashboard/shared/ClientSelectFilter';
import { useAuthState } from '@/providers/authProvider';
import { isAdminOrManager } from '@/utils/roles';

const { Title } = Typography;

type TabKey = 'all' | 'mine' | 'pending';

const PricingRequestsContent: React.FC = () => {
    const { styles } = useStyles();
    const { user } = useAuthState();
    const canAssign = isAdminOrManager(user?.roles);
    const canDelete = isAdminOrManager(user?.roles);
    const {
        getPricingRequests,
        getMyPricingRequests,
        getPendingPricingRequests,
        createPricingRequest,
        updatePricingRequest,
        deletePricingRequest,
        assignPricingRequest,
        completePricingRequest,
    } = usePricingRequestActions();
    const { isPending, pagedResult, myRequests, pendingRequests } = usePricingRequestState();

    const [activeTab, setActiveTab] = useState<TabKey>('all');
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(PRICING_REQUESTS_PAGE_SIZE);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState<number | undefined>(undefined);
    const [priorityFilter, setPriorityFilter] = useState<number | undefined>(undefined);
    const [clientFilter, setClientFilter] = useState<string | undefined>(undefined);
    const [clientOpportunityIds, setClientOpportunityIds] = useState<Set<string> | null>(null);

    const [modalOpen, setModalOpen] = useState(false);
    const [editingRequest, setEditingRequest] = useState<IPricingRequestDto | null>(null);
    const [viewingRequest, setViewingRequest] = useState<IPricingRequestDto | null>(null);
    const [assigningRequest, setAssigningRequest] = useState<IPricingRequestDto | null>(null);

    useEffect(() => {
        if (!clientFilter) {
            setClientOpportunityIds(null);
            return;
        }
        axiosInstance()
            .get(`${process.env.NEXT_PUBLIC_API_LINK}/api/Opportunities`, {
                params: { clientId: clientFilter, pageSize: 500 },
            })
            .then((res) => {
                const ids = new Set<string>((res.data?.items ?? []).map((o: { id: string }) => o.id));
                setClientOpportunityIds(ids);
            })
            .catch(() => setClientOpportunityIds(null));
    }, [clientFilter]);

    const fetchData = (newPage = page, newPageSize = pageSize) => {
        if (activeTab === 'all') {
            getPricingRequests({
                pageNumber: newPage,
                pageSize: newPageSize,
                status: statusFilter,
                priority: priorityFilter,
            });
        } else if (activeTab === 'mine') {
            getMyPricingRequests();
        } else {
            getPendingPricingRequests();
        }
    };

    useEffect(() => {
        if (activeTab === 'all') {
            getPricingRequests({ pageNumber: page, pageSize, status: statusFilter, priority: priorityFilter });
        } else if (activeTab === 'mine') {
            getMyPricingRequests();
        } else {
            getPendingPricingRequests();
        }
    }, [page, pageSize, activeTab, statusFilter, priorityFilter, getPricingRequests, getMyPricingRequests, getPendingPricingRequests]);

    const getTableData = (): IPricingRequestDto[] => {
        let items: IPricingRequestDto[] = [];
        if (activeTab === 'mine') items = myRequests?.items ?? [];
        else if (activeTab === 'pending') items = pendingRequests?.items ?? [];
        else items = pagedResult?.items ?? [];

        if (clientOpportunityIds !== null) {
            items = items.filter((r) => clientOpportunityIds.has(r.opportunityId));
        }

        if (searchTerm) {
            const lower = searchTerm.toLowerCase();
            return items.filter(
                (r) =>
                    r.title?.toLowerCase().includes(lower) ||
                    r.requestNumber?.toLowerCase().includes(lower) ||
                    r.requestedByName?.toLowerCase().includes(lower)
            );
        }
        return items;
    };

    const getTotal = () => {
        if (activeTab === 'mine') return myRequests?.totalCount ?? 0;
        if (activeTab === 'pending') return pendingRequests?.totalCount ?? 0;
        return pagedResult?.totalCount ?? 0;
    };

    const handlePageChange = (newPage: number, newPageSize: number) => {
        setPage(newPage);
        setPageSize(newPageSize);
    };

    const handleCreate = () => {
        setEditingRequest(null);
        setModalOpen(true);
    };

    const handleEdit = (record: IPricingRequestDto) => {
        setEditingRequest(record);
        setModalOpen(true);
    };

    const handleDelete = async (id: string) => {
        await deletePricingRequest(id);
        message.success('Pricing request deleted');
        fetchData();
    };

    const handleComplete = async (record: IPricingRequestDto) => {
        await completePricingRequest(record.id);
        message.success('Pricing request marked as completed');
        fetchData();
    };

    const handleAssign = async (id: string, userId: string) => {
        await assignPricingRequest(id, userId);
        message.success('Pricing request assigned');
        setAssigningRequest(null);
        fetchData();
    };

    const handleSubmit = async (values: ICreatePricingRequestDto | IUpdatePricingRequestDto) => {
        if (editingRequest) {
            await updatePricingRequest(editingRequest.id, values as IUpdatePricingRequestDto);
            message.success('Pricing request updated');
        } else {
            await createPricingRequest(values as ICreatePricingRequestDto);
            message.success('Pricing request created');
        }
        setModalOpen(false);
        setEditingRequest(null);
        fetchData();
    };

    const tabItems = [
        {
            key: 'all',
            label: (
                <span>
                    All Requests
                    <Badge count={pagedResult?.totalCount ?? 0} showZero={false} style={{ marginLeft: 8 }} />
                </span>
            ),
        },
        {
            key: 'mine',
            label: (
                <span>
                    My Requests
                    <Badge count={myRequests?.totalCount ?? 0} showZero={false} style={{ marginLeft: 8 }} />
                </span>
            ),
        },
        ...(canAssign ? [{
            key: 'pending',
            label: (
                <span>
                    Unassigned
                    <Badge count={pendingRequests?.totalCount ?? 0} showZero={false} color="orange" style={{ marginLeft: 8 }} />
                </span>
            ),
        }] : []),
    ];

    return (
        <>
            <div className={styles.pageHeader}>
                <Title level={2} className={styles.pageTitle}>Pricing Requests</Title>
                <Button type="primary" icon={<PlusOutlined />} size="large" onClick={handleCreate}>
                    New Request
                </Button>
            </div>

            <Tabs
                className={styles.tabs}
                activeKey={activeTab}
                onChange={(key) => { setActiveTab(key as TabKey); setPage(1); }}
                items={tabItems}
            />

            <div className={styles.filterBar}>
                <Input
                    prefix={<SearchOutlined />}
                    placeholder="Search requests..."
                    className={styles.searchInput}
                    value={searchTerm}
                    onChange={(e) => { setSearchTerm(e.target.value); }}
                    allowClear
                    size="large"
                />

                <ClientSelectFilter
                    className={styles.filterSelect}
                    value={clientFilter}
                    onChange={(value) => { setClientFilter(value); setPage(1); }}
                />

                {activeTab === 'all' && (
                    <>
                        <Select
                            className={styles.filterSelect}
                            placeholder="All Statuses"
                            allowClear
                            options={PRICING_REQUEST_STATUS_OPTIONS}
                            value={statusFilter}
                            onChange={(value) => { setStatusFilter(value); setPage(1); }}
                            size="large"
                        />
                        <Select
                            className={styles.filterSelect}
                            placeholder="All Priorities"
                            allowClear
                            options={PRIORITY_OPTIONS}
                            value={priorityFilter}
                            onChange={(value) => { setPriorityFilter(value); setPage(1); }}
                            size="large"
                        />
                    </>
                )}

                <Button icon={<ReloadOutlined />} size="large" className={styles.refreshButton} onClick={() => fetchData()}>
                    Refresh
                </Button>
            </div>

            <PricingRequestsTable
                data={getTableData()}
                total={getTotal()}
                page={page}
                pageSize={pageSize}
                loading={isPending}
                onPageChange={handlePageChange}
                onView={setViewingRequest}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onComplete={handleComplete}
                onAssign={setAssigningRequest}
                canDelete={canDelete}
                canAssign={canAssign}
            />

            <PricingRequestFormModal
                open={modalOpen}
                editing={editingRequest}
                loading={isPending}
                onSubmit={handleSubmit}
                onClose={() => {
                    setModalOpen(false);
                    setEditingRequest(null);
                }}
            />

            <AssignPricingRequestModal
                open={!!assigningRequest}
                request={assigningRequest}
                loading={isPending}
                onAssign={handleAssign}
                onClose={() => setAssigningRequest(null)}
            />

            <Drawer
                open={!!viewingRequest}
                title={viewingRequest?.title ?? 'Pricing Request Details'}
                onClose={() => setViewingRequest(null)}
                size="large"
                styles={{
                    wrapper: { background: '#1e2128' },
                    header: { background: '#1e2128', borderBottom: '1px solid rgba(255,255,255,0.08)', color: 'white' },
                    body: { background: '#1e2128', padding: '24px' },
                }}
                classNames={{ body: styles.drawerBody, header: styles.drawerHeader }}
                extra={
                    viewingRequest && (
                        <Space>
                            {viewingRequest.status !== 3 && (
                                <>
                                    <Button
                                        type="primary"
                                        icon={<EditOutlined />}
                                        onClick={() => { setViewingRequest(null); handleEdit(viewingRequest); }}
                                    >
                                        Edit
                                    </Button>
                                    {canAssign && (
                                        <Button type="primary" onClick={() => { setViewingRequest(null); setAssigningRequest(viewingRequest); }}>
                                            Assign
                                        </Button>
                                    )}
                                    <Popconfirm
                                        title="Mark as completed?"
                                        onConfirm={async () => { await handleComplete(viewingRequest); setViewingRequest(null); }}
                                        okText="Complete"
                                        cancelText="No"
                                    >
                                        <Button type="primary">Complete</Button>
                                    </Popconfirm>
                                </>
                            )}
                            {canDelete && (
                                <Popconfirm
                                    title="Delete this pricing request?"
                                    onConfirm={async () => { await handleDelete(viewingRequest.id); setViewingRequest(null); }}
                                    okText="Delete"
                                    okButtonProps={{ danger: true }}
                                    cancelText="Cancel"
                                >
                                    <Button icon={<DeleteOutlined />} danger>Delete</Button>
                                </Popconfirm>
                            )}
                        </Space>
                    )
                }
            >
                {viewingRequest && (
                    <>
                        <Space style={{ marginBottom: 20 }}>
                            <Tag color={PRICING_REQUEST_STATUS_COLORS[viewingRequest.status] ?? 'default'}>
                                {PRICING_REQUEST_STATUS_LABELS[viewingRequest.status] ?? '—'}
                            </Tag>
                            <Tag color={PRIORITY_COLORS[viewingRequest.priority] ?? 'default'}>
                                {PRIORITY_LABELS[viewingRequest.priority] ?? '—'}
                            </Tag>
                        </Space>

                        <Descriptions column={2} size="small" bordered style={{ marginBottom: 24 }}>
                            <Descriptions.Item label="Request #">{viewingRequest.requestNumber || '—'}</Descriptions.Item>
                            <Descriptions.Item label="Required By">
                                {viewingRequest.requiredByDate ? new Date(viewingRequest.requiredByDate).toLocaleDateString() : '—'}
                            </Descriptions.Item>
                            <Descriptions.Item label="Requested By">{viewingRequest.requestedByName || '—'}</Descriptions.Item>
                            <Descriptions.Item label="Assigned To">{viewingRequest.assignedToName || 'Unassigned'}</Descriptions.Item>
                            <Descriptions.Item label="Completed At">
                                {viewingRequest.completedDate ? new Date(viewingRequest.completedDate).toLocaleString() : '—'}
                            </Descriptions.Item>
                            <Descriptions.Item label="Created At">
                                {new Date(viewingRequest.createdAt).toLocaleString()}
                            </Descriptions.Item>
                            <Descriptions.Item label="Opportunity" span={2}>{viewingRequest.opportunityTitle || '—'}</Descriptions.Item>
                            <Descriptions.Item label="Description" span={2}>{viewingRequest.description || '—'}</Descriptions.Item>
                        </Descriptions>
                    </>
                )}
            </Drawer>
        </>
    );
};

const PricingRequestsPage: React.FC = () => (
    <PricingRequestsContent />
);

export default PricingRequestsPage;