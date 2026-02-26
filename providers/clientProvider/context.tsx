import { createContext } from "react";
import { IPagedResult } from "@/types/api";

export interface IClientDto {
    id: string;
    name: string;
    industry: string;
    companySize: string;
    website: string;
    billingAddress: string;
    taxNumber: string;
    clientType: number;
    isActive: boolean;
    createdById: string;
    createdByName: string;
    createdAt: string;
    updatedAt: string;
    contactsCount: number;
    opportunitiesCount: number;
    contractsCount: number;
}

export interface IClientStatsDto {
    totalContacts: number;
    totalOpportunities: number;
    totalContracts: number;
    totalContractValue: number;
    activeOpportunities: number;
}

export interface ICreateClientDto {
    name: string;
    industry?: string;
    companySize?: string;
    website?: string;
    billingAddress?: string;
    taxNumber?: string;
    clientType?: number;
}

export interface IUpdateClientDto {
    name?: string;
    industry?: string;
    companySize?: string;
    website?: string;
    billingAddress?: string;
    taxNumber?: string;
    clientType?: number;
    isActive?: boolean;
}

export interface IGetClientsParams {
    pageNumber?: number;
    pageSize?: number;
    searchTerm?: string;
    industry?: string;
    clientType?: number;
    isActive?: boolean;
}

export interface IClientStateContext {
    isPending: boolean;
    isError: boolean;
    isSuccess: boolean;
    pagedResult?: IPagedResult<IClientDto> | null;
    currentClient?: IClientDto | null;
    clientStats?: IClientStatsDto | null;
}

export interface IClientActionContext {
    getClients: (params?: IGetClientsParams) => Promise<void>;
    getClient: (id: string) => Promise<void>;
    getClientStats: (id: string) => Promise<void>;
    createClient: (payload: ICreateClientDto) => Promise<void>;
    updateClient: (id: string, payload: IUpdateClientDto) => Promise<void>;
    deleteClient: (id: string) => Promise<void>;
}

export const INITIAL_STATE: IClientStateContext = {
    isPending: false,
    isError: false,
    isSuccess: false,
    pagedResult: null,
    currentClient: null,
    clientStats: null,
};

export const ClientStateContext = createContext<IClientStateContext>(INITIAL_STATE);
export const ClientActionContext = createContext<IClientActionContext>(undefined!);
