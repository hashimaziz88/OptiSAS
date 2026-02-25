import { createContext } from "react";
import { IPagedResult } from "@/types/api";

export interface IContractDto {
    id: string;
    contractNumber: string;
    clientId: string;
    clientName: string;
    opportunityId: string;
    opportunityTitle: string;
    proposalId: string;
    proposalNumber: string;
    title: string;
    contractValue: number;
    currency: string;
    startDate: string;
    endDate: string;
    status: number;
    statusName: string;
    renewalNoticePeriod: number;
    autoRenew: boolean;
    terms: string;
    ownerId: string;
    ownerName: string;
    createdAt: string;
    updatedAt: string;
    daysUntilExpiry: number;
    isExpiringSoon: boolean;
    renewalsCount: number;
}

export interface IContractRenewalDto {
    id: string;
    contractId: string;
    contractNumber: string;
    renewalOpportunityId: string;
    renewalOpportunityTitle: string;
    notificationSentDate: string;
    renewalDate: string;
    status: number;
    statusName: string;
    notes: string;
    createdAt: string;
    updatedAt: string;
}

export interface ICreateContractDto {
    clientId: string;
    opportunityId?: string;
    proposalId?: string;
    title: string;
    contractValue: number;
    currency?: string;
    startDate: string;
    endDate: string;
    renewalNoticePeriod?: number;
    autoRenew?: boolean;
    terms?: string;
    ownerId: string;
}

export interface IUpdateContractDto {
    title?: string;
    contractValue?: number;
    currency?: string;
    endDate?: string;
    renewalNoticePeriod?: number;
    autoRenew?: boolean;
    terms?: string;
    ownerId?: string;
}

export interface ICreateContractRenewalDto {
    renewalOpportunityId?: string;
    notes?: string;
}

export interface IGetContractsParams {
    clientId?: string;
    status?: number;
    pageNumber?: number;
    pageSize?: number;
}

export interface IContractStateContext {
    isPending: boolean;
    isError: boolean;
    isSuccess: boolean;
    pagedResult?: IPagedResult<IContractDto> | null;
    expiringContracts?: IPagedResult<IContractDto> | null;
    currentContract?: IContractDto | null;
    currentRenewal?: IContractRenewalDto | null;
}

export interface IContractActionContext {
    getContracts: (params?: IGetContractsParams) => Promise<void>;
    getContract: (id: string) => Promise<void>;
    createContract: (payload: ICreateContractDto) => Promise<void>;
    updateContract: (id: string, payload: IUpdateContractDto) => Promise<void>;
    deleteContract: (id: string) => Promise<void>;
    getExpiringContracts: (daysUntilExpiry?: number) => Promise<void>;
    getClientContracts: (clientId: string) => Promise<void>;
    activateContract: (id: string) => Promise<void>;
    cancelContract: (id: string) => Promise<void>;
    createRenewal: (contractId: string, payload: ICreateContractRenewalDto) => Promise<void>;
    completeRenewal: (renewalId: string) => Promise<void>;
}

export const INITIAL_STATE: IContractStateContext = {
    isPending: false,
    isError: false,
    isSuccess: false,
    pagedResult: null,
    expiringContracts: null,
    currentContract: null,
    currentRenewal: null,
};

export const ContractStateContext = createContext<IContractStateContext>(INITIAL_STATE);
export const ContractActionContext = createContext<IContractActionContext>(undefined!);
