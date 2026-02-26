'use client';

import React from 'react';
import { Table, Button, Popconfirm, Tooltip, Space, Tag } from 'antd';
import {
    EditOutlined,
    DeleteOutlined,
    EyeOutlined,
    CheckCircleOutlined,
    StopOutlined,
} from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import { IActivityDto } from '@/providers/activityProvider/context';
import {
    ACTIVITY_TYPE_LABELS,
    ACTIVITY_TYPE_COLORS,
    ACTIVITY_STATUS_LABELS,
    ACTIVITY_STATUS_COLORS,
} from '@/constants/activities';
import { useStyles } from './style/style';

const PRIORITY_LABELS: Record<number, string> = { 1: 'Low', 2: 'Medium', 3: 'High', 4: 'Urgent' };
const PRIORITY_COLORS: Record<number, string> = { 1: 'default', 2: 'blue', 3: 'orange', 4: 'red' };

interface ActivitiesTableProps {
    data: IActivityDto[];
    total: number;
    page: number;
    pageSize: number;
    loading: boolean;
    onPageChange: (page: number, pageSize: number) => void;
    onEdit: (activity: IActivityDto) => void;
    onDelete: (id: string) => void;
    onView: (activity: IActivityDto) => void;
    onComplete: (activity: IActivityDto) => void;
    onCancel: (id: string) => void;
}

const ActivitiesTable: React.FC<ActivitiesTableProps> = ({
    data, total, page, pageSize, loading,
    onPageChange, onEdit, onDelete, onView, onComplete, onCancel,
}) => {
    const { styles } = useStyles();

    const columns: ColumnsType<IActivityDto> = [
        {
            title: 'Subject',
            dataIndex: 'subject',
            key: 'subject',
            ellipsis: true,
            render: (subject: string, record) => (
                <Button
                    type="link"
                    style={{ padding: 0, color: '#60a5fa', fontWeight: 600 }}
                    onClick={() => onView(record)}
                >
                    {record.isOverdue && <span className={styles.overdueBadge} />}
                    {subject}
                </Button>
            ),
        },
        {
            title: 'Type',
            dataIndex: 'type',
            key: 'type',
            width: 130,
            render: (type: number) => (
                <Tag color={ACTIVITY_TYPE_COLORS[type]}>{ACTIVITY_TYPE_LABELS[type] ?? type}</Tag>
            ),
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            width: 110,
            render: (status: number) => (
                <Tag color={ACTIVITY_STATUS_COLORS[status]}>{ACTIVITY_STATUS_LABELS[status] ?? status}</Tag>
            ),
        },
        {
            title: 'Priority',
            dataIndex: 'priority',
            key: 'priority',
            width: 100,
            render: (priority: number) => (
                <Tag color={PRIORITY_COLORS[priority]}>{PRIORITY_LABELS[priority] ?? '—'}</Tag>
            ),
        },
        {
            title: 'Assigned To',
            dataIndex: 'assignedToName',
            key: 'assignedToName',
            ellipsis: true,
            render: (v: string) => v || '—',
        },
        {
            title: 'Due Date',
            dataIndex: 'dueDate',
            key: 'dueDate',
            width: 120,
            render: (v: string) => v ? new Date(v).toLocaleDateString() : '—',
        },
        {
            title: 'Related To',
            dataIndex: 'relatedToTitle',
            key: 'relatedToTitle',
            ellipsis: true,
            render: (v: string) => v || '—',
        },
        {
            title: 'Actions',
            key: 'actions',
            width: 160,
            align: 'center',
            render: (_: unknown, record: IActivityDto) => (
                <Space size={4}>
                    <Tooltip title="View">
                        <Button
                            type="text"
                            icon={<EyeOutlined />}
                            size="small"
                            style={{ color: '#60a5fa' }}
                            onClick={() => onView(record)}
                        />
                    </Tooltip>
                    {record.status === 1 && (
                        <>
                            <Tooltip title="Edit">
                                <Button
                                    type="text"
                                    icon={<EditOutlined />}
                                    size="small"
                                    style={{ color: '#facc15' }}
                                    onClick={() => onEdit(record)}
                                />
                            </Tooltip>
                            <Tooltip title="Complete">
                                <Button
                                    type="text"
                                    icon={<CheckCircleOutlined />}
                                    size="small"
                                    style={{ color: '#22c55e' }}
                                    onClick={() => onComplete(record)}
                                />
                            </Tooltip>
                            <Popconfirm
                                title="Cancel this activity?"
                                onConfirm={() => onCancel(record.id)}
                                okText="Yes"
                                cancelText="No"
                            >
                                <Tooltip title="Cancel">
                                    <Button
                                        type="text"
                                        icon={<StopOutlined />}
                                        size="small"
                                        style={{ color: '#f59e0b' }}
                                    />
                                </Tooltip>
                            </Popconfirm>
                        </>
                    )}
                    <Popconfirm
                        title="Delete this activity?"
                        description="This action cannot be undone."
                        onConfirm={() => onDelete(record.id)}
                        okText="Delete"
                        cancelText="No"
                        okButtonProps={{ danger: true }}
                    >
                        <Tooltip title="Delete">
                            <Button
                                type="text"
                                icon={<DeleteOutlined />}
                                size="small"
                                style={{ color: '#f87171' }}
                            />
                        </Tooltip>
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    return (
        <Table<IActivityDto>
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
                showTotal: (t, range) => `${range[0]}-${range[1]} of ${t} activities`,
                onChange: onPageChange,
            }}
        />
    );
};

export default ActivitiesTable;
