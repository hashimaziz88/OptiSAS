export const CLIENT_TYPE_LABELS: Record<number, string> = {
    1: 'Government',
    2: 'Private',
    3: 'Partner',
};

export const CLIENT_TYPE_OPTIONS = [
    { value: 1, label: 'Government' },
    { value: 2, label: 'Private' },
    { value: 3, label: 'Partner' },
];

export const INDUSTRY_OPTIONS = [
    { value: 'Technology', label: 'Technology' },
    { value: 'Finance', label: 'Finance' },
    { value: 'Healthcare', label: 'Healthcare' },
    { value: 'Manufacturing', label: 'Manufacturing' },
    { value: 'Retail', label: 'Retail' },
    { value: 'Education', label: 'Education' },
    { value: 'Government', label: 'Government' },
    { value: 'Other', label: 'Other' },
];

export const COMPANY_SIZE_OPTIONS = [
    { value: '1-10', label: '1–10 employees' },
    { value: '11-50', label: '11–50 employees' },
    { value: '51-200', label: '51–200 employees' },
    { value: '201-500', label: '201–500 employees' },
    { value: '500+', label: '500+ employees' },
];

export const CLIENTS_PAGE_SIZE = 10;
