'use client';

import React, { useEffect, useState } from 'react';
import {
    Button, Descriptions, Drawer, Input, message, Popconfirm,
    Select, Space, Table, Tag, Typography,
} from 'antd';
import {
    CheckOutlined, CloseOutlined, EditOutlined, PlusOutlined,
    ReloadOutlined, SendOutlined,
} from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import { useProposalState, useProposalActions } from '@/providers/proposalProvider';
import { ICreateProposalDto, IProposalDto, IProposalLineItemDto, IUpdateProposalDto } from '@/providers/proposalProvider/context';
import { PROPOSAL_STATUS_COLORS, PROPOSAL_STATUS_LABELS, PROPOSAL_STATUS_OPTIONS, PROPOSALS_PAGE_SIZE } from '@/constants/proposals';
import ProposalFormModal from '@/components/dashboard/proposals/ProposalFormModal';
import ProposalsTable from '@/components/dashboard/proposals/ProposalsTable';
import RejectProposalModal from '@/components/dashboard/proposals/RejectProposalModal';
import { useStyles } from '@/components/dashboard/proposals/style/style';
import { useAuthState } from '@/providers/authProvider';
import { isAdminOrManager } from '@/utils/roles';
import { formatCurrency } from '@/utils/dashboard/proposals';

const { Title, Text } = Typography;
const ProposalsContent: React.FC = () => {
    const { styles } = useStyles();
    const { user } = useAuthState();
    const canDelete = isAdminOrManager(user?.roles);
    const canApproveReject = isAdminOrManager(user?.roles);
    const { isPending, pagedResult, currentProposal } = useProposalState();
    const {
        getProposals,
        getProposal,
        createProposal,
        updateProposal,
        deleteProposal,
        submitProposal,
        approveProposal,
        rejectProposal,
    } = useProposalActions();

    const [page, setPage] = useState(1);
    const [statusFilter, setStatusFilter] = useState<number | undefined>(undefined);
    const [searchTerm, setSearchTerm] = useState('');

    const [modalOpen, setModalOpen] = useState(false);
    const [editingProposal, setEditingProposal] = useState<IProposalDto | null>(null);

    const [viewingProposal, setViewingProposal] = useState<IProposalDto | null>(null);
    const [drawerOpen, setDrawerOpen] = useState(false);

    const [rejectingProposal, setRejectingProposal] = useState<IProposalDto | null>(null);
    const [rejectModalOpen, setRejectModalOpen] = useState(false);

    const load = (p = page, status = statusFilter) => {
        getProposals({ pageNumber: p, pageSize: PROPOSALS_PAGE_SIZE, status });
    };

    useEffect(() => {
        getProposals({ pageNumber: 1, pageSize: PROPOSALS_PAGE_SIZE, status: undefined });
    }, [getProposals]);

    useEffect(() => {
        if (viewingProposal) {
            getProposal(viewingProposal.id);
        }
    }, [viewingProposal?.id, getProposal]);

    const handleStatusFilter = (value: number | undefined) => {
        setStatusFilter(value);
        setPage(1);
        load(1, value);
    };

    const handlePageChange = (p: number) => {
        setPage(p);
        load(p, statusFilter);
    };

    const handleCreate = () => {
        setEditingProposal(null);
        setModalOpen(true);
    };

    const handleEdit = (record: IProposalDto) => {
        setEditingProposal(record);
        setModalOpen(true);
    };

    const handleView = (record: IProposalDto) => {
        setViewingProposal(record);
        setDrawerOpen(true);
    };

    const handleDelete = async (id: string) => {
        await deleteProposal(id);
        message.success('Proposal deleted');
        load();
    };

    const handleSubmitProposal = async (record: IProposalDto) => {
        await submitProposal(record.id);
        message.success('Proposal submitted');
        load();
        if (viewingProposal?.id === record.id) setDrawerOpen(false);
    };

    const handleApprove = async (record: IProposalDto) => {
        await approveProposal(record.id);
        message.success('Proposal approved');
        load();
        if (viewingProposal?.id === record.id) setDrawerOpen(false);
    };

    const handleReject = async (id: string, reason: string) => {
        await rejectProposal(id, reason);
        message.success('Proposal rejected');
        setRejectModalOpen(false);
        setRejectingProposal(null);
        load();
        if (viewingProposal?.id === id) setDrawerOpen(false);
    };

    const handleOpenReject = (record: IProposalDto) => {
        setRejectingProposal(record);
        setRejectModalOpen(true);
    };

    const handleModalSubmit = async (values: ICreateProposalDto | IUpdateProposalDto) => {
        if (editingProposal) {
            await updateProposal(editingProposal.id, values as IUpdateProposalDto);
            message.success('Proposal updated');
        } else {
            await createProposal(values as ICreateProposalDto);
            message.success('Proposal created');
        }
        setModalOpen(false);
        load();
    };

    const filteredProposals = (pagedResult?.items ?? []).filter((p) => {
        if (!searchTerm) return true;
        const q = searchTerm.toLowerCase();
        return (
            p.proposalNumber?.toLowerCase().includes(q) ||
            p.title?.toLowerCase().includes(q) ||
            p.clientName?.toLowerCase().includes(q) ||
            p.opportunityTitle?.toLowerCase().includes(q)
        );
    });

    const drawerProposal = currentProposal?.id === viewingProposal?.id ? currentProposal : null;
    const lineItems: IProposalLineItemDto[] = drawerProposal?.lineItems ?? [];

    const lineItemColumns: ColumnsType<IProposalLineItemDto> = [
        { title: 'Product / Service', dataIndex: 'productServiceName', key: 'productServiceName' },
        { title: 'Qty', dataIndex: 'quantity', key: 'quantity', width: 60 },
        { title: 'Unit Price', dataIndex: 'unitPrice', key: 'unitPrice', width: 100, render: (v: number) => v?.toFixed(2) },
        { title: 'Disc %', dataIndex: 'discount', key: 'discount', width: 70, render: (v: number) => `${v ?? 0}%` },
        { title: 'Tax %', dataIndex: 'taxRate', key: 'taxRate', width: 70, render: (v: number) => `${v ?? 0}%` },
        { title: 'Total', dataIndex: 'totalPrice', key: 'totalPrice', width: 120, render: (v: number) => v?.toFixed(2) },
    ];

    const drawerStatus = viewingProposal?.status;

    return (
        <div>
            <div className={styles.pageHeader}>
                <Title level={2} className={styles.pageTitle}>Proposals</Title>
                <Button type="primary" icon={<PlusOutlined />} onClick={handleCreate}>
                    New Proposal
                </Button>
            </div>

            <div className={styles.filterBar}>
                <Input.Search
                    className={styles.searchInput}
                    placeholder="Search proposals..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onSearch={(value) => setSearchTerm(value)}
                    allowClear
                />
                <Select
                    className={styles.filterSelect}
                    placeholder="All Statuses"
                    options={PROPOSAL_STATUS_OPTIONS}
                    value={statusFilter}
                    onChange={handleStatusFilter}
                    allowClear
                />
                <Button icon={<ReloadOutlined />} onClick={() => load()}>
                    Refresh
                </Button>
            </div>

            <ProposalsTable
                data={filteredProposals}
                loading={isPending}
                total={searchTerm ? filteredProposals.length : (pagedResult?.totalCount ?? 0)}
                page={page}
                pageSize={PROPOSALS_PAGE_SIZE}
                onPageChange={handlePageChange}
                onView={handleView}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onSubmit={handleSubmitProposal}
                onApprove={handleApprove}
                onReject={handleOpenReject}
                canDelete={canDelete}
                canApproveReject={canApproveReject}
            />

            <ProposalFormModal
                open={modalOpen}
                editing={editingProposal}
                loading={isPending}
                onSubmit={handleModalSubmit}
                onClose={() => setModalOpen(false)}
            />

            <RejectProposalModal
                open={rejectModalOpen}
                proposal={rejectingProposal}
                loading={isPending}
                onReject={handleReject}
                onClose={() => { setRejectModalOpen(false); setRejectingProposal(null); }}
            />

            <Drawer
                open={drawerOpen}
                title={viewingProposal ? `${viewingProposal.proposalNumber} – ${viewingProposal.title}` : 'Proposal Details'}
                onClose={() => { setDrawerOpen(false); setViewingProposal(null); }}
                size="large"
                styles={{
                    wrapper: { background: '#1e2128' },
                    header: { background: '#1e2128', borderBottom: '1px solid rgba(255,255,255,0.08)', color: 'white' },
                    body: { background: '#1e2128', padding: '24px' },
                }}
                classNames={{ body: styles.drawerBody, header: styles.drawerHeader }}
                extra={
                    viewingProposal && (
                        <Space>
                            {drawerStatus === 1 && (
                                <>
                                    <Button
                                        icon={<EditOutlined />}
                                        style={{ color: '#facc15', borderColor: '#facc15' }}
                                        onClick={() => { setDrawerOpen(false); handleEdit(viewingProposal); }}
                                    >
                                        Edit
                                    </Button>
                                    <Popconfirm
                                        title="Submit this proposal?"
                                        onConfirm={() => handleSubmitProposal(viewingProposal)}
                                    >
                                        <Button icon={<SendOutlined />} style={{ color: '#a78bfa', borderColor: '#a78bfa' }}>
                                            Submit
                                        </Button>
                                    </Popconfirm>
                                </>
                            )}
                            {canApproveReject && drawerStatus === 2 && (
                                <>
                                    <Popconfirm
                                        title="Approve this proposal?"
                                        onConfirm={() => handleApprove(viewingProposal)}
                                    >
                                        <Button icon={<CheckOutlined />} style={{ color: '#22c55e', borderColor: '#22c55e' }}>
                                            Approve
                                        </Button>
                                    </Popconfirm>
                                    <Button
                                        icon={<CloseOutlined />}
                                        danger
                                        onClick={() => { setDrawerOpen(false); handleOpenReject(viewingProposal); }}
                                    >
                                        Reject
                                    </Button>
                                </>
                            )}
                        </Space>
                    )
                }
            >
                {viewingProposal && (
                    <>
                        <Tag
                            color={PROPOSAL_STATUS_COLORS[viewingProposal.status]}
                            style={{ marginBottom: 16 }}
                        >
                            {PROPOSAL_STATUS_LABELS[viewingProposal.status]}
                        </Tag>

                        <Descriptions column={2} size="small" bordered style={{ marginBottom: 24 }}>
                            <Descriptions.Item label="Proposal #">{viewingProposal.proposalNumber}</Descriptions.Item>
                            <Descriptions.Item label="Status">
                                {PROPOSAL_STATUS_LABELS[viewingProposal.status]}
                            </Descriptions.Item>
                            <Descriptions.Item label="Client">{viewingProposal.clientName}</Descriptions.Item>
                            <Descriptions.Item label="Opportunity">{viewingProposal.opportunityTitle}</Descriptions.Item>
                            <Descriptions.Item label="Created By">{viewingProposal.createdByName}</Descriptions.Item>
                            <Descriptions.Item label="Valid Until">
                                {viewingProposal.validUntil ? new Date(viewingProposal.validUntil).toLocaleDateString('en-ZA') : '—'}
                            </Descriptions.Item>
                            <Descriptions.Item label="Total" span={2}>
                                <Text strong className={styles.amountText}>
                                    {formatCurrency(viewingProposal.totalAmount)}
                                </Text>
                            </Descriptions.Item>
                            {viewingProposal.description && (
                                <Descriptions.Item label="Description" span={2}>
                                    {viewingProposal.description}
                                </Descriptions.Item>
                            )}
                        </Descriptions>

                        <div className={styles.sectionTitle} style={{ marginBottom: 12 }}>Line Items</div>
                        <Table<IProposalLineItemDto>
                            className={styles.lineItemsTable}
                            rowKey="id"
                            columns={lineItemColumns}
                            dataSource={lineItems}
                            pagination={false}
                            size="small"
                            loading={isPending}
                        />
                        {lineItems.length > 0 && (
                            <div className={styles.totalRow}>
                                <Text>Grand Total:</Text>
                                <Text strong className={styles.amountText}>
                                    {formatCurrency(viewingProposal.totalAmount)}
                                </Text>
                            </div>
                        )}
                    </>
                )}
            </Drawer>
        </div>
    );
};

const ProposalsPage: React.FC = () => (
    <ProposalsContent />
);

export default ProposalsPage;