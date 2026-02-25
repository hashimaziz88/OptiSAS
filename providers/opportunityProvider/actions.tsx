import { createAction } from "redux-actions";
import { IOpportunityStateContext, IOpportunityDto, IPipelineMetricsDto, IOpportunityStageHistoryDto } from "./context";
import { IPagedResult } from "@/types/api";

export enum OpportunityActionEnums {
    getOpportunitiesPending = "GET_OPPORTUNITIES_PENDING",
    getOpportunitiesSuccess = "GET_OPPORTUNITIES_SUCCESS",
    getOpportunitiesError = "GET_OPPORTUNITIES_ERROR",

    getMyOpportunitiesPending = "GET_MY_OPPORTUNITIES_PENDING",
    getMyOpportunitiesSuccess = "GET_MY_OPPORTUNITIES_SUCCESS",
    getMyOpportunitiesError = "GET_MY_OPPORTUNITIES_ERROR",

    getOpportunityPending = "GET_OPPORTUNITY_PENDING",
    getOpportunitySuccess = "GET_OPPORTUNITY_SUCCESS",
    getOpportunityError = "GET_OPPORTUNITY_ERROR",

    createOpportunityPending = "CREATE_OPPORTUNITY_PENDING",
    createOpportunitySuccess = "CREATE_OPPORTUNITY_SUCCESS",
    createOpportunityError = "CREATE_OPPORTUNITY_ERROR",

    updateOpportunityPending = "UPDATE_OPPORTUNITY_PENDING",
    updateOpportunitySuccess = "UPDATE_OPPORTUNITY_SUCCESS",
    updateOpportunityError = "UPDATE_OPPORTUNITY_ERROR",

    deleteOpportunityPending = "DELETE_OPPORTUNITY_PENDING",
    deleteOpportunitySuccess = "DELETE_OPPORTUNITY_SUCCESS",
    deleteOpportunityError = "DELETE_OPPORTUNITY_ERROR",

    getPipelineMetricsPending = "GET_PIPELINE_METRICS_PENDING",
    getPipelineMetricsSuccess = "GET_PIPELINE_METRICS_SUCCESS",
    getPipelineMetricsError = "GET_PIPELINE_METRICS_ERROR",

    getStageHistoryPending = "GET_STAGE_HISTORY_PENDING",
    getStageHistorySuccess = "GET_STAGE_HISTORY_SUCCESS",
    getStageHistoryError = "GET_STAGE_HISTORY_ERROR",

    updateStagePending = "UPDATE_STAGE_PENDING",
    updateStageSuccess = "UPDATE_STAGE_SUCCESS",
    updateStageError = "UPDATE_STAGE_ERROR",

    assignOpportunityPending = "ASSIGN_OPPORTUNITY_PENDING",
    assignOpportunitySuccess = "ASSIGN_OPPORTUNITY_SUCCESS",
    assignOpportunityError = "ASSIGN_OPPORTUNITY_ERROR",
}

export const getOpportunitiesPending = createAction<IOpportunityStateContext>(OpportunityActionEnums.getOpportunitiesPending, () => ({ isPending: true, isError: false, isSuccess: false }));
export const getOpportunitiesSuccess = createAction<IOpportunityStateContext, IPagedResult<IOpportunityDto>>(OpportunityActionEnums.getOpportunitiesSuccess, (pagedResult) => ({ isPending: false, isError: false, isSuccess: true, pagedResult }));
export const getOpportunitiesError = createAction<IOpportunityStateContext>(OpportunityActionEnums.getOpportunitiesError, () => ({ isPending: false, isError: true, isSuccess: false }));

export const getMyOpportunitiesPending = createAction<IOpportunityStateContext>(OpportunityActionEnums.getMyOpportunitiesPending, () => ({ isPending: true, isError: false, isSuccess: false }));
export const getMyOpportunitiesSuccess = createAction<IOpportunityStateContext, IPagedResult<IOpportunityDto>>(OpportunityActionEnums.getMyOpportunitiesSuccess, (pagedResult) => ({ isPending: false, isError: false, isSuccess: true, pagedResult }));
export const getMyOpportunitiesError = createAction<IOpportunityStateContext>(OpportunityActionEnums.getMyOpportunitiesError, () => ({ isPending: false, isError: true, isSuccess: false }));

export const getOpportunityPending = createAction<IOpportunityStateContext>(OpportunityActionEnums.getOpportunityPending, () => ({ isPending: true, isError: false, isSuccess: false }));
export const getOpportunitySuccess = createAction<IOpportunityStateContext, IOpportunityDto>(OpportunityActionEnums.getOpportunitySuccess, (currentOpportunity) => ({ isPending: false, isError: false, isSuccess: true, currentOpportunity }));
export const getOpportunityError = createAction<IOpportunityStateContext>(OpportunityActionEnums.getOpportunityError, () => ({ isPending: false, isError: true, isSuccess: false }));

export const createOpportunityPending = createAction<IOpportunityStateContext>(OpportunityActionEnums.createOpportunityPending, () => ({ isPending: true, isError: false, isSuccess: false }));
export const createOpportunitySuccess = createAction<IOpportunityStateContext, IOpportunityDto>(OpportunityActionEnums.createOpportunitySuccess, (currentOpportunity) => ({ isPending: false, isError: false, isSuccess: true, currentOpportunity }));
export const createOpportunityError = createAction<IOpportunityStateContext>(OpportunityActionEnums.createOpportunityError, () => ({ isPending: false, isError: true, isSuccess: false }));

export const updateOpportunityPending = createAction<IOpportunityStateContext>(OpportunityActionEnums.updateOpportunityPending, () => ({ isPending: true, isError: false, isSuccess: false }));
export const updateOpportunitySuccess = createAction<IOpportunityStateContext, IOpportunityDto>(OpportunityActionEnums.updateOpportunitySuccess, (currentOpportunity) => ({ isPending: false, isError: false, isSuccess: true, currentOpportunity }));
export const updateOpportunityError = createAction<IOpportunityStateContext>(OpportunityActionEnums.updateOpportunityError, () => ({ isPending: false, isError: true, isSuccess: false }));

export const deleteOpportunityPending = createAction<IOpportunityStateContext>(OpportunityActionEnums.deleteOpportunityPending, () => ({ isPending: true, isError: false, isSuccess: false }));
export const deleteOpportunitySuccess = createAction<IOpportunityStateContext>(OpportunityActionEnums.deleteOpportunitySuccess, () => ({ isPending: false, isError: false, isSuccess: true, currentOpportunity: null }));
export const deleteOpportunityError = createAction<IOpportunityStateContext>(OpportunityActionEnums.deleteOpportunityError, () => ({ isPending: false, isError: true, isSuccess: false }));

export const getPipelineMetricsPending = createAction<IOpportunityStateContext>(OpportunityActionEnums.getPipelineMetricsPending, () => ({ isPending: true, isError: false, isSuccess: false }));
export const getPipelineMetricsSuccess = createAction<IOpportunityStateContext, IPipelineMetricsDto>(OpportunityActionEnums.getPipelineMetricsSuccess, (pipelineMetrics) => ({ isPending: false, isError: false, isSuccess: true, pipelineMetrics }));
export const getPipelineMetricsError = createAction<IOpportunityStateContext>(OpportunityActionEnums.getPipelineMetricsError, () => ({ isPending: false, isError: true, isSuccess: false }));

export const getStageHistoryPending = createAction<IOpportunityStateContext>(OpportunityActionEnums.getStageHistoryPending, () => ({ isPending: true, isError: false, isSuccess: false }));
export const getStageHistorySuccess = createAction<IOpportunityStateContext, IOpportunityStageHistoryDto[]>(OpportunityActionEnums.getStageHistorySuccess, (stageHistory) => ({ isPending: false, isError: false, isSuccess: true, stageHistory }));
export const getStageHistoryError = createAction<IOpportunityStateContext>(OpportunityActionEnums.getStageHistoryError, () => ({ isPending: false, isError: true, isSuccess: false }));

export const updateStagePending = createAction<IOpportunityStateContext>(OpportunityActionEnums.updateStagePending, () => ({ isPending: true, isError: false, isSuccess: false }));
export const updateStageSuccess = createAction<IOpportunityStateContext, IOpportunityDto>(OpportunityActionEnums.updateStageSuccess, (currentOpportunity) => ({ isPending: false, isError: false, isSuccess: true, currentOpportunity }));
export const updateStageError = createAction<IOpportunityStateContext>(OpportunityActionEnums.updateStageError, () => ({ isPending: false, isError: true, isSuccess: false }));

export const assignOpportunityPending = createAction<IOpportunityStateContext>(OpportunityActionEnums.assignOpportunityPending, () => ({ isPending: true, isError: false, isSuccess: false }));
export const assignOpportunitySuccess = createAction<IOpportunityStateContext, IOpportunityDto>(OpportunityActionEnums.assignOpportunitySuccess, (currentOpportunity) => ({ isPending: false, isError: false, isSuccess: true, currentOpportunity }));
export const assignOpportunityError = createAction<IOpportunityStateContext>(OpportunityActionEnums.assignOpportunityError, () => ({ isPending: false, isError: true, isSuccess: false }));
