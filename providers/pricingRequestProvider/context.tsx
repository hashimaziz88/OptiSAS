import { createContext } from "react";
import { IPagedResult } from "@/types/api";

export interface IPricingRequestDto {
    id: string;
    opportunityId: string;
    opportunityTitle: string;
    requestNumber: string;
    title: string;
    description: string;
    requestedById: string;
    requestedByName: string;
    assignedToId: string;
    assignedToName: string;
    status: number;
    statusName: string;
    priority: number;
    priorityName: string;
    requestedDate: string;
    requiredByDate: string;
    completedDate: string;
    createdAt: string;
    updatedAt: string;
}

export interface ICreatePricingRequestDto {
    title: string;
    description?: string;
    clientId?: string;
    opportunityId?: string;
    requestedById?: string;
    priority?: number;
    requiredByDate?: string;
}

export interface IUpdatePricingRequestDto {
    title?: string;
    description?: string;
    priority?: number;
    requiredByDate?: string;
}

export interface IGetPricingRequestsParams {
    status?: number;
    priority?: number;
    assignedToId?: string;
    pageNumber?: number;
    pageSize?: number;
}

export interface IPricingRequestStateContext {
    isPending: boolean;
    isError: boolean;
    isSuccess: boolean;
    pagedResult?: IPagedResult<IPricingRequestDto> | null;
    pendingRequests?: IPagedResult<IPricingRequestDto> | null;
    myRequests?: IPagedResult<IPricingRequestDto> | null;
    currentRequest?: IPricingRequestDto | null;
}

export interface IPricingRequestActionContext {
    getPricingRequests: (params?: IGetPricingRequestsParams) => Promise<void>;
    getPendingPricingRequests: () => Promise<void>;
    getMyPricingRequests: () => Promise<void>;
    getPricingRequest: (id: string) => Promise<void>;
    createPricingRequest: (payload: ICreatePricingRequestDto) => Promise<void>;
    updatePricingRequest: (id: string, payload: IUpdatePricingRequestDto) => Promise<void>;
    deletePricingRequest: (id: string) => Promise<void>;
    assignPricingRequest: (id: string, userId: string) => Promise<void>;
    completePricingRequest: (id: string) => Promise<void>;
}

export const INITIAL_STATE: IPricingRequestStateContext = {
    isPending: false,
    isError: false,
    isSuccess: false,
    pagedResult: null,
    pendingRequests: null,
    myRequests: null,
    currentRequest: null,
};

export const PricingRequestStateContext = createContext<IPricingRequestStateContext>(INITIAL_STATE);
export const PricingRequestActionContext = createContext<IPricingRequestActionContext>(undefined!);
