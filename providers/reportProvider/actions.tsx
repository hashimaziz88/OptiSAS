import { createAction } from "redux-actions";
import { IReportStateContext, IOpportunityReportItemDto, ISalesByPeriodItemDto } from "./context";

export enum ReportActionEnums {
    getOpportunitiesReportPending = "GET_OPPORTUNITIES_REPORT_PENDING",
    getOpportunitiesReportSuccess = "GET_OPPORTUNITIES_REPORT_SUCCESS",
    getOpportunitiesReportError = "GET_OPPORTUNITIES_REPORT_ERROR",

    getSalesByPeriodReportPending = "GET_SALES_BY_PERIOD_REPORT_PENDING",
    getSalesByPeriodReportSuccess = "GET_SALES_BY_PERIOD_REPORT_SUCCESS",
    getSalesByPeriodReportError = "GET_SALES_BY_PERIOD_REPORT_ERROR",
}

export const getOpportunitiesReportPending = createAction<IReportStateContext>(ReportActionEnums.getOpportunitiesReportPending, () => ({ isPending: true, isError: false, isSuccess: false }));
export const getOpportunitiesReportSuccess = createAction<IReportStateContext, IOpportunityReportItemDto[]>(ReportActionEnums.getOpportunitiesReportSuccess, (opportunitiesReport) => ({ isPending: false, isError: false, isSuccess: true, opportunitiesReport }));
export const getOpportunitiesReportError = createAction<IReportStateContext>(ReportActionEnums.getOpportunitiesReportError, () => ({ isPending: false, isError: true, isSuccess: false }));

export const getSalesByPeriodReportPending = createAction<IReportStateContext>(ReportActionEnums.getSalesByPeriodReportPending, () => ({ isPending: true, isError: false, isSuccess: false }));
export const getSalesByPeriodReportSuccess = createAction<IReportStateContext, ISalesByPeriodItemDto[]>(ReportActionEnums.getSalesByPeriodReportSuccess, (salesByPeriodReport) => ({ isPending: false, isError: false, isSuccess: true, salesByPeriodReport }));
export const getSalesByPeriodReportError = createAction<IReportStateContext>(ReportActionEnums.getSalesByPeriodReportError, () => ({ isPending: false, isError: true, isSuccess: false }));
