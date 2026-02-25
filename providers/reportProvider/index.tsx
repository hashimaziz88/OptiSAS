"use client";
import React, { useReducer, useContext } from "react";
import {
    INITIAL_STATE,
    ReportStateContext,
    ReportActionContext,
    IGetOpportunitiesReportParams,
    IGetSalesByPeriodParams,
} from "./context";
import { ReportReducer } from "./reducer";
import {
    getOpportunitiesReportPending, getOpportunitiesReportSuccess, getOpportunitiesReportError,
    getSalesByPeriodReportPending, getSalesByPeriodReportSuccess, getSalesByPeriodReportError,
} from "./actions";
import { axiosInstance } from "@/utils/axiosInstance";

const BASE_URL = process.env.NEXT_PUBLIC_API_LINK;

export const ReportProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [state, dispatch] = useReducer(ReportReducer, INITIAL_STATE);

    const getOpportunitiesReport = async (params?: IGetOpportunitiesReportParams) => {
        const instance = axiosInstance();
        dispatch(getOpportunitiesReportPending());
        await instance.get(`${BASE_URL}/api/Reports/opportunities`, { params })
            .then((response) => { dispatch(getOpportunitiesReportSuccess(response.data)); })
            .catch(() => { dispatch(getOpportunitiesReportError()); });
    };

    const getSalesByPeriodReport = async (params?: IGetSalesByPeriodParams) => {
        const instance = axiosInstance();
        dispatch(getSalesByPeriodReportPending());
        await instance.get(`${BASE_URL}/api/Reports/sales-by-period`, { params })
            .then((response) => { dispatch(getSalesByPeriodReportSuccess(response.data)); })
            .catch(() => { dispatch(getSalesByPeriodReportError()); });
    };

    return (
        <ReportStateContext.Provider value={state}>
            <ReportActionContext.Provider value={{ getOpportunitiesReport, getSalesByPeriodReport }}>
                {children}
            </ReportActionContext.Provider>
        </ReportStateContext.Provider>
    );
};

export const useReportState = () => {
    const context = useContext(ReportStateContext);
    if (context === undefined) throw new Error("useReportState must be used within a ReportProvider");
    return context;
};

export const useReportActions = () => {
    const context = useContext(ReportActionContext);
    if (context === undefined) throw new Error("useReportActions must be used within a ReportProvider");
    return context;
};
