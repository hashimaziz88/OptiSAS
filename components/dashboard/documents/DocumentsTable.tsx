'use client';

import React from 'react';
import { Table, Button, Popconfirm, Tooltip, Space, Tag } from 'antd';
import { DeleteOutlined, DownloadOutlined, EyeOutlined, FileOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import { IDocumentDto } from '@/providers/documentProvider/context';
import {
    DOCUMENT_CATEGORY_COLORS,
    DOCUMENT_CATEGORY_LABELS,
    RELATED_TO_TYPE_LABELS,
    formatFileSize,
} from '@/constants/documents';
import { DocumentsTableProps } from '@/types/componentProps';
import { useStyles } from './style/style';

const DocumentsTable: React.FC<DocumentsTableProps> = ({
    data,
    total,
    page,
    pageSize,
    loading,
    onPageChange,
    onView,
    onDownload,
    onDelete,
    canDelete,
}) => {
    const { styles } = useStyles();

    const columns: ColumnsType<IDocumentDto> = [
        {
            title: 'File Name',
            dataIndex: 'fileName',
            key: 'fileName',
            ellipsis: true,
            render: (fileName: string, record) => (
                <div className={styles.fileNameCell}>
                    <FileOutlined className="file-icon" />
                    <Button type="link" className={styles.btnNoPadding} onClick={() => onView(record)}>
                        {fileName}
                    </Button>
                </div>
            ),
        },
        {
            title: 'Category',
            dataIndex: 'category',
            key: 'category',
            width: 140,
            render: (category: number) => (
                <Tag color={DOCUMENT_CATEGORY_COLORS[category] ?? 'default'}>
                    {DOCUMENT_CATEGORY_LABELS[category] ?? '—'}
                </Tag>
            ),
        },
        {
            title: 'Related To',
            dataIndex: 'relatedToType',
            key: 'relatedToType',
            width: 140,
            render: (type: number) => RELATED_TO_TYPE_LABELS[type] ?? '—',
        },
        {
            title: 'Size',
            dataIndex: 'fileSize',
            key: 'fileSize',
            width: 100,
            render: (size: number) => formatFileSize(size),
        },
        {
            title: 'Uploaded By',
            dataIndex: 'uploadedByName',
            key: 'uploadedByName',
            width: 160,
            ellipsis: true,
            render: (v: string) => v || '—',
        },
        {
            title: 'Uploaded',
            dataIndex: 'createdAt',
            key: 'createdAt',
            width: 120,
            render: (v: string) => new Date(v).toLocaleDateString(),
        },
        {
            title: 'Actions',
            key: 'actions',
            width: 130,
            align: 'center',
            render: (_: unknown, record: IDocumentDto) => (
                <Space size={4}>
                    <Tooltip title="View">
                        <Button
                            type="text"
                            size="small"
                            icon={<EyeOutlined />}
                            className={styles.viewAction}
                            onClick={() => onView(record)}
                        />
                    </Tooltip>
                    <Tooltip title="Download">
                        <Button
                            type="text"
                            size="small"
                            icon={<DownloadOutlined />}
                            className={styles.downloadAction}
                            onClick={() => onDownload(record)}
                        />
                    </Tooltip>
                    {canDelete && (
                        <Popconfirm
                            title="Delete this document?"
                            description="This action cannot be undone."
                            onConfirm={() => onDelete(record.id)}
                            okText="Delete"
                            cancelText="No"
                            okButtonProps={{ danger: true }}
                        >
                            <Tooltip title="Delete">
                                <Button
                                    type="text"
                                    size="small"
                                    icon={<DeleteOutlined />}
                                    className={styles.deleteAction}
                                />
                            </Tooltip>
                        </Popconfirm>
                    )}
                </Space>
            ),
        },
    ];

    return (
        <Table<IDocumentDto>
            className={styles.table}
            rowKey="id"
            columns={columns}
            dataSource={data}
            loading={loading}
            scroll={{ x: 1000 }}
            pagination={{
                current: page,
                pageSize,
                total,
                showSizeChanger: true,
                onChange: onPageChange,
                showTotal: (value, range) => `${range[0]}-${range[1]} of ${value} documents`,
            }}
        />
    );
};

export default DocumentsTable;
