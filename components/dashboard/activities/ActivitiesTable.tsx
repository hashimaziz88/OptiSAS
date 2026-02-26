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
    PRIORITY_LABELS,
    PRIORITY_COLORS,
} from '@/constants/activities';
import { useStyles } from './style/style';

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
    canDelete?: boolean;
}

const ActivitiesTable: React.FC<ActivitiesTableProps> = ({
    data, total, page, pageSize, loading,
    onPageChange, onEdit, onDelete, onView, onComplete, onCancel, canDelete,
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
                    className={styles.subjectLink}
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
                            className={styles.viewAction}
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
                                    className={styles.editAction}
                                    onClick={() => onEdit(record)}
                                />
                            </Tooltip>
                            <Tooltip title="Complete">
                                <Button
                                    type="text"
                                    icon={<CheckCircleOutlined />}
                                    size="small"
                                    className={styles.completeAction}
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
                                        className={styles.cancelAction}
                                    />
                                </Tooltip>
                            </Popconfirm>
                        </>
                    )}
                    {canDelete && (
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
