'use client';

import React from 'react';
import { Button, Popconfirm, Space, Table, Tag, Tooltip } from 'antd';
import {
    CheckOutlined,
    CloseOutlined,
    DeleteOutlined,
    EditOutlined,
    EyeOutlined,
    SendOutlined,
} from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import { IProposalDto } from '@/providers/proposalProvider/context';
import { PROPOSAL_STATUS_COLORS, PROPOSAL_STATUS_LABELS } from '@/constants/proposals';
import { ProposalsTableProps } from '@/types/componentProps';
import { useStyles } from './style/style';

const ProposalsTable: React.FC<ProposalsTableProps> = ({
    data,
    total,
    page,
    pageSize,
    loading,
    onPageChange,
    onView,
    onEdit,
    onDelete,
    onSubmit,
    onApprove,
    onReject,
    canDelete,
    canApproveReject,
}) => {
    const { styles } = useStyles();

    const columns: ColumnsType<IProposalDto> = [
        {
            title: 'Proposal #',
            dataIndex: 'proposalNumber',
            key: 'proposalNumber',
            width: 150,
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
        },
        {
            title: 'Client',
            dataIndex: 'clientName',
            key: 'clientName',
            width: 160,
            ellipsis: true,
            render: (v: string) => v || '—',
        },
        {
            title: 'Opportunity',
            dataIndex: 'opportunityTitle',
            key: 'opportunityTitle',
            width: 180,
            ellipsis: true,
            render: (v: string) => v || '—',
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            width: 120,
            render: (status: number) => (
                <Tag color={PROPOSAL_STATUS_COLORS[status] ?? 'default'}>
                    {PROPOSAL_STATUS_LABELS[status] ?? '—'}
                </Tag>
            ),
        },
        {
            title: 'Total',
            dataIndex: 'totalAmount',
            key: 'totalAmount',
            width: 120,
            render: (v: number, record) =>
                `ZAR ${(v ?? 0).toLocaleString('en-ZA', { minimumFractionDigits: 2 })}`,
        },
        {
            title: 'Valid Until',
            dataIndex: 'validUntil',
            key: 'validUntil',
            width: 120,
            render: (v: string) => (v ? new Date(v).toLocaleDateString() : '—'),
        },
        {
            title: 'Actions',
            key: 'actions',
            width: 200,
            align: 'center',
            render: (_: unknown, record: IProposalDto) => (
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
                    {record.status === 1 && (
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
                            <Tooltip title="Submit">
                                <Button
                                    type="text"
                                    size="small"
                                    icon={<SendOutlined />}
                                    style={{ color: '#a78bfa' }}
                                    onClick={() => onSubmit(record)}
                                />
                            </Tooltip>
                            {canDelete && (
                                <Popconfirm
                                    title="Delete this proposal?"
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
                            )}
                        </>
                    )}
                    {canApproveReject && record.status === 2 && (
                        <>
                            <Tooltip title="Approve">
                                <Button
                                    type="text"
                                    size="small"
                                    icon={<CheckOutlined />}
                                    style={{ color: '#22c55e' }}
                                    onClick={() => onApprove(record)}
                                />
                            </Tooltip>
                            <Tooltip title="Reject">
                                <Button
                                    type="text"
                                    size="small"
                                    icon={<CloseOutlined />}
                                    style={{ color: '#f87171' }}
                                    onClick={() => onReject(record)}
                                />
                            </Tooltip>
                        </>
                    )}
                </Space>
            ),
        },
    ];

    return (
        <Table<IProposalDto>
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
                showTotal: (value, range) => `${range[0]}-${range[1]} of ${value} proposals`,
            }}
        />
    );
};

export default ProposalsTable;
