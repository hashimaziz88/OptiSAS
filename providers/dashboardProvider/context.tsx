import { createContext } from "react";
import { IContractDto } from "@/providers/contractProvider/context";

export interface IOpportunitiesSummaryDto {
    totalCount: number;
    wonCount: number;
    winRate: number;
    pipelineValue: number;
    weightedPipelineValue: number;
}

export interface IPipelineStageSummaryDto {
    stageName: string;
    count: number;
    value: number;
}

export interface IPipelineSummaryDto {
    stages: IPipelineStageSummaryDto[];
    weightedPipelineValue: number;
}

export interface IActivitiesDashboardSummaryDto {
    upcomingCount: number;
    overdueCount: number;
    completedTodayCount: number;
}

export interface IContractsDashboardSummaryDto {
    totalActiveCount: number;
    expiringThisMonthCount: number;
    totalContractValue: number;
}

export interface IRevenueMonthDto {
    month: string;
    value: number;
}

export interface IRevenueSummaryDto {
    thisMonth: number;
    thisQuarter: number;
    thisYear: number;
    monthlyTrend: IRevenueMonthDto[];
}

export interface IDashboardOverviewDto {
    opportunities: IOpportunitiesSummaryDto;
    pipeline: IPipelineSummaryDto;
    activities: IActivitiesDashboardSummaryDto;
    contracts: IContractsDashboardSummaryDto;
    revenue: IRevenueSummaryDto;
}

export interface ISalesPerformanceDto {
    userId: string;
    userName: string;
    dealsWon: number;
    totalValue: number;
    winRate: number;
    activitiesCompleted: number;
}

export interface IActivitiesSummaryDto {
    byType: Record<string, number>;
    byStatus: Record<string, number>;
}

export interface IPipelineMetricsDashboardDto {
    stages: IPipelineStageSummaryDto[];
    totalValue: number;
    weightedValue: number;
}

export interface IDashboardStateContext {
    isPending: boolean;
    isError: boolean;
    isSuccess: boolean;
    overview?: IDashboardOverviewDto | null;
    pipelineMetrics?: IPipelineMetricsDashboardDto | null;
    salesPerformance?: ISalesPerformanceDto[] | null;
    activitiesSummary?: IActivitiesSummaryDto | null;
    contractsExpiring?: IContractDto[] | null;
}

export interface IDashboardActionContext {
    getDashboardOverview: () => Promise<void>;
    getDashboardPipelineMetrics: () => Promise<void>;
    getSalesPerformance: (topCount?: number) => Promise<void>;
    getActivitiesSummary: () => Promise<void>;
    getContractsExpiring: (days?: number) => Promise<void>;
}

export const INITIAL_STATE: IDashboardStateContext = {
    isPending: false,
    isError: false,
    isSuccess: false,
    overview: null,
    pipelineMetrics: null,
    salesPerformance: null,
    activitiesSummary: null,
    contractsExpiring: null,
};

export const DashboardStateContext = createContext<IDashboardStateContext>(INITIAL_STATE);
export const DashboardActionContext = createContext<IDashboardActionContext>(undefined!);
