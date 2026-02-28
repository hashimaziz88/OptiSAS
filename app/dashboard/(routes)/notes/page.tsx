'use client';

import React, { useEffect, useState } from 'react';
import { Button, Descriptions, Drawer, Input, Select, Space, Tag, Typography, message } from 'antd';
import { PlusOutlined, ReloadOutlined, SearchOutlined, EditOutlined } from '@ant-design/icons';
import { useNoteActions, useNoteState } from '@/providers/noteProvider';
import { ICreateNoteDto, INoteDto, IUpdateNoteDto } from '@/providers/noteProvider/context';
import { NOTES_PAGE_SIZE, RELATED_TO_TYPE_LABELS, RELATED_TO_TYPE_OPTIONS } from '@/constants/notes';
import { resolveRecordName } from '@/utils/dashboard/notes';
import NoteFormModal from '@/components/dashboard/notes/NoteFormModal';
import NotesTable from '@/components/dashboard/notes/NotesTable';
import { useStyles } from '@/components/dashboard/notes/style/style';
import ClientSelectFilter from '@/components/dashboard/shared/ClientSelectFilter';

const { Title } = Typography;

const NotesContent: React.FC = () => {
    const { styles } = useStyles();
    const { getNotes, createNote, updateNote, deleteNote } = useNoteActions();
    const { isPending, pagedResult } = useNoteState();

    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(NOTES_PAGE_SIZE);
    const [searchTerm, setSearchTerm] = useState('');
    const [relatedToType, setRelatedToType] = useState<number | undefined>(undefined);
    const [clientFilter, setClientFilter] = useState<string | undefined>(undefined);

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
            ...(clientFilter
                ? { relatedToType: 1, relatedToId: clientFilter }
                : { relatedToType }),
        });
    };

    useEffect(() => {
        getNotes({
            pageNumber: page,
            pageSize: pageSize,
            ...(clientFilter
                ? { relatedToType: 1, relatedToId: clientFilter }
                : { relatedToType }),
        });
    }, [page, pageSize, relatedToType, clientFilter, getNotes]);

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

                <ClientSelectFilter
                    className={styles.filterSelect}
                    value={clientFilter}
                    onChange={(value) => { setClientFilter(value); setPage(1); }}
                />

                <Select
                    className={styles.filterSelect}
                    placeholder="All Related Types"
                    allowClear
                    options={RELATED_TO_TYPE_OPTIONS}
                    value={clientFilter ? undefined : relatedToType}
                    onChange={(value) => { setRelatedToType(value); setPage(1); }}
                    disabled={!!clientFilter}
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
                extra={
                    viewingNote && (
                        <Space>
                            <Button
                                type="primary"
                                icon={<EditOutlined />}
                                onClick={() => { setViewingNote(null); handleEdit(viewingNote); }}
                            >
                                Edit
                            </Button>
                        </Space>
                    )
                }
            >
                {viewingNote && (
                    <>
                        <Space style={{ marginBottom: 20 }}>
                            <Tag color={viewingNote.isPrivate ? 'purple' : 'blue'}>
                                {viewingNote.isPrivate ? 'Private' : 'Shared'}
                            </Tag>
                        </Space>

                        <Descriptions column={2} size="small" bordered style={{ marginBottom: 24 }}>
                            <Descriptions.Item label="Related Type">
                                {RELATED_TO_TYPE_LABELS[viewingNote.relatedToType] || viewingNote.relatedToTypeName || '—'}
                            </Descriptions.Item>
                            <Descriptions.Item label="Created By">{viewingNote.createdByName || '—'}</Descriptions.Item>
                            <Descriptions.Item label="Created At">
                                {new Date(viewingNote.createdAt).toLocaleString()}
                            </Descriptions.Item>
                            <Descriptions.Item label="Updated At">
                                {new Date(viewingNote.updatedAt).toLocaleString()}
                            </Descriptions.Item>
                            <Descriptions.Item label="Related To" span={2}>
                                {relatedRecordName || viewingNote.relatedToId || '—'}
                            </Descriptions.Item>
                            <Descriptions.Item label="Content" span={2}>{viewingNote.content}</Descriptions.Item>
                        </Descriptions>
                    </>
                )}
            </Drawer>
        </>
    );
};

const NotesPage: React.FC = () => (
    <NotesContent />
);

export default NotesPage;