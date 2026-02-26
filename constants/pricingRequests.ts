export const PRICING_REQUEST_STATUS_LABELS: Record<number, string> = {
    1: 'Pending',
    2: 'In Progress',
    3: 'Completed',
};

export const PRICING_REQUEST_STATUS_COLORS: Record<number, string> = {
    1: 'orange',
    2: 'blue',
    3: 'green',
};

export const PRICING_REQUEST_STATUS_OPTIONS = [
    { value: 1, label: 'Pending' },
    { value: 2, label: 'In Progress' },
    { value: 3, label: 'Completed' },
];

export const PRIORITY_LABELS: Record<number, string> = {
    1: 'Low',
    2: 'Medium',
    3: 'High',
    4: 'Urgent',
};

export const PRIORITY_COLORS: Record<number, string> = {
    1: 'default',
    2: 'blue',
    3: 'orange',
    4: 'red',
};

export const PRIORITY_OPTIONS = [
    { value: 1, label: 'Low' },
    { value: 2, label: 'Medium' },
    { value: 3, label: 'High' },
    { value: 4, label: 'Urgent' },
];

export const PRICING_REQUESTS_PAGE_SIZE = 10;
