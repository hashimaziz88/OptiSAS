import { IGetClientsParams } from '@/providers/clientProvider/context';
import { CLIENT_TYPE_LABELS } from '@/constants/clients';

export const getClientTypeLabel = (type: number): string =>
    CLIENT_TYPE_LABELS[type] ?? 'Unknown';

export const buildClientsParams = (
    page: number,
    pageSize: number,
    filters: { searchTerm?: string; industry?: string; clientType?: number; isActive?: boolean }
): IGetClientsParams => ({
    pageNumber: page,
    pageSize,
    ...(filters.searchTerm ? { searchTerm: filters.searchTerm } : {}),
    ...(filters.industry ? { industry: filters.industry } : {}),
    ...(filters.clientType !== undefined ? { clientType: filters.clientType } : {}),
    ...(filters.isActive !== undefined ? { isActive: filters.isActive } : {}),
});
