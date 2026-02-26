import { IGetContactsParams } from '@/providers/contactProvider/context';

export const buildContactsParams = (
    page: number,
    pageSize: number,
    filters: { searchTerm?: string; clientId?: string }
): IGetContactsParams => ({
    pageNumber: page,
    pageSize,
    ...(filters.searchTerm ? { searchTerm: filters.searchTerm } : {}),
    ...(filters.clientId ? { clientId: filters.clientId } : {}),
});
