'use client';

import React from 'react';
import { Button, Popconfirm, Table, Tag } from 'antd';
import { CheckCircleOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import { IContractRenewalDto } from '@/providers/contractProvider/context';
import { RENEWAL_STATUS_COLORS } from '@/constants/contracts';
import { ContractRenewalsTableProps } from '@/types/componentProps';
import { useStyles } from './style/style';

const ContractRenewalsTable: React.FC<ContractRenewalsTableProps> = ({
    renewals,
    loading,
    canComplete,
    onComplete,
}) => {
    const { styles } = useStyles();

    const columns: ColumnsType<IContractRenewalDto> = [
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            width: 110,
            render: (status: number, record) => (
                <Tag color={RENEWAL_STATUS_COLORS[status] ?? 'default'}>
                    {record.statusName}
                </Tag>
            ),
        },
        {
            title: 'Renewal Date',
            dataIndex: 'renewalDate',
            key: 'renewalDate',
            width: 120,
            render: (v: string) => v ? new Date(v).toLocaleDateString('en-ZA') : '—',
        },

        {
            title: 'Created',
            dataIndex: 'createdAt',
            key: 'createdAt',
            width: 110,
            render: (v: string) => v ? new Date(v).toLocaleDateString('en-ZA') : '—',
        },
        ...(canComplete
            ? [
                {
                    title: '',
                    key: 'actions',
                    width: 110,
                    render: (_: unknown, record: IContractRenewalDto) =>
                        record.status === 1 ? (
                            <Popconfirm
                                title="Complete this renewal?"
                                description="The contract will be marked as Renewed."
                                onConfirm={() => onComplete(record.id)}
                            >
                                <Button
                                    type="primary"
                                    size="small"
                                    icon={<CheckCircleOutlined />}
                                    className={styles.completeRenewalBtn}
                                >
                                    Complete
                                </Button>
                            </Popconfirm>
                        ) : null,
                },
            ]
            : []),
    ];

    return (
        <Table<IContractRenewalDto>
            className={styles.renewalsTable}
            rowKey="id"
            columns={columns}
            dataSource={renewals}
            loading={loading}
            pagination={false}
            size="small"
        />
    );
};

export default ContractRenewalsTable;
