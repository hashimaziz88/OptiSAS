'use client';

import React, { useEffect, useState } from 'react';
import {
    Button, Descriptions, Drawer, Input, message, Popconfirm,
    Select, Space, Tag, Tooltip, Typography,
} from 'antd';
import {
    CheckCircleOutlined, EditOutlined, PlusOutlined,
    RedoOutlined, ReloadOutlined, StopOutlined, WarningOutlined,
} from '@ant-design/icons';
import { ContractProvider, useContractState, useContractActions } from '@/providers/contractProvider';
import { IContractDto, ICreateContractDto, ICreateContractRenewalDto, IUpdateContractDto } from '@/providers/contractProvider/context';
import { CONTRACT_STATUS_COLORS, CONTRACT_STATUS_LABELS, CONTRACT_STATUS_OPTIONS, CONTRACTS_PAGE_SIZE } from '@/constants/contracts';
import ContractsTable from '@/components/dashboard/contracts/ContractsTable';
import ContractFormModal from '@/components/dashboard/contracts/ContractFormModal';
import RenewalModal from '@/components/dashboard/contracts/RenewalModal';
import { useStyles } from '@/components/dashboard/contracts/style/style';

const { Title, Text } = Typography;

const ContractsContent: React.FC = () => {
    const { styles } = useStyles();
    const { isPending, pagedResult } = useContractState();
    const {
        getContracts,
        createContract,
        updateContract,
        deleteContract,
        activateContract,
        cancelContract,
        createRenewal,
    } = useContractActions();

    const [page, setPage] = useState(1);
    const [statusFilter, setStatusFilter] = useState<number | undefined>(undefined);

    const [modalOpen, setModalOpen] = useState(false);
    const [editingContract, setEditingContract] = useState<IContractDto | null>(null);

    const [viewingContract, setViewingContract] = useState<IContractDto | null>(null);
    const [drawerOpen, setDrawerOpen] = useState(false);

    const [renewalModalOpen, setRenewalModalOpen] = useState(false);
    const [renewingContract, setRenewingContract] = useState<IContractDto | null>(null);

    const load = (p = page, status = statusFilter) => {
        getContracts({ pageNumber: p, pageSize: CONTRACTS_PAGE_SIZE, status });
    };

    useEffect(() => {
        getContracts({ pageNumber: 1, pageSize: CONTRACTS_PAGE_SIZE, status: undefined });
    }, [getContracts]);

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
        setEditingContract(null);
        setModalOpen(true);
    };

    const handleEdit = (record: IContractDto) => {
        setEditingContract(record);
        setModalOpen(true);
    };

    const handleView = (record: IContractDto) => {
        setViewingContract(record);
        setDrawerOpen(true);
    };

    const handleDelete = async (id: string) => {
        await deleteContract(id);
        message.success('Contract deleted');
        load();
    };

    const handleActivate = async (record: IContractDto) => {
        await activateContract(record.id);
        message.success('Contract activated');
        load();
        if (viewingContract?.id === record.id) setDrawerOpen(false);
    };

    const handleCancel = async (record: IContractDto) => {
        await cancelContract(record.id);
        message.success('Contract cancelled');
        load();
        if (viewingContract?.id === record.id) setDrawerOpen(false);
    };

    const handleOpenRenewal = (record: IContractDto) => {
        setRenewingContract(record);
        setRenewalModalOpen(true);
    };

    const handleRenewalSubmit = async (contractId: string, payload: ICreateContractRenewalDto) => {
        await createRenewal(contractId, payload);
        message.success('Renewal created');
        setRenewalModalOpen(false);
        setRenewingContract(null);
        load();
    };

    const handleModalSubmit = async (values: ICreateContractDto | IUpdateContractDto) => {
        if (editingContract) {
            await updateContract(editingContract.id, values as IUpdateContractDto);
            message.success('Contract updated');
        } else {
            await createContract(values as ICreateContractDto);
            message.success('Contract created');
        }
        setModalOpen(false);
        load();
    };

    const drawerStatus = viewingContract?.status;

    return (
        <div>
            <div className={styles.pageHeader}>
                <Title level={2} className={styles.pageTitle}>Contracts</Title>
                <Button type="primary" icon={<PlusOutlined />} onClick={handleCreate}>
                    New Contract
                </Button>
            </div>

            <div className={styles.filterBar}>
                <Input.Search
                    className={styles.searchInput}
                    placeholder="Search contracts..."
                    onSearch={() => load()}
                    allowClear
                />
                <Select
                    className={styles.filterSelect}
                    placeholder="All Statuses"
                    options={CONTRACT_STATUS_OPTIONS}
                    value={statusFilter}
                    onChange={handleStatusFilter}
                    allowClear
                />
                <Button icon={<ReloadOutlined />} onClick={() => load()}>
                    Refresh
                </Button>
            </div>

            <ContractsTable
                data={pagedResult?.items ?? []}
                loading={isPending}
                total={pagedResult?.totalCount ?? 0}
                page={page}
                pageSize={CONTRACTS_PAGE_SIZE}
                onPageChange={handlePageChange}
                onView={handleView}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onActivate={handleActivate}
                onCancel={handleCancel}
                onRenew={handleOpenRenewal}
            />

            <ContractFormModal
                open={modalOpen}
                editing={editingContract}
                loading={isPending}
                onSubmit={handleModalSubmit}
                onClose={() => setModalOpen(false)}
            />

            <RenewalModal
                open={renewalModalOpen}
                contract={renewingContract}
                loading={isPending}
                onSubmit={handleRenewalSubmit}
                onClose={() => { setRenewalModalOpen(false); setRenewingContract(null); }}
            />

            <Drawer
                open={drawerOpen}
                title={viewingContract ? `${viewingContract.contractNumber} – ${viewingContract.title}` : 'Contract Details'}
                onClose={() => { setDrawerOpen(false); setViewingContract(null); }}
                size="large"
                styles={{
                    wrapper: { background: '#1e2128' },
                    header: { background: '#1e2128', borderBottom: '1px solid rgba(255,255,255,0.08)', color: 'white' },
                    body: { background: '#1e2128', padding: '24px' },
                }}
                classNames={{ body: styles.drawerBody, header: styles.drawerHeader }}
                extra={
                    viewingContract && (
                        <Space>
                            {(drawerStatus === 1 || drawerStatus === 2) && (
                                <Tooltip title="Edit">
                                    <Button
                                        icon={<EditOutlined />}
                                        style={{ color: '#facc15', borderColor: '#facc15' }}
                                        onClick={() => { setDrawerOpen(false); handleEdit(viewingContract); }}
                                    >
                                        Edit
                                    </Button>
                                </Tooltip>
                            )}
                            {drawerStatus === 1 && (
                                <Popconfirm title="Activate this contract?" onConfirm={() => handleActivate(viewingContract)}>
                                    <Button icon={<CheckCircleOutlined />} style={{ color: '#22c55e', borderColor: '#22c55e' }}>
                                        Activate
                                    </Button>
                                </Popconfirm>
                            )}
                            {(drawerStatus === 2 || drawerStatus === 3) && (
                                <Button
                                    icon={<RedoOutlined />}
                                    style={{ color: '#a78bfa', borderColor: '#a78bfa' }}
                                    onClick={() => { setDrawerOpen(false); handleOpenRenewal(viewingContract); }}
                                >
                                    Renew
                                </Button>
                            )}
                            {drawerStatus === 2 && (
                                <Popconfirm title="Cancel this contract?" onConfirm={() => handleCancel(viewingContract)}>
                                    <Button icon={<StopOutlined />} danger>
                                        Cancel
                                    </Button>
                                </Popconfirm>
                            )}
                        </Space>
                    )
                }
            >
                {viewingContract && (
                    <>
                        <Space style={{ marginBottom: 20 }}>
                            <Tag color={CONTRACT_STATUS_COLORS[viewingContract.status]}>
                                {CONTRACT_STATUS_LABELS[viewingContract.status]}
                            </Tag>
                            {viewingContract.isExpiringSoon && (
                                <Tag icon={<WarningOutlined />} color="warning">
                                    Expiring in {viewingContract.daysUntilExpiry} day(s)
                                </Tag>
                            )}
                            {viewingContract.autoRenew && (
                                <Tag color="blue">Auto-Renew</Tag>
                            )}
                        </Space>

                        <Descriptions column={2} size="small" bordered style={{ marginBottom: 24 }}>
                            <Descriptions.Item label="Contract #">{viewingContract.contractNumber}</Descriptions.Item>
                            <Descriptions.Item label="Status">
                                {CONTRACT_STATUS_LABELS[viewingContract.status]}
                            </Descriptions.Item>
                            <Descriptions.Item label="Client">{viewingContract.clientName}</Descriptions.Item>
                            <Descriptions.Item label="Opportunity">{viewingContract.opportunityTitle || '—'}</Descriptions.Item>
                            <Descriptions.Item label="Proposal">{viewingContract.proposalNumber || '—'}</Descriptions.Item>
                            <Descriptions.Item label="Owner">{viewingContract.ownerName}</Descriptions.Item>
                            <Descriptions.Item label="Contract Value" span={2}>
                                <Text strong className={styles.amountText}>
                                    {`ZAR ${(viewingContract.contractValue ?? 0).toLocaleString('en-ZA', { minimumFractionDigits: 2 })}`}
                                </Text>
                            </Descriptions.Item>
                            <Descriptions.Item label="Start Date">
                                {viewingContract.startDate ? new Date(viewingContract.startDate).toLocaleDateString('en-ZA') : '—'}
                            </Descriptions.Item>
                            <Descriptions.Item label="End Date">
                                {viewingContract.endDate ? new Date(viewingContract.endDate).toLocaleDateString('en-ZA') : '—'}
                            </Descriptions.Item>
                            <Descriptions.Item label="Renewal Notice">{viewingContract.renewalNoticePeriod ?? '—'} days</Descriptions.Item>
                            <Descriptions.Item label="Renewals">{viewingContract.renewalsCount ?? 0}</Descriptions.Item>
                            {viewingContract.terms && (
                                <Descriptions.Item label="Terms" span={2}>
                                    {viewingContract.terms}
                                </Descriptions.Item>
                            )}
                        </Descriptions>
                    </>
                )}
            </Drawer>
        </div>
    );
};

const ContractsPage: React.FC = () => (
    <ContractProvider>
        <ContractsContent />
    </ContractProvider>
);

export default ContractsPage;