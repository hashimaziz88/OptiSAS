'use client';

import React, { useEffect, useState } from 'react';
import { Button, Input, Select, Typography, message, Drawer, Descriptions, Tag, Statistic, Row, Col, Space } from 'antd';
import { PlusOutlined, SearchOutlined, ReloadOutlined, EditOutlined } from '@ant-design/icons';
import { useClientActions, useClientState } from '@/providers/clientProvider';
import { IClientDto, ICreateClientDto, IUpdateClientDto } from '@/providers/clientProvider/context';
import { CLIENT_TYPE_OPTIONS, CLIENTS_PAGE_SIZE, INDUSTRY_OPTIONS } from '@/constants/clients';
import { buildClientsParams, getClientTypeLabel } from '@/utils/dashboard/clients';
import ClientsTable from '@/components/dashboard/clients/ClientsTable';
import ClientFormModal from '@/components/dashboard/clients/ClientFormModal';
import { useStyles } from '@/components/dashboard/clients/style/style';
import { useAuthState } from '@/providers/authProvider';
import { isAdminOrManager } from '@/utils/roles';

const { Title } = Typography;

const ClientsContent: React.FC = () => {
    const { styles } = useStyles();
    const { user } = useAuthState();
    const canDelete = isAdminOrManager(user?.roles);
    const { getClients, createClient, updateClient, deleteClient } = useClientActions();
    const { isPending, pagedResult } = useClientState();

    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(CLIENTS_PAGE_SIZE);
    const [searchTerm, setSearchTerm] = useState('');
    const [industry, setIndustry] = useState<string | undefined>(undefined);
    const [clientType, setClientType] = useState<number | undefined>(undefined);

    const [modalOpen, setModalOpen] = useState(false);
    const [editingClient, setEditingClient] = useState<IClientDto | null>(null);
    const [viewingClient, setViewingClient] = useState<IClientDto | null>(null);

    const fetchClients = (p = page, ps = pageSize) => {
        getClients(buildClientsParams(p, ps, { searchTerm, industry }));
    };

    useEffect(() => {
        getClients(buildClientsParams(page, pageSize, { searchTerm, industry, clientType }));
    }, [page, pageSize, searchTerm, industry, clientType, getClients]);

    const tableData = clientType !== undefined
        ? (pagedResult?.items ?? []).filter((c) => c.clientType === clientType)
        : (pagedResult?.items ?? []);

    const handlePageChange = (newPage: number, newPageSize: number) => {
        setPage(newPage);
        setPageSize(newPageSize);
    };

    const handleCreate = () => {
        setEditingClient(null);
        setModalOpen(true);
    };

    const handleEdit = (client: IClientDto) => {
        setEditingClient(client);
        setModalOpen(true);
    };

    const handleDelete = async (id: string) => {
        await deleteClient(id);
        message.success('Client marked as inactive');
        fetchClients();
    };

    const handleActivate = async (client: IClientDto) => {
        await updateClient(client.id, {
            name: client.name,
            industry: client.industry,
            companySize: client.companySize,
            website: client.website,
            billingAddress: client.billingAddress,
            taxNumber: client.taxNumber,
            clientType: client.clientType,
            isActive: true,
        });
        message.success('Client reactivated');
        fetchClients();
    };

    const handleSubmit = async (values: ICreateClientDto | IUpdateClientDto) => {
        if (editingClient) {
            await updateClient(editingClient.id, values as IUpdateClientDto);
            message.success('Client updated');
        } else {
            await createClient(values as ICreateClientDto);
            message.success('Client created');
        }
        setModalOpen(false);
        setEditingClient(null);
        fetchClients();
    };

    return (
        <>
            <div className={styles.pageHeader}>
                <Title level={2} className={styles.pageTitle}>Clients</Title>
                <Button
                    type="primary"
                    icon={<PlusOutlined />}
                    size="large"
                    onClick={handleCreate}
                >
                    Add Client
                </Button>
            </div>

            <div className={styles.filterBar}>
                <Input
                    prefix={<SearchOutlined />}
                    placeholder="Search clients..."
                    className={styles.searchInput}
                    value={searchTerm}
                    onChange={(e) => { setSearchTerm(e.target.value); setPage(1); }}
                    allowClear
                    size="large"
                />
                <Select
                    className={styles.filterSelect}
                    placeholder="All Industries"
                    allowClear
                    options={INDUSTRY_OPTIONS}
                    value={industry}
                    onChange={(value) => { setIndustry(value); setPage(1); }}
                    size="large"
                />
                <Select
                    className={styles.filterSelect}
                    placeholder="All Types"
                    allowClear
                    options={CLIENT_TYPE_OPTIONS}
                    value={clientType}
                    onChange={(value) => { setClientType(value); setPage(1); }}
                    size="large"
                />
                <Button
                    icon={<ReloadOutlined />}
                    size="large"
                    className={styles.refreshButton}
                    onClick={() => fetchClients()}
                >
                    Refresh
                </Button>
            </div>

            <ClientsTable
                data={tableData}
                total={pagedResult?.totalCount ?? 0}
                page={page}
                pageSize={pageSize}
                loading={isPending}
                onPageChange={handlePageChange}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onActivate={handleActivate}
                onView={setViewingClient}
                canDelete={canDelete}
            />

            <ClientFormModal
                open={modalOpen}
                editing={editingClient}
                loading={isPending}
                onSubmit={handleSubmit}
                onClose={() => { setModalOpen(false); setEditingClient(null); }}
            />

            <Drawer
                open={!!viewingClient}
                title={viewingClient?.name ?? 'Client Details'}
                onClose={() => setViewingClient(null)}
                size="large"
                styles={{
                    wrapper: { background: '#1e2128' },
                    header: { background: '#1e2128', borderBottom: '1px solid rgba(255,255,255,0.08)', color: 'white' },
                    body: { background: '#1e2128', padding: '24px' },
                }}
                classNames={{ body: styles.drawerBody, header: styles.drawerHeader }}
                extra={
                    viewingClient && (
                        <Space>
                            <Button
                                type="primary"
                                icon={<EditOutlined />}
                                onClick={() => { setViewingClient(null); handleEdit(viewingClient); }}
                            >
                                Edit
                            </Button>
                        </Space>
                    )
                }
            >
                {viewingClient && (
                    <>
                        <Space style={{ marginBottom: 20 }}>
                            <Tag color={viewingClient.isActive ? 'green' : 'red'}>
                                {viewingClient.isActive ? 'Active' : 'Inactive'}
                            </Tag>
                        </Space>
                        <Row gutter={16} className={styles.statsRow}>
                            <Col span={12}>
                                <Statistic title={<span className={styles.statLabel}>Contacts</span>} value={viewingClient.contactsCount} className={styles.statContacts} />
                            </Col>
                            <Col span={12}>
                                <Statistic title={<span className={styles.statLabel}>Opportunities</span>} value={viewingClient.opportunitiesCount} className={styles.statOpportunities} />
                            </Col>
                        </Row>
                        <Descriptions column={2} size="small" bordered style={{ marginBottom: 24 }}>
                            <Descriptions.Item label="Type">{getClientTypeLabel(viewingClient.clientType)}</Descriptions.Item>
                            <Descriptions.Item label="Industry">{viewingClient.industry || '—'}</Descriptions.Item>
                            <Descriptions.Item label="Company Size">{viewingClient.companySize || '—'}</Descriptions.Item>
                            <Descriptions.Item label="Website">{viewingClient.website || '—'}</Descriptions.Item>
                            <Descriptions.Item label="Tax Number">{viewingClient.taxNumber || '—'}</Descriptions.Item>
                            <Descriptions.Item label="Created By">{viewingClient.createdByName || '—'}</Descriptions.Item>
                            <Descriptions.Item label="Billing Address" span={2}>{viewingClient.billingAddress || '—'}</Descriptions.Item>
                        </Descriptions>
                    </>
                )}
            </Drawer>
        </>
    );
};

const ClientsPage: React.FC = () => (
    <ClientsContent />
);

export default ClientsPage;
