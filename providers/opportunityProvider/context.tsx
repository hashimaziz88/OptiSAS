import { createContext } from "react";
import { IPagedResult } from "@/types/api";

export interface IOpportunityDto {
    id: string;
    title: string;
    clientId: string;
    clientName: string;
    contactId: string;
    contactName: string;
    ownerId: string;
    ownerName: string;
    estimatedValue: number;
    currency: string;
    probability: number;
    stage: number;
    stageName: string;
    source: number;
    sourceName: string;
    expectedCloseDate: string;
    actualCloseDate: string;
    description: string;
    lossReason: string;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
    closedAt: string;
}

export interface IOpportunityStageHistoryDto {
    id: string;
    opportunityId: string;
    fromStage: number;
    fromStageName: string;
    toStage: number;
    toStageName: string;
    changedById: string;
    changedByName: string;
    changedAt: string;
    notes: string;
}

export interface IStageMetricsDto {
    stage: number;
    stageName: string;
    count: number;
    totalValue: number;
    weightedValue: number;
}

export interface IPipelineMetricsDto {
    stageMetrics: Record<string, IStageMetricsDto>;
    totalPipelineValue: number;
    weightedPipelineValue: number;
    totalOpportunities: number;
    activeOpportunities: number;
    averageDealSize: number;
    winRate: number;
}

export interface ICreateOpportunityDto {
    title: string;
    clientId: string;
    contactId?: string;
    estimatedValue: number;
    currency?: string;
    stage?: number;
    probability?: number;
    source?: number;
    expectedCloseDate: string;
    description?: string;
}

export interface IUpdateOpportunityDto {
    title?: string;
    contactId?: string;
    estimatedValue?: number;
    currency?: string;
    probability?: number;
    source?: number;
    expectedCloseDate?: string;
    description?: string;
}

export interface IUpdateStageDto {
    stage: number;
    reason?: string;
}

export interface IGetOpportunitiesParams {
    clientId?: string;
    stage?: number;
    ownerId?: string;
    searchTerm?: string;
    pageNumber?: number;
    pageSize?: number;
}

export interface IGetMyOpportunitiesParams {
    stage?: number;
    pageNumber?: number;
    pageSize?: number;
}

export interface IOpportunityStateContext {
    isPending: boolean;
    isError: boolean;
    isSuccess: boolean;
    pagedResult?: IPagedResult<IOpportunityDto> | null;
    currentOpportunity?: IOpportunityDto | null;
    pipelineMetrics?: IPipelineMetricsDto | null;
    stageHistory?: IOpportunityStageHistoryDto[] | null;
}

export interface IOpportunityActionContext {
    getOpportunities: (params?: IGetOpportunitiesParams) => Promise<void>;
    getMyOpportunities: (params?: IGetMyOpportunitiesParams) => Promise<void>;
    getOpportunity: (id: string) => Promise<void>;
    createOpportunity: (payload: ICreateOpportunityDto) => Promise<void>;
    updateOpportunity: (id: string, payload: IUpdateOpportunityDto) => Promise<void>;
    deleteOpportunity: (id: string) => Promise<void>;
    getPipelineMetrics: (ownerId?: string) => Promise<void>;
    getStageHistory: (id: string) => Promise<void>;
    updateStage: (id: string, payload: IUpdateStageDto) => Promise<void>;
    assignOpportunity: (id: string, userId: string) => Promise<void>;
}

export const INITIAL_STATE: IOpportunityStateContext = {
    isPending: false,
    isError: false,
    isSuccess: false,
    pagedResult: null,
    currentOpportunity: null,
    pipelineMetrics: null,
    stageHistory: null,
};

export const OpportunityStateContext = createContext<IOpportunityStateContext>(INITIAL_STATE);
export const OpportunityActionContext = createContext<IOpportunityActionContext>(undefined!);
