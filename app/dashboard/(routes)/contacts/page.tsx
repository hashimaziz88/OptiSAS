'use client';

import React, { useEffect, useState } from 'react';
import { Button, Input, Select, Typography, message, Drawer, Descriptions, Tag } from 'antd';
import { PlusOutlined, SearchOutlined, ReloadOutlined, StarFilled } from '@ant-design/icons';
import { useContactActions, useContactState } from '@/providers/contactProvider';
import { IContactDto, ICreateContactDto, IUpdateContactDto } from '@/providers/contactProvider/context';
import { useClientActions, useClientState } from '@/providers/clientProvider';
import { CONTACTS_PAGE_SIZE } from '@/constants/contacts';
import { buildContactsParams } from '@/utils/dashboard/contacts';
import ContactsTable from '@/components/dashboard/contacts/ContactsTable';
import ContactFormModal from '@/components/dashboard/contacts/ContactFormModal';
import { useStyles } from '@/components/dashboard/contacts/style/style';

const { Title } = Typography;

const ContactsContent: React.FC = () => {
    const { styles } = useStyles();
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
        message.success('Contact deleted');
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
                onView={setViewingContact}
                onSetPrimary={handleSetPrimary}
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
                styles={{
                    wrapper: { background: '#1e2128', color: 'white' },
                    header: { background: '#1e2128', borderBottom: '1px solid rgba(255,255,255,0.08)', color: 'white !important' },
                    body: { background: '#1e2128', padding: '24px', color: 'white' },
                }}
                classNames={{ body: styles.drawerBody, header: styles.drawerHeader }}
            >
                {viewingContact && (
                    <>
                        {viewingContact.isPrimaryContact && (
                            <Tag icon={<StarFilled />} color="gold" className={styles.tagSpacing}>
                                Primary Contact
                            </Tag>
                        )}
                        <Descriptions column={1} size="small">
                            <Descriptions.Item label="Client">{viewingContact.clientName || '—'}</Descriptions.Item>
                            <Descriptions.Item label="Position">{viewingContact.position || '—'}</Descriptions.Item>
                            <Descriptions.Item label="Email">
                                {viewingContact.email
                                    ? <a href={`mailto:${viewingContact.email}`}>{viewingContact.email}</a>
                                    : '—'}
                            </Descriptions.Item>
                            <Descriptions.Item label="Phone">{viewingContact.phoneNumber || '—'}</Descriptions.Item>
                            <Descriptions.Item label="Status">
                                <Tag color={viewingContact.isActive ? 'green' : 'red'}>
                                    {viewingContact.isActive ? 'Active' : 'Inactive'}
                                </Tag>
                            </Descriptions.Item>
                        </Descriptions>
                        <div className={styles.drawerActions}>
                            <Button
                                type="primary"
                                onClick={() => { setViewingContact(null); handleEdit(viewingContact); }}
                            >
                                Edit Contact
                            </Button>
                            {!viewingContact.isPrimaryContact && (
                                <Button
                                    onClick={() => {
                                        handleSetPrimary(viewingContact.id);
                                        setViewingContact(null);
                                    }}
                                >
                                    Set as Primary
                                </Button>
                            )}
                        </div>
                    </>
                )}
            </Drawer >
        </>
    );
};

const ContactsPage: React.FC = () => <ContactsContent />;

export default ContactsPage;