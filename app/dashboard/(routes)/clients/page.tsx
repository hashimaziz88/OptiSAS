'use client';

import React, { useEffect, useState } from 'react';
import { Button, Input, Select, Typography, message, Drawer, Descriptions, Tag, Statistic, Row, Col } from 'antd';
import { PlusOutlined, SearchOutlined, ReloadOutlined } from '@ant-design/icons';
import { ClientProvider, useClientActions, useClientState } from '@/providers/clientProvider';
import { IClientDto, ICreateClientDto, IUpdateClientDto } from '@/providers/clientProvider/context';
import { CLIENT_TYPE_OPTIONS, CLIENTS_PAGE_SIZE, INDUSTRY_OPTIONS } from '@/constants/clients';
import { buildClientsParams, getClientTypeLabel } from '@/utils/dashboard/clients';
import ClientsTable from '@/components/dashboard/clients/ClientsTable';
import ClientFormModal from '@/components/dashboard/clients/ClientFormModal';
import { useStyles, drawerComponentStyles, descriptionsLabelStyle, descriptionsContentStyle } from '@/components/dashboard/clients/style/style';

const { Title } = Typography;

const ClientsContent: React.FC = () => {
    const { styles } = useStyles();
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
        message.success('Client deleted');
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
                onView={setViewingClient}
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
                size={480}
                styles={drawerComponentStyles}
            >
                {viewingClient && (
                    <>
                        <Row gutter={16} className={styles.statsRow}>
                            <Col span={12}>
                                <Statistic title={<span className={styles.statLabel}>Contacts</span>} value={viewingClient.contactsCount} className={styles.statContacts} />
                            </Col>
                            <Col span={12}>
                                <Statistic title={<span className={styles.statLabel}>Opportunities</span>} value={viewingClient.opportunitiesCount} className={styles.statOpportunities} />
                            </Col>
                        </Row>
                        <Descriptions
                            column={1}
                            labelStyle={descriptionsLabelStyle}
                            contentStyle={descriptionsContentStyle}
                            size="small"
                        >
                            <Descriptions.Item label="Type">{getClientTypeLabel(viewingClient.clientType)}</Descriptions.Item>
                            <Descriptions.Item label="Industry">{viewingClient.industry || '—'}</Descriptions.Item>
                            <Descriptions.Item label="Company Size">{viewingClient.companySize || '—'}</Descriptions.Item>
                            <Descriptions.Item label="Website">{viewingClient.website || '—'}</Descriptions.Item>
                            <Descriptions.Item label="Billing Address">{viewingClient.billingAddress || '—'}</Descriptions.Item>
                            <Descriptions.Item label="Tax Number">{viewingClient.taxNumber || '—'}</Descriptions.Item>
                            <Descriptions.Item label="Status">
                                <Tag color={viewingClient.isActive ? 'green' : 'red'}>
                                    {viewingClient.isActive ? 'Active' : 'Inactive'}
                                </Tag>
                            </Descriptions.Item>
                            <Descriptions.Item label="Created By">{viewingClient.createdByName || '—'}</Descriptions.Item>
                        </Descriptions>
                        <div className={styles.drawerActions}>
                            <Button type="primary" onClick={() => { setViewingClient(null); handleEdit(viewingClient); }}>Edit Client</Button>
                        </div>
                    </>
                )}
            </Drawer>
        </>
    );
};

const ClientsPage: React.FC = () => (
    <ClientProvider>
        <ClientsContent />
    </ClientProvider>
);

export default ClientsPage;
