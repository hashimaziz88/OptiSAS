'use client';

import React, { useEffect } from 'react';
import { Select } from 'antd';
import { useClientActions, useClientState } from '@/providers/clientProvider';
import { ClientSelectFilterProps } from '@/types/componentProps';

const ClientSelectFilter: React.FC<ClientSelectFilterProps> = ({
    value,
    onChange,
    className,
    size = 'large',
    placeholder = 'All Clients',
}) => {
    const { getClients } = useClientActions();
    const { pagedResult } = useClientState();

    useEffect(() => {
        getClients({ pageNumber: 1, pageSize: 200 });
    }, [getClients]);

    const options = (pagedResult?.items ?? []).map((c) => ({ label: c.name, value: c.id }));

    return (
        <Select
            className={className}
            placeholder={placeholder}
            allowClear
            showSearch
            optionFilterProp="label"
            options={options}
            value={value}
            onChange={onChange}
            size={size}
        />
    );
};

export default ClientSelectFilter;
