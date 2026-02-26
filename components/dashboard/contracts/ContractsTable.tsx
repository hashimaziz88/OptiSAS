'use client';

import React from 'react';
import { Button, Popconfirm, Space, Table, Tag, Tooltip } from 'antd';
import {
    CheckCircleOutlined,
    DeleteOutlined,
    EditOutlined,
    EyeOutlined,
    RedoOutlined,
    StopOutlined,
    WarningOutlined,
} from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import { IContractDto } from '@/providers/contractProvider/context';
import { CONTRACT_STATUS_COLORS, CONTRACT_STATUS_LABELS } from '@/constants/contracts';
import { useStyles } from './style/style';

interface ContractsTableProps {
    data: IContractDto[];
    total: number;
    page: number;
    pageSize: number;
    loading: boolean;
    onPageChange: (page: number, pageSize: number) => void;
    onView: (record: IContractDto) => void;
    onEdit: (record: IContractDto) => void;
    onDelete: (id: string) => void;
    onActivate: (record: IContractDto) => void;
    onCancel: (record: IContractDto) => void;
    onRenew: (record: IContractDto) => void;
}

const ContractsTable: React.FC<ContractsTableProps> = ({
    data,
    total,
    page,
    pageSize,
    loading,
    onPageChange,
    onView,
    onEdit,
    onDelete,
    onActivate,
    onCancel,
    onRenew,
}) => {
    const { styles } = useStyles();

    const columns: ColumnsType<IContractDto> = [
        {
            title: 'Contract #',
            dataIndex: 'contractNumber',
            key: 'contractNumber',
            width: 150,
            render: (v: string, record) => (
                <Button type="link" style={{ padding: 0 }} onClick={() => onView(record)}>
                    {v}
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
            ellipsis: true,
        },
        {
            title: 'Value',
            dataIndex: 'contractValue',
            key: 'contractValue',
            width: 140,
            render: (v: number) =>
                `ZAR ${(v ?? 0).toLocaleString('en-ZA', { minimumFractionDigits: 2 })}`,
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            width: 160,
            render: (status: number, record) => (
                <Space size={4}>
                    <Tag color={CONTRACT_STATUS_COLORS[status]}>
                        {CONTRACT_STATUS_LABELS[status]}
                    </Tag>
                    {record.isExpiringSoon && (
                        <Tooltip title={`Expires in ${record.daysUntilExpiry} day(s)`}>
                            <WarningOutlined style={{ color: '#facc15' }} />
                        </Tooltip>
                    )}
                </Space>
            ),
        },
        {
            title: 'Start Date',
            dataIndex: 'startDate',
            key: 'startDate',
            width: 110,
            render: (v: string) => v ? new Date(v).toLocaleDateString('en-ZA') : '—',
        },
        {
            title: 'End Date',
            dataIndex: 'endDate',
            key: 'endDate',
            width: 110,
            render: (v: string) => v ? new Date(v).toLocaleDateString('en-ZA') : '—',
        },
        {
            title: 'Actions',
            key: 'actions',
            fixed: 'right',
            width: 180,
            render: (_: unknown, record) => (
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

                    {/* Draft: Edit + Activate + Delete */}
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
                            <Tooltip title="Activate">
                                <Popconfirm
                                    title="Activate this contract?"
                                    onConfirm={() => onActivate(record)}
                                >
                                    <Button
                                        type="text"
                                        size="small"
                                        icon={<CheckCircleOutlined />}
                                        style={{ color: '#22c55e' }}
                                    />
                                </Popconfirm>
                            </Tooltip>
                            <Tooltip title="Delete">
                                <Popconfirm
                                    title="Delete this contract?"
                                    onConfirm={() => onDelete(record.id)}
                                >
                                    <Button
                                        type="text"
                                        size="small"
                                        icon={<DeleteOutlined />}
                                        style={{ color: '#f87171' }}
                                    />
                                </Popconfirm>
                            </Tooltip>
                        </>
                    )}

                    {/* Active: Edit + Renew + Cancel */}
                    {record.status === 2 && (
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
                            <Tooltip title="Create Renewal">
                                <Button
                                    type="text"
                                    size="small"
                                    icon={<RedoOutlined />}
                                    style={{ color: '#a78bfa' }}
                                    onClick={() => onRenew(record)}
                                />
                            </Tooltip>
                            <Tooltip title="Cancel">
                                <Popconfirm
                                    title="Cancel this contract?"
                                    onConfirm={() => onCancel(record)}
                                >
                                    <Button
                                        type="text"
                                        size="small"
                                        icon={<StopOutlined />}
                                        style={{ color: '#f87171' }}
                                    />
                                </Popconfirm>
                            </Tooltip>
                        </>
                    )}

                    {/* Expired: Renew */}
                    {record.status === 3 && (
                        <Tooltip title="Create Renewal">
                            <Button
                                type="text"
                                size="small"
                                icon={<RedoOutlined />}
                                style={{ color: '#a78bfa' }}
                                onClick={() => onRenew(record)}
                            />
                        </Tooltip>
                    )}
                </Space>
            ),
        },
    ];

    return (
        <Table<IContractDto>
            className={styles.table}
            rowKey="id"
            columns={columns}
            dataSource={data}
            loading={loading}
            scroll={{ x: 1100 }}
            pagination={{
                current: page,
                pageSize,
                total,
                showSizeChanger: true,
                onChange: onPageChange,
                style: { marginTop: 16 },
            }}
        />
    );
};

export default ContractsTable;
