import { createAction } from "redux-actions";
import { IDashboardStateContext, IDashboardOverviewDto, IPipelineMetricsDashboardDto, ISalesPerformanceDto, IActivitiesSummaryDto } from "./context";
import { IContractDto } from "@/providers/contractProvider/context";

export enum DashboardActionEnums {
    getDashboardOverviewPending = "GET_DASHBOARD_OVERVIEW_PENDING",
    getDashboardOverviewSuccess = "GET_DASHBOARD_OVERVIEW_SUCCESS",
    getDashboardOverviewError = "GET_DASHBOARD_OVERVIEW_ERROR",

    getDashboardPipelineMetricsPending = "GET_DASHBOARD_PIPELINE_METRICS_PENDING",
    getDashboardPipelineMetricsSuccess = "GET_DASHBOARD_PIPELINE_METRICS_SUCCESS",
    getDashboardPipelineMetricsError = "GET_DASHBOARD_PIPELINE_METRICS_ERROR",

    getSalesPerformancePending = "GET_SALES_PERFORMANCE_PENDING",
    getSalesPerformanceSuccess = "GET_SALES_PERFORMANCE_SUCCESS",
    getSalesPerformanceError = "GET_SALES_PERFORMANCE_ERROR",

    getActivitiesSummaryPending = "GET_ACTIVITIES_SUMMARY_PENDING",
    getActivitiesSummarySuccess = "GET_ACTIVITIES_SUMMARY_SUCCESS",
    getActivitiesSummaryError = "GET_ACTIVITIES_SUMMARY_ERROR",

    getContractsExpiringPending = "GET_CONTRACTS_EXPIRING_PENDING",
    getContractsExpiringSuccess = "GET_CONTRACTS_EXPIRING_SUCCESS",
    getContractsExpiringError = "GET_CONTRACTS_EXPIRING_ERROR",
}

export const getDashboardOverviewPending = createAction<IDashboardStateContext>(DashboardActionEnums.getDashboardOverviewPending, () => ({ isPending: true, isError: false, isSuccess: false }));
export const getDashboardOverviewSuccess = createAction<IDashboardStateContext, IDashboardOverviewDto>(DashboardActionEnums.getDashboardOverviewSuccess, (overview) => ({ isPending: false, isError: false, isSuccess: true, overview }));
export const getDashboardOverviewError = createAction<IDashboardStateContext>(DashboardActionEnums.getDashboardOverviewError, () => ({ isPending: false, isError: true, isSuccess: false }));

export const getDashboardPipelineMetricsPending = createAction<IDashboardStateContext>(DashboardActionEnums.getDashboardPipelineMetricsPending, () => ({ isPending: true, isError: false, isSuccess: false }));
export const getDashboardPipelineMetricsSuccess = createAction<IDashboardStateContext, IPipelineMetricsDashboardDto>(DashboardActionEnums.getDashboardPipelineMetricsSuccess, (pipelineMetrics) => ({ isPending: false, isError: false, isSuccess: true, pipelineMetrics }));
export const getDashboardPipelineMetricsError = createAction<IDashboardStateContext>(DashboardActionEnums.getDashboardPipelineMetricsError, () => ({ isPending: false, isError: true, isSuccess: false }));

export const getSalesPerformancePending = createAction<IDashboardStateContext>(DashboardActionEnums.getSalesPerformancePending, () => ({ isPending: true, isError: false, isSuccess: false }));
export const getSalesPerformanceSuccess = createAction<IDashboardStateContext, ISalesPerformanceDto[]>(DashboardActionEnums.getSalesPerformanceSuccess, (salesPerformance) => ({ isPending: false, isError: false, isSuccess: true, salesPerformance }));
export const getSalesPerformanceError = createAction<IDashboardStateContext>(DashboardActionEnums.getSalesPerformanceError, () => ({ isPending: false, isError: true, isSuccess: false }));

export const getActivitiesSummaryPending = createAction<IDashboardStateContext>(DashboardActionEnums.getActivitiesSummaryPending, () => ({ isPending: true, isError: false, isSuccess: false }));
export const getActivitiesSummarySuccess = createAction<IDashboardStateContext, IActivitiesSummaryDto>(DashboardActionEnums.getActivitiesSummarySuccess, (activitiesSummary) => ({ isPending: false, isError: false, isSuccess: true, activitiesSummary }));
export const getActivitiesSummaryError = createAction<IDashboardStateContext>(DashboardActionEnums.getActivitiesSummaryError, () => ({ isPending: false, isError: true, isSuccess: false }));

export const getContractsExpiringPending = createAction<IDashboardStateContext>(DashboardActionEnums.getContractsExpiringPending, () => ({ isPending: true, isError: false, isSuccess: false }));
export const getContractsExpiringSuccess = createAction<IDashboardStateContext, IContractDto[]>(DashboardActionEnums.getContractsExpiringSuccess, (contractsExpiring) => ({ isPending: false, isError: false, isSuccess: true, contractsExpiring }));
export const getContractsExpiringError = createAction<IDashboardStateContext>(DashboardActionEnums.getContractsExpiringError, () => ({ isPending: false, isError: true, isSuccess: false }));
