import { createContext } from "react";
import { IPagedResult } from "@/types/api";

export interface IProposalLineItemDto {
    id: string;
    proposalId: string;
    productServiceName: string;
    description: string;
    quantity: number;
    unitPrice: number;
    discount: number;
    taxRate: number;
    totalPrice: number;
    sortOrder: number;
}

export interface IProposalDto {
    id: string;
    proposalNumber: string;
    opportunityId: string;
    opportunityTitle: string;
    clientId: string;
    clientName: string;
    title: string;
    description: string;
    status: number;
    statusName: string;
    totalAmount: number;
    currency: string;
    validUntil: string;
    submittedDate: string;
    approvedDate: string;
    createdById: string;
    createdByName: string;
    createdAt: string;
    updatedAt: string;
    lineItemsCount: number;
}

export interface IProposalWithLineItemsDto extends IProposalDto {
    lineItems: IProposalLineItemDto[];
}

export interface ICreateProposalLineItemDto {
    productServiceName?: string;
    description?: string;
    quantity: number;
    unitPrice: number;
    discount?: number;
    taxRate?: number;
}

export interface ICreateProposalDto {
    opportunityId: string;
    title: string;
    description?: string;
    currency?: string;
    validUntil?: string;
    lineItems?: ICreateProposalLineItemDto[];
}

export interface IUpdateProposalDto {
    title?: string;
    description?: string;
    currency?: string;
    validUntil?: string;
}

export interface IGetProposalsParams {
    clientId?: string;
    status?: number;
    pageNumber?: number;
    pageSize?: number;
}

export interface IProposalStateContext {
    isPending: boolean;
    isError: boolean;
    isSuccess: boolean;
    pagedResult?: IPagedResult<IProposalDto> | null;
    currentProposal?: IProposalWithLineItemsDto | null;
}

export interface IProposalActionContext {
    getProposals: (params?: IGetProposalsParams) => Promise<void>;
    getProposal: (id: string) => Promise<void>;
    createProposal: (payload: ICreateProposalDto) => Promise<void>;
    updateProposal: (id: string, payload: IUpdateProposalDto) => Promise<void>;
    deleteProposal: (id: string) => Promise<void>;
    addLineItem: (proposalId: string, payload: ICreateProposalLineItemDto) => Promise<void>;
    updateLineItem: (proposalId: string, lineItemId: string, payload: ICreateProposalLineItemDto) => Promise<void>;
    deleteLineItem: (proposalId: string, lineItemId: string) => Promise<void>;
    submitProposal: (id: string) => Promise<void>;
    approveProposal: (id: string) => Promise<void>;
    rejectProposal: (id: string) => Promise<void>;
}

export const INITIAL_STATE: IProposalStateContext = {
    isPending: false,
    isError: false,
    isSuccess: false,
    pagedResult: null,
    currentProposal: null,
};

export const ProposalStateContext = createContext<IProposalStateContext>(INITIAL_STATE);
export const ProposalActionContext = createContext<IProposalActionContext>(undefined!);
