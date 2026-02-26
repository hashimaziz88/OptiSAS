'use client';

import React from 'react';
import { Table, Button, Popconfirm, Tooltip, Space, Tag } from 'antd';
import { EditOutlined, DeleteOutlined, EyeOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import { INoteDto } from '@/providers/noteProvider/context';
import { RELATED_TO_TYPE_LABELS } from '@/constants/notes';
import { useStyles } from './style/style';

interface NotesTableProps {
    data: INoteDto[];
    total: number;
    page: number;
    pageSize: number;
    loading: boolean;
    onPageChange: (page: number, pageSize: number) => void;
    onEdit: (note: INoteDto) => void;
    onDelete: (id: string) => void;
    onView: (note: INoteDto) => void;
}

const NotesTable: React.FC<NotesTableProps> = ({
    data,
    total,
    page,
    pageSize,
    loading,
    onPageChange,
    onEdit,
    onDelete,
    onView,
}) => {
    const { styles } = useStyles();

    const columns: ColumnsType<INoteDto> = [
        {
            title: 'Content',
            dataIndex: 'content',
            key: 'content',
            ellipsis: true,
            render: (content: string, record) => (
                <Button type="link" style={{ padding: 0 }} onClick={() => onView(record)}>
                    {content}
                </Button>
            ),
        },
        {
            title: 'Related Type',
            dataIndex: 'relatedToType',
            key: 'relatedToType',
            width: 140,
            render: (type: number) => RELATED_TO_TYPE_LABELS[type] ?? '—',
        },
        {
            title: 'Privacy',
            dataIndex: 'isPrivate',
            key: 'isPrivate',
            width: 110,
            render: (isPrivate: boolean) => (
                <Tag color={isPrivate ? 'purple' : 'blue'}>{isPrivate ? 'Private' : 'Shared'}</Tag>
            ),
        },
        {
            title: 'Created By',
            dataIndex: 'createdByName',
            key: 'createdByName',
            width: 150,
            ellipsis: true,
            render: (v: string) => v || '—',
        },
        {
            title: 'Created',
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
            render: (_: unknown, record: INoteDto) => (
                <Space size={4}>
                    <Tooltip title="View">
                        <Button type="text" size="small" icon={<EyeOutlined />} style={{ color: '#60a5fa' }} onClick={() => onView(record)} />
                    </Tooltip>
                    <Tooltip title="Edit">
                        <Button type="text" size="small" icon={<EditOutlined />} style={{ color: '#facc15' }} onClick={() => onEdit(record)} />
                    </Tooltip>
                    <Popconfirm
                        title="Delete this note?"
                        description="This action cannot be undone."
                        onConfirm={() => onDelete(record.id)}
                        okText="Delete"
                        cancelText="No"
                        okButtonProps={{ danger: true }}
                    >
                        <Tooltip title="Delete">
                            <Button type="text" size="small" icon={<DeleteOutlined />} style={{ color: '#f87171' }} />
                        </Tooltip>
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    return (
        <Table<INoteDto>
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
                showTotal: (value, range) => `${range[0]}-${range[1]} of ${value} notes`,
            }}
        />
    );
};

export default NotesTable;
