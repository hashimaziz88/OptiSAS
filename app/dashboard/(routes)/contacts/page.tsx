'use client';

import React, { useEffect, useState } from 'react';
import { Button, Input, Select, Typography, message, Drawer, Descriptions, Tag, Space } from 'antd';
import { PlusOutlined, SearchOutlined, ReloadOutlined, StarFilled, StarOutlined, EditOutlined } from '@ant-design/icons';
import { useContactActions, useContactState } from '@/providers/contactProvider';
import { IContactDto, ICreateContactDto, IUpdateContactDto } from '@/providers/contactProvider/context';
import { useClientActions, useClientState } from '@/providers/clientProvider';
import { CONTACTS_PAGE_SIZE } from '@/constants/contacts';
import { buildContactsParams } from '@/utils/dashboard/contacts';
import ContactsTable from '@/components/dashboard/contacts/ContactsTable';
import ContactFormModal from '@/components/dashboard/contacts/ContactFormModal';
import { useStyles } from '@/components/dashboard/contacts/style/style';
import { useAuthState } from '@/providers/authProvider';
import { isAdminOrManagerOrBDM } from '@/utils/roles';

const { Title } = Typography;

const ContactsContent: React.FC = () => {
    const { styles } = useStyles();
    const { user } = useAuthState();
    const canDelete = isAdminOrManagerOrBDM(user?.roles);
    const { getContacts, createContact, updateContact, deleteContact, setContactPrimary } = useContactActions();
    const { isPending, pagedResult } = useContactState();
    const { getClients } = useClientActions();
    const { pagedResult: clientPagedResult } = useClientState();

    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(CONTACTS_PAGE_SIZE);
    const [searchTerm, setSearchTerm] = useState('');
    const [clientFilter, setClientFilter] = useState<string | undefined>(undefined);

    const [modalOpen, setModalOpen] = useState(false);
    const [editingContact, setEditingContact] = useState<IContactDto | null>(null);
    const [viewingContact, setViewingContact] = useState<IContactDto | null>(null);

    const clients = clientPagedResult?.items ?? [];

    const fetchContacts = (p = page, ps = pageSize) => {
        getContacts(buildContactsParams(p, ps, { searchTerm, clientId: clientFilter }));
    };

    useEffect(() => {
        getClients({ pageNumber: 1, pageSize: 200 });
    }, [getClients]);

    useEffect(() => {
        getContacts(buildContactsParams(page, pageSize, { searchTerm, clientId: clientFilter }));
    }, [page, pageSize, searchTerm, clientFilter, getContacts]);

    const handlePageChange = (newPage: number, newPageSize: number) => {
        setPage(newPage);
        setPageSize(newPageSize);
    };

    const handleCreate = () => {
        setEditingContact(null);
        setModalOpen(true);
    };

    const handleEdit = (contact: IContactDto) => {
        setEditingContact(contact);
        setModalOpen(true);
    };

    const handleDelete = async (id: string) => {
        await deleteContact(id);
        message.success('Contact marked as inactive');
        fetchContacts();
    };

    const handleActivate = async (contact: IContactDto) => {
        await updateContact(contact.id, {
            firstName: contact.firstName,
            lastName: contact.lastName,
            email: contact.email,
            phoneNumber: contact.phoneNumber,
            position: contact.position,
            isPrimaryContact: contact.isPrimaryContact,
            isActive: true,
        });
        message.success('Contact reactivated');
        fetchContacts();
    };

    const handleSetPrimary = async (id: string) => {
        await setContactPrimary(id);
        message.success('Primary contact updated');
        fetchContacts();
    };

    const handleSubmit = async (values: ICreateContactDto | IUpdateContactDto) => {
        if (editingContact) {
            await updateContact(editingContact.id, values as IUpdateContactDto);
            message.success('Contact updated');
        } else {
            await createContact(values as ICreateContactDto);
            message.success('Contact created');
        }
        setModalOpen(false);
        setEditingContact(null);
        fetchContacts();
    };

    const clientOptions = clients.map((c) => ({ label: c.name, value: c.id }));

    return (
        <>
            <div className={styles.pageHeader}>
                <Title level={2} className={styles.pageTitle}>Contacts</Title>
                <Button
                    type="primary"
                    icon={<PlusOutlined />}
                    size="large"
                    onClick={handleCreate}
                >
                    Add Contact
                </Button>
            </div>

            <div className={styles.filterBar}>
                <Input
                    prefix={<SearchOutlined />}
                    placeholder="Search contacts..."
                    className={styles.searchInput}
                    value={searchTerm}
                    onChange={(e) => { setSearchTerm(e.target.value); setPage(1); }}
                    allowClear
                    size="large"
                />
                <Select
                    className={styles.filterSelect}
                    placeholder="All Clients"
                    allowClear
                    showSearch
                    options={clientOptions}
                    value={clientFilter}
                    onChange={(value) => { setClientFilter(value); setPage(1); }}
                    size="large"
                />
                <Button
                    icon={<ReloadOutlined />}
                    size="large"
                    className={styles.refreshButton}
                    onClick={() => fetchContacts()}
                >
                    Refresh
                </Button>
            </div>

            <ContactsTable
                data={pagedResult?.items ?? []}
                total={pagedResult?.totalCount ?? 0}
                page={page}
                pageSize={pageSize}
                loading={isPending}
                onPageChange={handlePageChange}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onActivate={handleActivate}
                onView={setViewingContact}
                onSetPrimary={handleSetPrimary}
                canDelete={canDelete}
            />

            <ContactFormModal
                open={modalOpen}
                editing={editingContact}
                loading={isPending}
                clients={clients}
                onSubmit={handleSubmit}
                onClose={() => { setModalOpen(false); setEditingContact(null); }}
            />

            <Drawer
                open={!!viewingContact}
                title={viewingContact?.fullName ?? 'Contact Details'}
                onClose={() => setViewingContact(null)}
                size="large"
                styles={{
                    wrapper: { background: '#1e2128' },
                    header: { background: '#1e2128', borderBottom: '1px solid rgba(255,255,255,0.08)', color: 'white' },
                    body: { background: '#1e2128', padding: '24px' },
                }}
                classNames={{ body: styles.drawerBody, header: styles.drawerHeader }}
                extra={
                    viewingContact && (
                        <Space>
                            <Button
                                type="primary"
                                icon={<EditOutlined />}
                                onClick={() => { setViewingContact(null); handleEdit(viewingContact); }}
                            >
                                Edit
                            </Button>
                            {!viewingContact.isPrimaryContact && (
                                <Button
                                    type="primary"
                                    icon={<StarOutlined />}
                                    onClick={() => { handleSetPrimary(viewingContact.id); setViewingContact(null); }}
                                >
                                    Set as Primary
                                </Button>
                            )}
                        </Space>
                    )
                }
            >
                {viewingContact && (
                    <>
                        <Space style={{ marginBottom: 16 }}>
                            {viewingContact.isPrimaryContact && (
                                <Tag icon={<StarFilled />} color="gold">Primary Contact</Tag>
                            )}
                            <Tag color={viewingContact.isActive ? 'green' : 'red'}>
                                {viewingContact.isActive ? 'Active' : 'Inactive'}
                            </Tag>
                        </Space>
                        <Descriptions column={2} size="small" bordered style={{ marginBottom: 24 }}>
                            <Descriptions.Item label="Client" span={2}>{viewingContact.clientName || '—'}</Descriptions.Item>
                            <Descriptions.Item label="Position" span={2}>{viewingContact.position || '—'}</Descriptions.Item>
                            <Descriptions.Item label="Email">
                                {viewingContact.email
                                    ? <a href={`mailto:${viewingContact.email}`}>{viewingContact.email}</a>
                                    : '—'}
                            </Descriptions.Item>
                            <Descriptions.Item label="Phone">{viewingContact.phoneNumber || '—'}</Descriptions.Item>
                        </Descriptions>
                    </>
                )}
            </Drawer>
        </>
    );
};

const ContactsPage: React.FC = () => <ContactsContent />;

export default ContactsPage;