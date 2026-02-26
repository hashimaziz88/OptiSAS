export const PROPOSAL_STATUS_LABELS: Record<number, string> = {
    1: 'Draft',
    2: 'Submitted',
    3: 'Rejected',
    4: 'Approved',
};

export const PROPOSAL_STATUS_COLORS: Record<number, string> = {
    1: 'default',
    2: 'blue',
    3: 'red',
    4: 'green',
};

export const PROPOSAL_STATUS_OPTIONS = [
    { value: 1, label: 'Draft' },
    { value: 2, label: 'Submitted' },
    { value: 3, label: 'Rejected' },
    { value: 4, label: 'Approved' },
];

export const PROPOSALS_PAGE_SIZE = 10;
