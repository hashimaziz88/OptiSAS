'use client';

import React, { useEffect, useState } from 'react';
import {
    Button, Input, Select, Typography, message, Drawer,
    Descriptions, Tag, Timeline, Modal, Form, Row, Col,
} from 'antd';
import { PlusOutlined, SearchOutlined, ReloadOutlined, SwapOutlined } from '@ant-design/icons';
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
import { useAuthState } from '@/providers/authProvider';
import { isAdminOrManager } from '@/utils/roles';

const { Title, Text } = Typography;

const OpportunitiesContent: React.FC = () => {
    const { styles } = useStyles();
    const { user } = useAuthState();
    const canDelete = isAdminOrManager(user?.roles);
    const {
        getOpportunities, createOpportunity, updateOpportunity, deleteOpportunity,
        getPipelineMetrics, getStageHistory, updateStage,
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
        message.success('Opportunity deleted');
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

    const clientOptions = clients.map((c) => ({ label: c.name, value: c.id }));

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
                <Select
                    className={styles.filterSelect}
                    placeholder="All Clients"
                    allowClear
                    showSearch
                    options={clientOptions}
                    value={clientFilter}
                    onChange={(v) => { setClientFilter(v); setPage(1); }}
                    size="large"
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
                styles={{
                    wrapper: { background: '#1e2128', width: 480 },
                    header: { background: '#1e2128', borderBottom: '1px solid rgba(255,255,255,0.08)' },
                    body: { background: '#1e2128', padding: '24px' },
                }}
                classNames={{ body: styles.drawerBody, header: styles.drawerHeader }}
            >
                {viewingOpp && (
                    <>
                        <Tag color={OPPORTUNITY_STAGE_COLORS[viewingOpp.stage]} style={{ marginBottom: 16, fontSize: 13, padding: '2px 12px' }}>
                            {viewingOpp.stageName}
                        </Tag>

                        <Descriptions column={1} size="small">
                            <Descriptions.Item label="Client">{viewingOpp.clientName || '—'}</Descriptions.Item>
                            <Descriptions.Item label="Contact">{viewingOpp.contactName || '—'}</Descriptions.Item>
                            <Descriptions.Item label="Owner">{viewingOpp.ownerName || '—'}</Descriptions.Item>
                            <Descriptions.Item label="Value">
                                <Text strong style={{ color: '#e2e8f0' }}>
                                    {formatCurrency(viewingOpp.estimatedValue, viewingOpp.currency)}
                                </Text>
                            </Descriptions.Item>
                            <Descriptions.Item label="Probability">{viewingOpp.probability ?? 0}%</Descriptions.Item>
                            <Descriptions.Item label="Source">{getSourceLabel(viewingOpp.source) || '—'}</Descriptions.Item>
                            <Descriptions.Item label="Expected Close">
                                {viewingOpp.expectedCloseDate ? new Date(viewingOpp.expectedCloseDate).toLocaleDateString('en-ZA') : '—'}
                            </Descriptions.Item>
                            {viewingOpp.description && (
                                <Descriptions.Item label="Description">{viewingOpp.description}</Descriptions.Item>
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

                        <div className={styles.drawerActions}>
                            <Button type="primary" onClick={() => { setViewingOpp(null); handleEdit(viewingOpp); }}>
                                Edit
                            </Button>
                            <Button icon={<SwapOutlined />} onClick={handleOpenStageModal}>
                                Change Stage
                            </Button>
                        </div>
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
        </>
    );
};

const OpportunitiesPage: React.FC = () => <OpportunitiesContent />;

export default OpportunitiesPage;