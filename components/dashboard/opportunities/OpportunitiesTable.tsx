'use client';

import React from 'react';
import { Table, Button, Popconfirm, Tooltip, Space, Tag } from 'antd';
import { EditOutlined, MinusCircleOutlined, EyeOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import { IOpportunityDto } from '@/providers/opportunityProvider/context';
import { OPPORTUNITY_STAGE_COLORS } from '@/constants/opportunities';
import { getStageLabel, getSourceLabel, formatCurrency } from '@/utils/dashboard/opportunities';
import { OpportunitiesTableProps } from '@/types/componentProps';
import { useStyles } from './style/style';

const OpportunitiesTable: React.FC<OpportunitiesTableProps> = ({
    data, total, page, pageSize, loading,
    onPageChange, onEdit, onDelete, onView, canDelete,
}) => {
    const { styles, cx } = useStyles();

    const columns: ColumnsType<IOpportunityDto> = [
        {
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
            render: (title: string, record) => (
                <Button
                    type="link"
                    className={styles.opportunityNameLink}
                    onClick={() => onView(record)}
                >
                    {title}
                </Button>
            ),
        },
        {
            title: 'Client',
            dataIndex: 'clientName',
            key: 'clientName',
            render: (v: string) => v || '—',
        },
        {
            title: 'Stage',
            dataIndex: 'stage',
            key: 'stage',
            width: 130,
            render: (stage: number) => (
                <Tag color={OPPORTUNITY_STAGE_COLORS[stage]}>
                    {getStageLabel(stage)}
                </Tag>
            ),
        },
        {
            title: 'Value',
            dataIndex: 'estimatedValue',
            key: 'estimatedValue',
            width: 130,
            render: (v: number, record) => (
                <span className={styles.valueText}>
                    {formatCurrency(v, record.currency)}
                </span>
            ),
        },
        {
            title: 'Probability',
            dataIndex: 'probability',
            key: 'probability',
            width: 100,
            render: (v: number) => (
                <span className={styles.probabilityText}>{v ?? 0}%</span>
            ),
        },
        {
            title: 'Expected Close',
            dataIndex: 'expectedCloseDate',
            key: 'expectedCloseDate',
            width: 130,
            render: (v: string) => v ? new Date(v).toLocaleDateString('en-ZA') : '—',
        },
        {
            title: 'Owner',
            dataIndex: 'ownerName',
            key: 'ownerName',
            render: (v: string) => v || '—',
        },
        {
            title: 'Source',
            dataIndex: 'source',
            key: 'source',
            width: 110,
            render: (v: number) => getSourceLabel(v) || '—',
        },
        {
            title: 'Active',
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
                    {canDelete && record.isActive && (
                        <Popconfirm
                            title="Mark this opportunity as inactive?"
                            description="The opportunity will be deactivated and hidden from active lists."
                            onConfirm={() => onDelete(record.id)}
                            okText="Mark Inactive"
                            okButtonProps={{ danger: true }}
                            cancelText="Cancel"
                        >
                            <Tooltip title="Mark as Inactive">
                                <Button
                                    type="text"
                                    size="small"
                                    icon={<MinusCircleOutlined />}
                                    style={{ color: '#f87171' }}
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
            pagination={{
                current: page,
                pageSize,
                total,
                showSizeChanger: true,
                showTotal: (t) => `${t} opportunities`,
                onChange: onPageChange,
            }}
            scroll={{ x: 1000 }}
        />
    );
};

export default OpportunitiesTable;
