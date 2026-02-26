'use client';

import React, { useEffect, useState } from 'react';
import { Button, Descriptions, Drawer, Select, Space, Tag, Typography, message } from 'antd';
import { ReloadOutlined, UploadOutlined } from '@ant-design/icons';
import { DocumentProvider, useDocumentActions, useDocumentState } from '@/providers/documentProvider';
import { IDocumentDto } from '@/providers/documentProvider/context';
import {
    DOCUMENT_CATEGORY_COLORS,
    DOCUMENT_CATEGORY_LABELS,
    DOCUMENT_CATEGORY_OPTIONS,
    DOCUMENTS_PAGE_SIZE,
    RELATED_TO_TYPE_LABELS,
    RELATED_TO_TYPE_OPTIONS,
    formatFileSize,
} from '@/constants/documents';
import DocumentsTable from '@/components/dashboard/documents/DocumentsTable';
import DocumentUploadModal from '@/components/dashboard/documents/DocumentUploadModal';
import { useStyles } from '@/components/dashboard/documents/style/style';

const { Title } = Typography;

const DocumentsContent: React.FC = () => {
    const { styles } = useStyles();
    const { getDocuments, uploadDocument, downloadDocument, deleteDocument } = useDocumentActions();
    const { isPending, pagedResult, downloadBlob } = useDocumentState();

    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(DOCUMENTS_PAGE_SIZE);
    const [categoryFilter, setCategoryFilter] = useState<number | undefined>(undefined);
    const [relatedTypeFilter, setRelatedTypeFilter] = useState<number | undefined>(undefined);

    const [uploadOpen, setUploadOpen] = useState(false);
    const [viewingDoc, setViewingDoc] = useState<IDocumentDto | null>(null);
    const [downloadingId, setDownloadingId] = useState<string | null>(null);

    const fetchDocuments = (newPage = page, newPageSize = pageSize) => {
        getDocuments({
            pageNumber: newPage,
            pageSize: newPageSize,
            category: categoryFilter,
            relatedToType: relatedTypeFilter,
        });
    };

    useEffect(() => {
        getDocuments({
            pageNumber: page,
            pageSize: pageSize,
            category: categoryFilter,
            relatedToType: relatedTypeFilter,
        });
    }, [page, pageSize, categoryFilter, relatedTypeFilter, getDocuments]);

    useEffect(() => {
        if (downloadBlob && downloadingId) {
            const url = URL.createObjectURL(downloadBlob);
            const link = document.createElement('a');
            link.href = url;
            const doc = pagedResult?.items?.find((d) => d.id === downloadingId);
            link.download = doc?.fileName ?? 'document';
            link.click();
            URL.revokeObjectURL(url);
            setDownloadingId(null);
        }
    }, [downloadBlob, downloadingId, pagedResult]);

    const documents = pagedResult?.items ?? [];

    const handlePageChange = (newPage: number, newPageSize: number) => {
        setPage(newPage);
        setPageSize(newPageSize);
    };

    const handleUpload = async (formData: FormData) => {
        await uploadDocument(formData);
        message.success('Document uploaded');
        setUploadOpen(false);
        fetchDocuments();
    };

    const handleDownload = async (doc: IDocumentDto) => {
        setDownloadingId(doc.id);
        await downloadDocument(doc.id);
    };

    const handleDelete = async (id: string) => {
        await deleteDocument(id);
        message.success('Document deleted');
        fetchDocuments();
    };

    return (
        <>
            <div className={styles.pageHeader}>
                <Title level={2} className={styles.pageTitle}>Documents</Title>
                <Button type="primary" icon={<UploadOutlined />} size="large" onClick={() => setUploadOpen(true)}>
                    Upload Document
                </Button>
            </div>

            <div className={styles.filterBar}>
                <Select
                    className={styles.filterSelect}
                    placeholder="All Categories"
                    allowClear
                    options={DOCUMENT_CATEGORY_OPTIONS}
                    value={categoryFilter}
                    onChange={(value) => { setCategoryFilter(value); setPage(1); }}
                    size="large"
                />

                <Select
                    className={styles.filterSelect}
                    placeholder="All Related Types"
                    allowClear
                    options={RELATED_TO_TYPE_OPTIONS}
                    value={relatedTypeFilter}
                    onChange={(value) => { setRelatedTypeFilter(value); setPage(1); }}
                    size="large"
                />

                <Button icon={<ReloadOutlined />} size="large" className={styles.refreshButton} onClick={() => fetchDocuments()}>
                    Refresh
                </Button>
            </div>

            <DocumentsTable
                data={documents}
                total={pagedResult?.totalCount ?? 0}
                page={page}
                pageSize={pageSize}
                loading={isPending}
                onPageChange={handlePageChange}
                onView={setViewingDoc}
                onDownload={handleDownload}
                onDelete={handleDelete}
            />

            <DocumentUploadModal
                open={uploadOpen}
                loading={isPending}
                onUpload={handleUpload}
                onClose={() => setUploadOpen(false)}
            />

            <Drawer
                open={!!viewingDoc}
                title="Document Details"
                onClose={() => setViewingDoc(null)}
                size="large"
                styles={{
                    wrapper: { background: '#1e2128' },
                    header: { background: '#1e2128', borderBottom: '1px solid rgba(255,255,255,0.08)', color: 'white' },
                    body: { background: '#1e2128', padding: '24px' },
                }}
                classNames={{ body: styles.drawerBody, header: styles.drawerHeader }}
            >
                {viewingDoc && (
                    <>
                        <Space className={styles.spaceBlock}>
                            <Tag color={DOCUMENT_CATEGORY_COLORS[viewingDoc.category] ?? 'default'}>
                                {DOCUMENT_CATEGORY_LABELS[viewingDoc.category] ?? '—'}
                            </Tag>
                        </Space>

                        <Descriptions column={1} size="small" layout="vertical">
                            <Descriptions.Item label="File Name">{viewingDoc.fileName}</Descriptions.Item>
                            <Descriptions.Item label="File Size">{formatFileSize(viewingDoc.fileSize)}</Descriptions.Item>
                            <Descriptions.Item label="Content Type">{viewingDoc.contentType || '—'}</Descriptions.Item>
                            <Descriptions.Item label="Category">
                                {DOCUMENT_CATEGORY_LABELS[viewingDoc.category] ?? '—'}
                            </Descriptions.Item>
                            <Descriptions.Item label="Related To">
                                {RELATED_TO_TYPE_LABELS[viewingDoc.relatedToType] ?? '—'}
                            </Descriptions.Item>
                            <Descriptions.Item label="Description">{viewingDoc.description || '—'}</Descriptions.Item>
                            <Descriptions.Item label="Uploaded By">{viewingDoc.uploadedByName || '—'}</Descriptions.Item>
                            <Descriptions.Item label="Uploaded At">
                                {new Date(viewingDoc.createdAt).toLocaleString()}
                            </Descriptions.Item>
                        </Descriptions>

                        <div className={styles.drawerActions}>
                            <Button
                                type="primary"
                                icon={<UploadOutlined />}
                                loading={isPending && downloadingId === viewingDoc.id}
                                onClick={() => handleDownload(viewingDoc)}
                            >
                                Download
                            </Button>
                        </div>
                    </>
                )}
            </Drawer>
        </>
    );
};

const DocumentsPage: React.FC = () => (
    <DocumentsContent />
);

export default DocumentsPage;