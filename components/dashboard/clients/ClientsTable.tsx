'use client';

import React from 'react';
import { Table, Button, Popconfirm, Tooltip, Space } from 'antd';
import { EditOutlined, DeleteOutlined, EyeOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import { IClientDto } from '@/providers/clientProvider/context';
import { getClientTypeLabel } from '@/utils/dashboard/clients';
import { useStyles } from './style/style';

interface ClientsTableProps {
    data: IClientDto[];
    total: number;
    page: number;
    pageSize: number;
    loading: boolean;
    onPageChange: (page: number, pageSize: number) => void;
    onEdit: (client: IClientDto) => void;
    onDelete: (id: string) => void;
    onView: (client: IClientDto) => void;
    canDelete?: boolean;
}

const ClientsTable: React.FC<ClientsTableProps> = ({
    data, total, page, pageSize, loading,
    onPageChange, onEdit, onDelete, onView, canDelete,
}) => {
    const { styles, cx } = useStyles();

    const columns: ColumnsType<IClientDto> = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: (name: string, record) => (
                <Button type="link" className={styles.clientNameLink} onClick={() => onView(record)}>
                    {name}
                </Button>
            ),
        },
        {
            title: 'Type',
            dataIndex: 'clientType',
            key: 'clientType',
            render: (type: number) => getClientTypeLabel(type),
            width: 120,
        },
        {
            title: 'Industry',
            dataIndex: 'industry',
            key: 'industry',
            render: (v: string) => v || '—',
        },
        {
            title: 'Company Size',
            dataIndex: 'companySize',
            key: 'companySize',
            render: (v: string) => v || '—',
            width: 140,
        },
        {
            title: 'Status',
            dataIndex: 'isActive',
            key: 'isActive',
            width: 100,
            render: (active: boolean) => (
                <span className={cx(styles.statusBadge, active ? styles.activeBadge : styles.inactiveBadge)}>
                    {active ? 'Active' : 'Inactive'}
                </span>
            ),
        },
        {
            title: 'Contacts',
            dataIndex: 'contactsCount',
            key: 'contactsCount',
            width: 90,
            align: 'center',
        },
        {
            title: 'Opportunities',
            dataIndex: 'opportunitiesCount',
            key: 'opportunitiesCount',
            width: 120,
            align: 'center',
        },
        {
            title: 'Actions',
            key: 'actions',
            width: 120,
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
                        <Tooltip title="Delete">
                            <Popconfirm
                                title="Delete this client?"
                                description="This action cannot be undone."
                                onConfirm={() => onDelete(record.id)}
                                okText="Delete"
                                cancelText="Cancel"
                                okButtonProps={{ danger: true }}
                            >
                                <Button type="text" size="small" icon={<DeleteOutlined />} className={styles.deleteAction} />
                            </Popconfirm>
                        </Tooltip>
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
            pagination={{
                current: page,
                pageSize,
                total,
                showSizeChanger: true,
                showTotal: (t) => `${t} clients`,
                onChange: onPageChange,
            }}
            scroll={{ x: 800 }}
        />
    );
};

export default ClientsTable;
