'use client';

import React from 'react';
import { Table, Button, Popconfirm, Tooltip, Space, Tag } from 'antd';
import {
    DeleteOutlined,
    EditOutlined,
    EyeOutlined,
    CheckCircleOutlined,
    UserAddOutlined,
} from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import { IPricingRequestDto } from '@/providers/pricingRequestProvider/context';
import {
    PRICING_REQUEST_STATUS_COLORS,
    PRICING_REQUEST_STATUS_LABELS,
    PRIORITY_COLORS,
    PRIORITY_LABELS,
} from '@/constants/pricingRequests';
import { useStyles } from './style/style';

interface PricingRequestsTableProps {
    data: IPricingRequestDto[];
    total: number;
    page: number;
    pageSize: number;
    loading: boolean;
    onPageChange: (page: number, pageSize: number) => void;
    onView: (record: IPricingRequestDto) => void;
    onEdit: (record: IPricingRequestDto) => void;
    onDelete: (id: string) => void;
    onComplete: (record: IPricingRequestDto) => void;
    onAssign: (record: IPricingRequestDto) => void;
}

const PricingRequestsTable: React.FC<PricingRequestsTableProps> = ({
    data,
    total,
    page,
    pageSize,
    loading,
    onPageChange,
    onView,
    onEdit,
    onDelete,
    onComplete,
    onAssign,
}) => {
    const { styles } = useStyles();

    const isOverdue = (record: IPricingRequestDto) =>
        record.status !== 3 && record.requiredByDate &&
        new Date(record.requiredByDate) < new Date();

    const columns: ColumnsType<IPricingRequestDto> = [
        {
            title: 'Request #',
            dataIndex: 'requestNumber',
            key: 'requestNumber',
            width: 140,
            render: (v: string, record) => (
                <Button type="link" style={{ padding: 0 }} onClick={() => onView(record)}>
                    {v || '—'}
                </Button>
            ),
        },
        {
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
            ellipsis: true,
            render: (title: string, record) => (
                <>
                    <div>{title}</div>
                    {isOverdue(record) && (
                        <div className={styles.overdueText}>Overdue</div>
                    )}
                </>
            ),
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            width: 130,
            render: (status: number) => (
                <Tag color={PRICING_REQUEST_STATUS_COLORS[status] ?? 'default'}>
                    {PRICING_REQUEST_STATUS_LABELS[status] ?? '—'}
                </Tag>
            ),
        },
        {
            title: 'Priority',
            dataIndex: 'priority',
            key: 'priority',
            width: 110,
            render: (priority: number) => (
                <Tag color={PRIORITY_COLORS[priority] ?? 'default'}>
                    {PRIORITY_LABELS[priority] ?? '—'}
                </Tag>
            ),
        },
        {
            title: 'Requested By',
            dataIndex: 'requestedByName',
            key: 'requestedByName',
            width: 160,
            ellipsis: true,
            render: (v: string) => v || '—',
        },
        {
            title: 'Assigned To',
            dataIndex: 'assignedToName',
            key: 'assignedToName',
            width: 160,
            ellipsis: true,
            render: (v: string) => v || <span style={{ color: '#94a3b8' }}>Unassigned</span>,
        },
        {
            title: 'Required By',
            dataIndex: 'requiredByDate',
            key: 'requiredByDate',
            width: 120,
            render: (v: string) => v ? new Date(v).toLocaleDateString() : '—',
        },
        {
            title: 'Actions',
            key: 'actions',
            width: 160,
            align: 'center',
            render: (_: unknown, record: IPricingRequestDto) => (
                <Space size={4}>
                    <Tooltip title="View">
                        <Button
                            type="text"
                            size="small"
                            icon={<EyeOutlined />}
                            style={{ color: '#60a5fa' }}
                            onClick={() => onView(record)}
                        />
                    </Tooltip>
                    {record.status !== 3 && (
                        <>
                            <Tooltip title="Edit">
                                <Button
                                    type="text"
                                    size="small"
                                    icon={<EditOutlined />}
                                    style={{ color: '#facc15' }}
                                    onClick={() => onEdit(record)}
                                />
                            </Tooltip>
                            <Tooltip title="Assign">
                                <Button
                                    type="text"
                                    size="small"
                                    icon={<UserAddOutlined />}
                                    style={{ color: '#a78bfa' }}
                                    onClick={() => onAssign(record)}
                                />
                            </Tooltip>
                            <Tooltip title="Complete">
                                <Button
                                    type="text"
                                    size="small"
                                    icon={<CheckCircleOutlined />}
                                    style={{ color: '#22c55e' }}
                                    onClick={() => onComplete(record)}
                                />
                            </Tooltip>
                        </>
                    )}
                    <Popconfirm
                        title="Delete this pricing request?"
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
                                style={{ color: '#f87171' }}
                            />
                        </Tooltip>
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    return (
        <Table<IPricingRequestDto>
            className={styles.table}
            rowKey="id"
            columns={columns}
            dataSource={data}
            loading={loading}
            pagination={{
                current: page,
                pageSize,
                total,
                showSizeChanger: true,
                onChange: onPageChange,
                showTotal: (value, range) => `${range[0]}-${range[1]} of ${value} requests`,
            }}
        />
    );
};

export default PricingRequestsTable;
