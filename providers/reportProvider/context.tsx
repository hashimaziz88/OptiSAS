import { createContext } from "react";

export interface IGetOpportunitiesReportParams {
    startDate?: string;
    endDate?: string;
    stage?: number;
    ownerId?: string;
}

export interface IGetSalesByPeriodParams {
    startDate?: string;
    endDate?: string;
    groupBy?: "month" | "week";
}

export interface IOpportunityReportItemDto {
    id: string;
    title: string;
    clientName: string;
    ownerName: string;
    stage: number;
    stageName: string;
    estimatedValue: number;
    currency: string;
    expectedCloseDate: string;
    createdAt: string;
}

export interface ISalesByPeriodItemDto {
    period: string;
    dealsWon: number;
    totalValue: number;
    averageDealSize: number;
}

export interface IReportStateContext {
    isPending: boolean;
    isError: boolean;
    isSuccess: boolean;
    opportunitiesReport?: IOpportunityReportItemDto[] | null;
    salesByPeriodReport?: ISalesByPeriodItemDto[] | null;
}

export interface IReportActionContext {
    getOpportunitiesReport: (params?: IGetOpportunitiesReportParams) => Promise<void>;
    getSalesByPeriodReport: (params?: IGetSalesByPeriodParams) => Promise<void>;
}

export const INITIAL_STATE: IReportStateContext = {
    isPending: false,
    isError: false,
    isSuccess: false,
    opportunitiesReport: null,
    salesByPeriodReport: null,
};

export const ReportStateContext = createContext<IReportStateContext>(INITIAL_STATE);
export const ReportActionContext = createContext<IReportActionContext>(undefined!);
