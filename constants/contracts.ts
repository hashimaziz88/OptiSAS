export const CONTRACT_STATUS_LABELS: Record<number, string> = {
    1: 'Draft',
    2: 'Active',
    3: 'Expired',
    4: 'Renewed',
    5: 'Cancelled',
};

export const CONTRACT_STATUS_COLORS: Record<number, string> = {
    1: 'default',
    2: 'green',
    3: 'red',
    4: 'blue',
    5: 'volcano',
};

export const CONTRACT_STATUS_OPTIONS = [
    { value: 1, label: 'Draft' },
    { value: 2, label: 'Active' },
    { value: 3, label: 'Expired' },
    { value: 4, label: 'Renewed' },
    { value: 5, label: 'Cancelled' },
];

export const CONTRACTS_PAGE_SIZE = 10;
