import { IGetOpportunitiesParams } from '@/providers/opportunityProvider/context';
import { OPPORTUNITY_STAGE_LABELS, OPPORTUNITY_SOURCE_LABELS } from '@/constants/opportunities';

export const getStageLabel = (stage: number): string => OPPORTUNITY_STAGE_LABELS[stage] ?? 'Unknown';
export const getSourceLabel = (source: number): string => OPPORTUNITY_SOURCE_LABELS[source] ?? 'Unknown';

export const formatCurrency = (value: number, currency = 'ZAR'): string =>
    new Intl.NumberFormat('en-ZA', { style: 'currency', currency, minimumFractionDigits: 0 }).format(value);

export const buildOpportunitiesParams = (
    page: number,
    pageSize: number,
    filters: { searchTerm?: string; stage?: number; clientId?: string }
): IGetOpportunitiesParams => ({
    pageNumber: page,
    pageSize,
    ...(filters.searchTerm ? { searchTerm: filters.searchTerm } : {}),
    ...(filters.stage !== undefined ? { stage: filters.stage } : {}),
    ...(filters.clientId ? { clientId: filters.clientId } : {}),
});
