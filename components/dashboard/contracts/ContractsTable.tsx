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
    canDelete?: boolean;
    canActivateCancel?: boolean;
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
    canDelete,
    canActivateCancel,
}) => {
    const { styles } = useStyles();

    const columns: ColumnsType<IContractDto> = [
        {
            title: 'Contract #',
            dataIndex: 'contractNumber',
            key: 'contractNumber',
            width: 150,
            render: (v: string, record) => (
                <Button type="link" className={styles.btnNoPadding} onClick={() => onView(record)}>
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
                            <WarningOutlined className={styles.warningIcon} />
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
            width: 180,
            render: (_: unknown, record) => (
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

                    {/* Draft: Edit + Activate + Delete */}
                    {record.status === 1 && (
                        <>
                            <Tooltip title="Edit">
                                <Button
                                    type="text"
                                    size="small"
                                    icon={<EditOutlined />}
                                    className={styles.editAction}
                                    onClick={() => onEdit(record)}
                                />
                            </Tooltip>
                            {canActivateCancel && (
                                <Tooltip title="Activate">
                                    <Popconfirm
                                        title="Activate this contract?"
                                        onConfirm={() => onActivate(record)}
                                    >
                                        <Button
                                            type="text"
                                            size="small"
                                            icon={<CheckCircleOutlined />}
                                            className={styles.activateAction}
                                        />
                                    </Popconfirm>
                                </Tooltip>
                            )}
                            {canDelete && (
                                <Tooltip title="Delete">
                                    <Popconfirm
                                        title="Delete this contract?"
                                        onConfirm={() => onDelete(record.id)}
                                    >
                                        <Button
                                            type="text"
                                            size="small"
                                            icon={<DeleteOutlined />}
                                            className={styles.deleteAction}
                                        />
                                    </Popconfirm>
                                </Tooltip>
                            )}
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
                                    className={styles.editAction}
                                    onClick={() => onEdit(record)}
                                />
                            </Tooltip>
                            <Tooltip title="Create Renewal">
                                <Button
                                    type="text"
                                    size="small"
                                    icon={<RedoOutlined />}
                                    className={styles.renewAction}
                                    onClick={() => onRenew(record)}
                                />
                            </Tooltip>
                            {canActivateCancel && (
                                <Tooltip title="Cancel">
                                    <Popconfirm
                                        title="Cancel this contract?"
                                        onConfirm={() => onCancel(record)}
                                    >
                                        <Button
                                            type="text"
                                            size="small"
                                            icon={<StopOutlined />}
                                            className={styles.cancelAction}
                                        />
                                    </Popconfirm>
                                </Tooltip>
                            )}
                        </>
                    )}

                    {/* Expired: Renew */}
                    {record.status === 3 && (
                        <Tooltip title="Create Renewal">
                            <Button
                                type="text"
                                size="small"
                                icon={<RedoOutlined />}
                                className={styles.renewAction}
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
