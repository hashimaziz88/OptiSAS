'use client';

import React, { useEffect, useState } from 'react';
import {
    Button, Input, Select, Typography, message, Drawer,
    Descriptions, Tag, Timeline, Modal, Form, Row, Col, Space,
} from 'antd';
import { PlusOutlined, SearchOutlined, ReloadOutlined, SwapOutlined, UserSwitchOutlined, EditOutlined } from '@ant-design/icons';
import { axiosInstance } from '@/utils/axiosInstance';
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
import { useStyles } from '@/components/dashboard/opportunities/style/style';
import ClientSelectFilter from '@/components/dashboard/shared/ClientSelectFilter';
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
    const [stageForm] = Form.useForm();

    const [assignModalOpen, setAssignModalOpen] = useState(false);
    const [assignForm] = Form.useForm();
    const [assignUsers, setAssignUsers] = useState<{ label: string; value: string }[]>([]);
    const [assignUsersLoading, setAssignUsersLoading] = useState(false);
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
        stageForm.resetFields();
        stageForm.setFieldsValue({ stage: viewingOpp?.stage });
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

    const handleOpenAssignModal = async () => {
        assignForm.resetFields();
        assignForm.setFieldsValue({ userId: viewingOpp?.ownerId });
        setAssignModalOpen(true);
        setAssignUsersLoading(true);
        try {
            const res = await axiosInstance().get(`${process.env.NEXT_PUBLIC_API_LINK}/api/users`, {
                params: { pageSize: 200 },
            });
            setAssignUsers(
                (res.data?.items ?? []).map((u: { id: string; fullName: string; roles: string[] }) => ({
                    value: u.id,
                    label: `${u.fullName}${u.roles?.length ? ` (${u.roles[0]})` : ''}`,
                }))
            );
        } catch {
            message.error('Failed to load users');
        } finally {
            setAssignUsersLoading(false);
        }
    };

    const handleAssignSubmit = async (values: { userId: string }) => {
        if (!viewingOpp) return;
        await assignOpportunity(viewingOpp.id, values.userId);
        message.success('Opportunity reassigned');
        setAssignModalOpen(false);
        fetchOpportunities();
        const assignedUser = assignUsers.find((u) => u.value === values.userId);
        if (assignedUser) {
            setViewingOpp({ ...viewingOpp, ownerId: values.userId, ownerName: assignedUser.label.split(' (')[0] });
        }
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
                                    <Tag color={OPPORTUNITY_STAGE_COLORS[stageNum]} style={{ margin: 0, fontSize: 11 }}>
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
                styles={{
                    wrapper: { background: '#1e2128' },
                    header: { background: '#1e2128', borderBottom: '1px solid rgba(255,255,255,0.08)' },
                    body: { background: '#1e2128', padding: '24px' },
                }}
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
                        </Space>
                    )
                }
            >
                {viewingOpp && (
                    <>
                        <Space style={{ marginBottom: 20 }}>
                            <Tag color={OPPORTUNITY_STAGE_COLORS[viewingOpp.stage]} style={{ fontSize: 13, padding: '2px 12px' }}>
                                {viewingOpp.stageName}
                            </Tag>
                        </Space>

                        <Descriptions column={2} size="small" bordered style={{ marginBottom: 24 }}>
                            <Descriptions.Item label="Client">{viewingOpp.clientName || '—'}</Descriptions.Item>
                            <Descriptions.Item label="Owner">{viewingOpp.ownerName || '—'}</Descriptions.Item>
                            <Descriptions.Item label="Contact">{viewingOpp.contactName || '—'}</Descriptions.Item>
                            <Descriptions.Item label="Source">{getSourceLabel(viewingOpp.source) || '—'}</Descriptions.Item>
                            <Descriptions.Item label="Value">
                                <Text strong style={{ color: '#e2e8f0' }}>
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
                                                    <Tag color={OPPORTUNITY_STAGE_COLORS[h.fromStage] ?? 'default'} style={{ fontSize: 11 }}>
                                                        {h.fromStageName}
                                                    </Tag>
                                                    {' → '}
                                                    <Tag color={OPPORTUNITY_STAGE_COLORS[h.toStage] ?? 'default'} style={{ fontSize: 11 }}>
                                                        {h.toStageName}
                                                    </Tag>
                                                </div>
                                                <div className={styles.stageHistoryTime}>
                                                    {h.changedByName} · {new Date(h.changedAt).toLocaleDateString('en-ZA')}
                                                </div>
                                                {h.notes && <div style={{ color: '#a0aec0', fontSize: 12, marginTop: 2 }}>{h.notes}</div>}
                                            </div>
                                        ),
                                    }))}
                                />
                            </>
                        )}
                    </>
                )}
            </Drawer>

            {/* Stage Change Modal */}
            <Modal
                open={stageModalOpen}
                title="Change Stage"
                onCancel={() => setStageModalOpen(false)}
                footer={null}
                destroyOnHidden
                classNames={{ body: styles.modalBody, container: styles.modalContainer, header: styles.modalHeader }}
            >
                <div className={styles.formBody}>
                    <Form form={stageForm} layout="vertical" requiredMark={false} onFinish={handleStageSubmit}>
                        <Form.Item label="New Stage" name="stage" rules={[{ required: true }]}>
                            <Select size="large" options={OPPORTUNITY_STAGE_OPTIONS} />
                        </Form.Item>
                        <Form.Item label="Reason / Notes" name="reason">
                            <Input.TextArea placeholder="Optional notes about this stage change..." rows={3} />
                        </Form.Item>
                        <Form.Item className={styles.formFooter}>
                            <div className={styles.formFooterActions}>
                                <Button onClick={() => setStageModalOpen(false)} size="large">Cancel</Button>
                                <Button type="primary" htmlType="submit" loading={isPending} size="large">Update Stage</Button>
                            </div>
                        </Form.Item>
                    </Form>
                </div>
            </Modal>

            {/* Reassign Modal */}
            <Modal
                open={assignModalOpen}
                title="Reassign Opportunity"
                onCancel={() => setAssignModalOpen(false)}
                footer={null}
                destroyOnHidden
                classNames={{ body: styles.modalBody, container: styles.modalContainer, header: styles.modalHeader }}
            >
                <div className={styles.formBody}>
                    <Form form={assignForm} layout="vertical" requiredMark={false} onFinish={handleAssignSubmit}>
                        <Form.Item label="Assign To" name="userId" rules={[{ required: true, message: 'Select a user' }]}>
                            <Select
                                size="large"
                                showSearch
                                options={assignUsers}
                                loading={assignUsersLoading}
                                placeholder="Select a user"
                                optionFilterProp="label"
                            />
                        </Form.Item>
                        <Form.Item className={styles.formFooter}>
                            <div className={styles.formFooterActions}>
                                <Button onClick={() => setAssignModalOpen(false)} size="large">Cancel</Button>
                                <Button type="primary" htmlType="submit" loading={isPending} size="large">Reassign</Button>
                            </div>
                        </Form.Item>
                    </Form>
                </div>
            </Modal>
        </>
    );
};

const OpportunitiesPage: React.FC = () => <OpportunitiesContent />;

export default OpportunitiesPage;