'use client';

import React, { useEffect, useState } from 'react';
import { Button, Descriptions, Drawer, Input, Select, Space, Tag, Typography, message } from 'antd';
import { PlusOutlined, ReloadOutlined, SearchOutlined } from '@ant-design/icons';
import { NoteProvider, useNoteActions, useNoteState } from '@/providers/noteProvider';
import { ICreateNoteDto, INoteDto, IUpdateNoteDto } from '@/providers/noteProvider/context';
import { NOTES_PAGE_SIZE, RELATED_TO_TYPE_LABELS, RELATED_TO_TYPE_OPTIONS } from '@/constants/notes';
import { axiosInstance } from '@/utils/axiosInstance';
import NoteFormModal from '@/components/dashboard/notes/NoteFormModal';
import NotesTable from '@/components/dashboard/notes/NotesTable';
import { useStyles } from '@/components/dashboard/notes/style/style';

const { Title } = Typography;

const BASE_URL = process.env.NEXT_PUBLIC_API_LINK;

const RELATED_ENDPOINTS: Record<number, string> = {
    1: '/api/Clients',
    2: '/api/Opportunities',
    3: '/api/Proposals',
    4: '/api/Contracts',
    5: '/api/Activities',
};

const resolveRecordName = async (type: number, id: string): Promise<string> => {
    try {
        const res = await axiosInstance().get(`${BASE_URL}${RELATED_ENDPOINTS[type]}/${id}`);
        const record = res.data;
        return record?.name ?? record?.title ?? record?.subject ?? record?.proposalNumber ?? record?.contractNumber ?? id;
    } catch {
        return id;
    }
};

const NotesContent: React.FC = () => {
    const { styles } = useStyles();
    const { getNotes, createNote, updateNote, deleteNote } = useNoteActions();
    const { isPending, pagedResult } = useNoteState();

    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(NOTES_PAGE_SIZE);
    const [searchTerm, setSearchTerm] = useState('');
    const [relatedToType, setRelatedToType] = useState<number | undefined>(undefined);

    const [modalOpen, setModalOpen] = useState(false);
    const [editingNote, setEditingNote] = useState<INoteDto | null>(null);
    const [viewingNote, setViewingNote] = useState<INoteDto | null>(null);
    const [relatedRecordName, setRelatedRecordName] = useState<string>('');

    useEffect(() => {
        if (viewingNote) {
            resolveRecordName(viewingNote.relatedToType, viewingNote.relatedToId)
                .then(setRelatedRecordName);
        } else {
            setRelatedRecordName('');
        }
    }, [viewingNote]);

    const fetchNotes = (newPage = page, newPageSize = pageSize) => {
        getNotes({
            pageNumber: newPage,
            pageSize: newPageSize,
            relatedToType,
        });
    };

    useEffect(() => {
        getNotes({ pageNumber: page, pageSize: pageSize, relatedToType });
    }, [page, pageSize, relatedToType, getNotes]);

    const notes = pagedResult?.items ?? [];
    const filteredItems = searchTerm
        ? notes.filter((note) => note.content.toLowerCase().includes(searchTerm.toLowerCase()))
        : notes;

    const handlePageChange = (newPage: number, newPageSize: number) => {
        setPage(newPage);
        setPageSize(newPageSize);
    };

    const handleCreate = () => {
        setEditingNote(null);
        setModalOpen(true);
    };

    const handleEdit = (note: INoteDto) => {
        setEditingNote(note);
        setModalOpen(true);
    };

    const handleDelete = async (id: string) => {
        await deleteNote(id);
        message.success('Note deleted');
        fetchNotes();
    };

    const handleSubmit = async (values: ICreateNoteDto | IUpdateNoteDto) => {
        if (editingNote) {
            await updateNote(editingNote.id, values as IUpdateNoteDto);
            message.success('Note updated');
        } else {
            await createNote(values as ICreateNoteDto);
            message.success('Note created');
        }

        setModalOpen(false);
        setEditingNote(null);
        fetchNotes();
    };

    return (
        <>
            <div className={styles.pageHeader}>
                <Title level={2} className={styles.pageTitle}>Notes</Title>
                <Button type="primary" icon={<PlusOutlined />} size="large" onClick={handleCreate}>
                    Add Note
                </Button>
            </div>

            <div className={styles.filterBar}>
                <Input
                    prefix={<SearchOutlined />}
                    placeholder="Search notes..."
                    className={styles.searchInput}
                    value={searchTerm}
                    onChange={(e) => { setSearchTerm(e.target.value); setPage(1); }}
                    allowClear
                    size="large"
                />

                <Select
                    className={styles.filterSelect}
                    placeholder="All Related Types"
                    allowClear
                    options={RELATED_TO_TYPE_OPTIONS}
                    value={relatedToType}
                    onChange={(value) => { setRelatedToType(value); setPage(1); }}
                    size="large"
                />

                <Button icon={<ReloadOutlined />} size="large" className={styles.refreshButton} onClick={() => fetchNotes()}>
                    Refresh
                </Button>
            </div>

            <NotesTable
                data={filteredItems}
                total={pagedResult?.totalCount ?? 0}
                page={page}
                pageSize={pageSize}
                loading={isPending}
                onPageChange={handlePageChange}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onView={setViewingNote}
            />

            <NoteFormModal
                open={modalOpen}
                editing={editingNote}
                loading={isPending}
                onSubmit={handleSubmit}
                onClose={() => {
                    setModalOpen(false);
                    setEditingNote(null);
                }}
            />

            <Drawer
                open={!!viewingNote}
                title="Note Details"
                onClose={() => setViewingNote(null)}
                size="large"
                styles={{
                    wrapper: { background: '#1e2128' },
                    header: { background: '#1e2128', borderBottom: '1px solid rgba(255,255,255,0.08)', color: 'white' },
                    body: { background: '#1e2128', padding: '24px' },
                }}
                classNames={{ body: styles.drawerBody, header: styles.drawerHeader }}
            >
                {viewingNote && (
                    <>
                        <Space style={{ marginBottom: 16 }}>
                            <Tag color={viewingNote.isPrivate ? 'purple' : 'blue'}>
                                {viewingNote.isPrivate ? 'Private' : 'Shared'}
                            </Tag>
                        </Space>

                        <Descriptions column={1} size="small" layout="vertical">
                            <Descriptions.Item label="Content">{viewingNote.content}</Descriptions.Item>
                            <Descriptions.Item label="Related Type">
                                {RELATED_TO_TYPE_LABELS[viewingNote.relatedToType] || viewingNote.relatedToTypeName || '—'}
                            </Descriptions.Item>
                            <Descriptions.Item label="Related To">
                                {relatedRecordName || viewingNote.relatedToId || '—'}
                            </Descriptions.Item>
                            <Descriptions.Item label="Created By">{viewingNote.createdByName || '—'}</Descriptions.Item>
                            <Descriptions.Item label="Created At">
                                {new Date(viewingNote.createdAt).toLocaleString()}
                            </Descriptions.Item>
                            <Descriptions.Item label="Updated At">
                                {new Date(viewingNote.updatedAt).toLocaleString()}
                            </Descriptions.Item>
                        </Descriptions>

                        <div className={styles.drawerActions}>
                            <Button
                                type="primary"
                                onClick={() => {
                                    setViewingNote(null);
                                    handleEdit(viewingNote);
                                }}
                            >
                                Edit
                            </Button>
                        </div>
                    </>
                )}
            </Drawer>
        </>
    );
};

const NotesPage: React.FC = () => (
    <NoteProvider>
        <NotesContent />
    </NoteProvider>
);

export default NotesPage;