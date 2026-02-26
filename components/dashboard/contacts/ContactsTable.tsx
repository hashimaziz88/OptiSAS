'use client';

import React from 'react';
import { Table, Button, Popconfirm, Tooltip, Space, Avatar } from 'antd';
import { EditOutlined, DeleteOutlined, EyeOutlined, StarOutlined, StarFilled } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import { IContactDto } from '@/providers/contactProvider/context';
import { useStyles } from './style/style';

interface ContactsTableProps {
    data: IContactDto[];
    total: number;
    page: number;
    pageSize: number;
    loading: boolean;
    onPageChange: (page: number, pageSize: number) => void;
    onEdit: (contact: IContactDto) => void;
    onDelete: (id: string) => void;
    onView: (contact: IContactDto) => void;
    onSetPrimary: (id: string) => void;
}

const ContactsTable: React.FC<ContactsTableProps> = ({
    data, total, page, pageSize, loading,
    onPageChange, onEdit, onDelete, onView, onSetPrimary,
}) => {
    const { styles, cx } = useStyles();

    const columns: ColumnsType<IContactDto> = [
        {
            title: 'Name',
            key: 'name',
            render: (_, record) => (
                <div className={styles.avatarCell}>
                    <Avatar style={{ background: '#3b82f6', flexShrink: 0 }}>
                        {record.firstName[0]}{record.lastName[0]}
                    </Avatar>
                    <Button type="link" style={{ padding: 0, color: '#e2e8f0', fontWeight: 600 }} onClick={() => onView(record)}>
                        {record.fullName}
                    </Button>
                </div>
            ),
        },
        {
            title: 'Client',
            dataIndex: 'clientName',
            key: 'clientName',
            render: (v: string) => v || '—',
        },
        {
            title: 'Position',
            dataIndex: 'position',
            key: 'position',
            render: (v: string) => v || '—',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            render: (v: string) => v
                ? <a href={`mailto:${v}`} style={{ color: '#60a5fa' }}>{v}</a>
                : '—',
        },
        {
            title: 'Phone',
            dataIndex: 'phoneNumber',
            key: 'phoneNumber',
            render: (v: string) => v || '—',
            width: 140,
        },
        {
            title: 'Primary',
            dataIndex: 'isPrimaryContact',
            key: 'isPrimaryContact',
            width: 90,
            align: 'center',
            render: (isPrimary: boolean, record) => (
                <Tooltip title={isPrimary ? 'Primary contact' : 'Set as primary'}>
                    <Button
                        type="text"
                        icon={isPrimary ? <StarFilled style={{ color: '#faad14' }} /> : <StarOutlined style={{ color: '#666' }} />}
                        onClick={() => !isPrimary && onSetPrimary(record.id)}
                        style={{ padding: 0 }}
                    />
                </Tooltip>
            ),
        },
        {
            title: 'Status',
            dataIndex: 'isActive',
            key: 'isActive',
            width: 90,
            render: (active: boolean) => (
                <span className={cx(styles.statusBadge, active ? styles.activeBadge : styles.inactiveBadge)}>
                    {active ? 'Active' : 'Inactive'}
                </span>
            ),
        },
        {
            title: 'Actions',
            key: 'actions',
            width: 110,
            align: 'center',
            render: (_, record) => (
                <Space size={4}>
                    <Tooltip title="View">
                        <Button
                            type="text"
                            icon={<EyeOutlined />}
                            style={{ color: '#60a5fa' }}
                            onClick={() => onView(record)}
                        />
                    </Tooltip>
                    <Tooltip title="Edit">
                        <Button
                            type="text"
                            icon={<EditOutlined />}
                            style={{ color: '#a0aec0' }}
                            onClick={() => onEdit(record)}
                        />
                    </Tooltip>
                    <Popconfirm
                        title="Delete contact?"
                        description="This action cannot be undone."
                        onConfirm={() => onDelete(record.id)}
                        okText="Delete"
                        okButtonProps={{ danger: true }}
                        cancelText="Cancel"
                    >
                        <Tooltip title="Delete">
                            <Button
                                type="text"
                                icon={<DeleteOutlined />}
                                style={{ color: '#fc8181' }}
                            />
                        </Tooltip>
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    return (
        <Table
            className={styles.table}
            columns={columns}
            dataSource={data}
            rowKey="id"
            loading={loading}
            pagination={{
                current: page,
                pageSize,
                total,
                showSizeChanger: true,
                showTotal: (t) => `${t} contacts`,
                onChange: onPageChange,
            }}
        />
    );
};

export default ContactsTable;
