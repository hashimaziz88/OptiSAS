'use client';

import React, { useEffect, useState } from 'react';
import {
    Button, Input, Select, Typography, message, Drawer,
    Descriptions, Tag, Timeline, Row, Col, Space, Popconfirm,
} from 'antd';
import { PlusOutlined, SearchOutlined, ReloadOutlined, SwapOutlined, UserSwitchOutlined, EditOutlined, MinusCircleOutlined } from '@ant-design/icons';
import { useOpportunityActions, useOpportunityState } from '@/providers/opportunityProvider';
import { IOpportunityDto, ICreateOpportunityDto, IUpdateOpportunityDto } from '@/providers/opportunityProvider/context';
import { useClientActions, useClientState } from '@/providers/clientProvider';
import {
    OPPORTUNITIES_PAGE_SIZE,
    OPPORTUNITY_STAGE_OPTIONS,
    OPPORTUNITY_STAGE_COLORS,
    OPPORTUNITY_STAGE_LABELS,
    STAGE_ORDER,
    STAGE_API_KEYS,
} from '@/constants/opportunities';
import { buildOpportunitiesParams, getSourceLabel, formatCurrency } from '@/utils/dashboard/opportunities';
import OpportunitiesTable from '@/components/dashboard/opportunities/OpportunitiesTable';
import OpportunityFormModal from '@/components/dashboard/opportunities/OpportunityFormModal';
import StageUpdateModal from '@/components/dashboard/opportunities/StageUpdateModal';
import AssignOpportunityModal from '@/components/dashboard/opportunities/AssignOpportunityModal';
import { useStyles } from '@/components/dashboard/opportunities/style/style';
import ClientSelectFilter from '@/components/dashboard/shared/ClientSelectFilter';
import { DARK_DRAWER_STYLES } from '@/components/dashboard/shared/drawerStyles';
import { useAuthState } from '@/providers/authProvider';
import { isAdminOrManager } from '@/utils/roles';

const { Title, Text } = Typography;

const OpportunitiesContent: React.FC = () => {
    const { styles } = useStyles();
    const { user } = useAuthState();
    const canDelete = isAdminOrManager(user?.roles);
    const {
        getOpportunities, createOpportunity, updateOpportunity, deleteOpportunity,
        getPipelineMetrics, getStageHistory, updateStage, assignOpportunity,
    } = useOpportunityActions();
    const { isPending, pagedResult, pipelineMetrics, stageHistory } = useOpportunityState();

    const { getClients } = useClientActions();
    const { pagedResult: clientPagedResult } = useClientState();

    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(OPPORTUNITIES_PAGE_SIZE);
    const [searchTerm, setSearchTerm] = useState('');
    const [stageFilter, setStageFilter] = useState<number | undefined>(undefined);
    const [clientFilter, setClientFilter] = useState<string | undefined>(undefined);

    const [modalOpen, setModalOpen] = useState(false);
    const [editingOpp, setEditingOpp] = useState<IOpportunityDto | null>(null);
    const [viewingOpp, setViewingOpp] = useState<IOpportunityDto | null>(null);
    const [stageModalOpen, setStageModalOpen] = useState(false);

    const [assignModalOpen, setAssignModalOpen] = useState(false);
    const canAssign = isAdminOrManager(user?.roles);

    const clients = clientPagedResult?.items ?? [];

    const fetchOpportunities = (p = page, ps = pageSize) => {
        getOpportunities(buildOpportunitiesParams(p, ps, { searchTerm, stage: stageFilter, clientId: clientFilter }));
    };

    useEffect(() => {
        getClients({ pageNumber: 1, pageSize: 200 });
        getPipelineMetrics();
    }, [getClients, getPipelineMetrics]);

    useEffect(() => {
        getOpportunities(buildOpportunitiesParams(page, pageSize, { searchTerm, stage: stageFilter, clientId: clientFilter }));
    }, [page, pageSize, searchTerm, stageFilter, clientFilter, getOpportunities]);

    const handlePageChange = (newPage: number, newPageSize: number) => {
        setPage(newPage);
        setPageSize(newPageSize);
    };

    const handleCreate = () => { setEditingOpp(null); setModalOpen(true); };
    const handleEdit = (opp: IOpportunityDto) => { setEditingOpp(opp); setModalOpen(true); };

    const handleDelete = async (id: string) => {
        await deleteOpportunity(id);
        message.success('Opportunity marked as inactive');
        fetchOpportunities();
        getPipelineMetrics();
    };

    const handleSubmit = async (values: ICreateOpportunityDto | IUpdateOpportunityDto) => {
        if (editingOpp) {
            await updateOpportunity(editingOpp.id, values as IUpdateOpportunityDto);
            message.success('Opportunity updated');
        } else {
            await createOpportunity(values as ICreateOpportunityDto);
            message.success('Opportunity created');
        }
        setModalOpen(false);
        setEditingOpp(null);
        fetchOpportunities();
        getPipelineMetrics();
    };

    const handleView = async (opp: IOpportunityDto) => {
        setViewingOpp(opp);
        await getStageHistory(opp.id);
    };

    const handleOpenStageModal = () => {
        setStageModalOpen(true);
    };

    const handleStageSubmit = async (values: { stage: number; reason?: string }) => {
        if (!viewingOpp) return;
        await updateStage(viewingOpp.id, values);
        message.success('Stage updated');
        setStageModalOpen(false);
        fetchOpportunities();
        getPipelineMetrics();
        const updated = pagedResult?.items?.find((o) => o.id === viewingOpp.id);
        if (updated) setViewingOpp({ ...viewingOpp, stage: values.stage, stageName: OPPORTUNITY_STAGE_LABELS[values.stage] });
        await getStageHistory(viewingOpp.id);
    };

    const handleOpenAssignModal = () => {
        setAssignModalOpen(true);
    };

    const handleAssignSubmit = async (values: { userId: string }) => {
        if (!viewingOpp) return;
        await assignOpportunity(viewingOpp.id, values.userId);
        message.success('Opportunity reassigned');
        setAssignModalOpen(false);
        setViewingOpp(null);
        fetchOpportunities();
    };


    const stageMetrics = pipelineMetrics?.stageMetrics ?? {};

    return (
        <>
            <div className={styles.pageHeader}>
                <Title level={2} className={styles.pageTitle}>Opportunities</Title>
                <Button type="primary" icon={<PlusOutlined />} size="large" onClick={handleCreate}>
                    New Opportunity
                </Button>
            </div>

            {/* Pipeline summary */}
            <Row gutter={[12, 12]} className={styles.pipelineRow}>
                {STAGE_ORDER.map((stageNum) => {
                    const sm = stageMetrics[STAGE_API_KEYS[stageNum]];
                    return (
                        <Col key={stageNum} xs={12} sm={8} md={4}>
                            <div className={styles.pipelineCard}>
                                <div className={styles.pipelineCardLabel}>
                                    <Tag color={OPPORTUNITY_STAGE_COLORS[stageNum]} className={styles.stageTagSmall}>
                                        {OPPORTUNITY_STAGE_LABELS[stageNum]}
                                    </Tag>
                                </div>
                                <div className={styles.pipelineCardCount}>{sm?.count ?? 0}</div>
                                <div className={styles.pipelineCardValue}>
                                    {sm ? formatCurrency(sm.totalValue) : 'R 0'}
                                </div>
                            </div>
                        </Col>
                    );
                })}
            </Row>

            {/* Filters */}
            <div className={styles.filterBar}>
                <Input
                    prefix={<SearchOutlined />}
                    placeholder="Search opportunities..."
                    className={styles.searchInput}
                    value={searchTerm}
                    onChange={(e) => { setSearchTerm(e.target.value); setPage(1); }}
                    allowClear
                    size="large"
                />
                <Select
                    className={styles.filterSelect}
                    placeholder="All Stages"
                    allowClear
                    options={OPPORTUNITY_STAGE_OPTIONS}
                    value={stageFilter}
                    onChange={(v) => { setStageFilter(v); setPage(1); }}
                    size="large"
                />
                <ClientSelectFilter
                    className={styles.filterSelect}
                    value={clientFilter}
                    onChange={(v) => { setClientFilter(v); setPage(1); }}
                />
                <Button icon={<ReloadOutlined />} size="large" className={styles.refreshButton} onClick={() => fetchOpportunities()}>
                    Refresh
                </Button>
            </div>

            <OpportunitiesTable
                data={pagedResult?.items ?? []}
                total={pagedResult?.totalCount ?? 0}
                page={page}
                pageSize={pageSize}
                loading={isPending}
                onPageChange={handlePageChange}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onView={handleView}
                canDelete={canDelete}
            />

            <OpportunityFormModal
                open={modalOpen}
                editing={editingOpp}
                loading={isPending}
                clients={clients}
                onSubmit={handleSubmit}
                onClose={() => { setModalOpen(false); setEditingOpp(null); }}
            />

            {/* Detail Drawer */}
            <Drawer
                open={!!viewingOpp}
                title={viewingOpp?.title ?? 'Opportunity Details'}
                onClose={() => setViewingOpp(null)}
                size="large"
                styles={DARK_DRAWER_STYLES}
                classNames={{ body: styles.drawerBody, header: styles.drawerHeader }}
                extra={
                    viewingOpp && (
                        <Space>
                            <Button
                                type="primary"
                                icon={<EditOutlined />}
                                onClick={() => { setViewingOpp(null); handleEdit(viewingOpp); }}
                            >
                                Edit
                            </Button>
                            <Button type="primary" icon={<SwapOutlined />} onClick={handleOpenStageModal}>
                                Change Stage
                            </Button>
                            {canAssign && (
                                <Button type="primary" icon={<UserSwitchOutlined />} onClick={handleOpenAssignModal}>
                                    Reassign
                                </Button>
                            )}
                            {canDelete && viewingOpp.isActive && (
                                <Popconfirm
                                    title="Mark this opportunity as inactive?"
                                    onConfirm={async () => { await handleDelete(viewingOpp.id); setViewingOpp(null); }}
                                    okText="Mark Inactive"
                                    okButtonProps={{ danger: true }}
                                    cancelText="Cancel"
                                >
                                    <Button icon={<MinusCircleOutlined />} danger>Mark Inactive</Button>
                                </Popconfirm>
                            )}
                        </Space>
                    )
                }
            >
                {viewingOpp && (
                    <>
                        <Space className={styles.drawerTagRow}>
                            <Tag color={OPPORTUNITY_STAGE_COLORS[viewingOpp.stage]} className={styles.stageTagKanban}>
                                {viewingOpp.stageName}
                            </Tag>
                        </Space>

                        <Descriptions column={2} size="small" bordered className={styles.descriptionsSection}>
                            <Descriptions.Item label="Client">{viewingOpp.clientName || '—'}</Descriptions.Item>
                            <Descriptions.Item label="Owner">{viewingOpp.ownerName || '—'}</Descriptions.Item>
                            <Descriptions.Item label="Contact">{viewingOpp.contactName || '—'}</Descriptions.Item>
                            <Descriptions.Item label="Source">{getSourceLabel(viewingOpp.source) || '—'}</Descriptions.Item>
                            <Descriptions.Item label="Value">
                                <Text strong className={styles.valueText}>
                                    {formatCurrency(viewingOpp.estimatedValue, viewingOpp.currency)}
                                </Text>
                            </Descriptions.Item>
                            <Descriptions.Item label="Probability">{viewingOpp.probability ?? 0}%</Descriptions.Item>
                            <Descriptions.Item label="Expected Close" span={2}>
                                {viewingOpp.expectedCloseDate ? new Date(viewingOpp.expectedCloseDate).toLocaleDateString('en-ZA') : '—'}
                            </Descriptions.Item>
                            {viewingOpp.description && (
                                <Descriptions.Item label="Description" span={2}>{viewingOpp.description}</Descriptions.Item>
                            )}
                        </Descriptions>

                        {/* Stage History */}
                        {stageHistory && stageHistory.length > 0 && (
                            <>
                                <div className={styles.sectionTitle}>Stage History</div>
                                <Timeline
                                    items={stageHistory.map((h) => ({
                                        color: 'blue',
                                        content: (
                                            <div className={styles.stageHistoryItem}>
                                                <div>
                                                    <Tag color={OPPORTUNITY_STAGE_COLORS[h.fromStage] ?? 'default'} className={styles.kanbanTagSmall}>
                                                        {h.fromStageName}
                                                    </Tag>
                                                    {' → '}
                                                    <Tag color={OPPORTUNITY_STAGE_COLORS[h.toStage] ?? 'default'} className={styles.kanbanTagSmall}>
                                                        {h.toStageName}
                                                    </Tag>
                                                </div>
                                                <div className={styles.stageHistoryTime}>
                                                    {h.changedByName} · {new Date(h.changedAt).toLocaleDateString('en-ZA')}
                                                </div>
                                                {h.notes && <div className={styles.historyNoteText}>{h.notes}</div>}
                                            </div>
                                        ),
                                    }))}
                                />
                            </>
                        )}
                    </>
                )}
            </Drawer>

            <StageUpdateModal
                open={stageModalOpen}
                loading={isPending}
                initialStage={viewingOpp?.stage}
                onSubmit={handleStageSubmit}
                onClose={() => setStageModalOpen(false)}
            />

            <AssignOpportunityModal
                open={assignModalOpen}
                loading={isPending}
                currentOwnerId={viewingOpp?.ownerId}
                onSubmit={handleAssignSubmit}
                onClose={() => setAssignModalOpen(false)}
            />
        </>
    );
};

const OpportunitiesPage: React.FC = () => <OpportunitiesContent />;

export default OpportunitiesPage;