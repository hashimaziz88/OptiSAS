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
    canDelete?: boolean;
}

const ContactsTable: React.FC<ContactsTableProps> = ({
    data, total, page, pageSize, loading,
    onPageChange, onEdit, onDelete, onView, onSetPrimary, canDelete,
}) => {
    const { styles, cx } = useStyles();

    const columns: ColumnsType<IContactDto> = [
        {
            title: 'Name',
            key: 'name',
            render: (_, record) => (
                <div className={styles.avatarCell}>
                    <Avatar className={styles.contactAvatar}>
                        {record.firstName[0]}{record.lastName[0]}
                    </Avatar>
                    <Button type="link" className={styles.contactNameLink} onClick={() => onView(record)}>
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
                ? <a href={`mailto:${v}`} className={styles.emailLink}>{v}</a>
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
                        icon={isPrimary ? <StarFilled className={styles.starActive} /> : <StarOutlined className={styles.starInactive} />}
                        onClick={() => !isPrimary && onSetPrimary(record.id)}
                        className={styles.btnNoPadding}
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
                            size="small"
                            icon={<EyeOutlined />}
                            className={styles.viewAction}
                            onClick={() => onView(record)}
                        />
                    </Tooltip>
                    <Tooltip title="Edit">
                        <Button
                            type="text"
                            size="small"
                            icon={<EditOutlined />}
                            className={styles.editAction}
                            onClick={() => onEdit(record)}
                        />
                    </Tooltip>
                    {canDelete && (
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
        <Table
            className={styles.table}
            columns={columns}
            dataSource={data}
            rowKey="id"
            loading={loading}
            scroll={{ x: 1000 }}
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
