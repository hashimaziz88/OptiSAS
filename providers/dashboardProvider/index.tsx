"use client";
import React, { useReducer, useContext } from "react";
import {
    INITIAL_STATE,
    DashboardStateContext,
    DashboardActionContext,
} from "./context";
import { DashboardReducer } from "./reducer";
import {
    getDashboardOverviewPending, getDashboardOverviewSuccess, getDashboardOverviewError,
    getDashboardPipelineMetricsPending, getDashboardPipelineMetricsSuccess, getDashboardPipelineMetricsError,
    getSalesPerformancePending, getSalesPerformanceSuccess, getSalesPerformanceError,
    getActivitiesSummaryPending, getActivitiesSummarySuccess, getActivitiesSummaryError,
    getContractsExpiringPending, getContractsExpiringSuccess, getContractsExpiringError,
} from "./actions";
import { axiosInstance } from "@/utils/axiosInstance";

const BASE_URL = process.env.NEXT_PUBLIC_API_LINK;

export const DashboardProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [state, dispatch] = useReducer(DashboardReducer, INITIAL_STATE);

    const getDashboardOverview = async () => {
        const instance = axiosInstance();
        dispatch(getDashboardOverviewPending());
        await instance.get(`${BASE_URL}/api/Dashboard/overview`)
            .then((response) => { dispatch(getDashboardOverviewSuccess(response.data)); })
            .catch(() => { dispatch(getDashboardOverviewError()); });
    };

    const getDashboardPipelineMetrics = async () => {
        const instance = axiosInstance();
        dispatch(getDashboardPipelineMetricsPending());
        await instance.get(`${BASE_URL}/api/Dashboard/pipeline-metrics`)
            .then((response) => { dispatch(getDashboardPipelineMetricsSuccess(response.data)); })
            .catch(() => { dispatch(getDashboardPipelineMetricsError()); });
    };

    const getSalesPerformance = async (topCount?: number) => {
        const instance = axiosInstance();
        dispatch(getSalesPerformancePending());
        await instance.get(`${BASE_URL}/api/Dashboard/sales-performance`, { params: { topCount } })
            .then((response) => {
                const data = response.data;
                const performers = Array.isArray(data) ? data : (data?.topPerformers ?? []);
                dispatch(getSalesPerformanceSuccess(performers));
            })
            .catch(() => { dispatch(getSalesPerformanceError()); });
    };

    const getActivitiesSummary = async () => {
        const instance = axiosInstance();
        dispatch(getActivitiesSummaryPending());
        await instance.get(`${BASE_URL}/api/Dashboard/activities-summary`)
            .then((response) => { dispatch(getActivitiesSummarySuccess(response.data)); })
            .catch(() => { dispatch(getActivitiesSummaryError()); });
    };

    const getContractsExpiring = async (days?: number) => {
        const instance = axiosInstance();
        dispatch(getContractsExpiringPending());
        await instance.get(`${BASE_URL}/api/Dashboard/contracts-expiring`, { params: { days } })
            .then((response) => { dispatch(getContractsExpiringSuccess(response.data)); })
            .catch(() => { dispatch(getContractsExpiringError()); });
    };

    return (
        <DashboardStateContext.Provider value={state}>
            <DashboardActionContext.Provider value={{ getDashboardOverview, getDashboardPipelineMetrics, getSalesPerformance, getActivitiesSummary, getContractsExpiring }}>
                {children}
            </DashboardActionContext.Provider>
        </DashboardStateContext.Provider>
    );
};

export const useDashboardState = () => {
    const context = useContext(DashboardStateContext);
    if (context === undefined) throw new Error("useDashboardState must be used within a DashboardProvider");
    return context;
};

export const useDashboardActions = () => {
    const context = useContext(DashboardActionContext);
    if (context === undefined) throw new Error("useDashboardActions must be used within a DashboardProvider");
    return context;
};
