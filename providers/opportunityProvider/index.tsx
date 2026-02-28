"use client";
import React, { useReducer, useContext } from "react";
import {
    INITIAL_STATE,
    OpportunityStateContext,
    OpportunityActionContext,
    IOpportunityDto,
    ICreateOpportunityDto,
    IUpdateOpportunityDto,
    IGetOpportunitiesParams,
    IGetMyOpportunitiesParams,
    IUpdateStageDto,
} from "./context";
import { OpportunityReducer } from "./reducer";
import {
    getOpportunitiesPending, getOpportunitiesSuccess, getOpportunitiesError,
    getMyOpportunitiesPending, getMyOpportunitiesSuccess, getMyOpportunitiesError,
    getOpportunityPending, getOpportunitySuccess, getOpportunityError,
    createOpportunityPending, createOpportunitySuccess, createOpportunityError,
    updateOpportunityPending, updateOpportunitySuccess, updateOpportunityError,
    deleteOpportunityPending, deleteOpportunitySuccess, deleteOpportunityError,
    getPipelineMetricsPending, getPipelineMetricsSuccess, getPipelineMetricsError,
    getStageHistoryPending, getStageHistorySuccess, getStageHistoryError,
    updateStagePending, updateStageSuccess, updateStageError,
    assignOpportunityPending, assignOpportunitySuccess, assignOpportunityError,
} from "./actions";
import { axiosInstance } from "@/utils/axiosInstance";

const BASE_URL = process.env.NEXT_PUBLIC_API_LINK;

export const OpportunityProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [state, dispatch] = useReducer(OpportunityReducer, INITIAL_STATE);

    const getOpportunities = async (params?: IGetOpportunitiesParams) => {
        const instance = axiosInstance();
        dispatch(getOpportunitiesPending());
        await instance.get(`${BASE_URL}/api/Opportunities`, { params })
            .then((response) => { dispatch(getOpportunitiesSuccess(response.data)); })
            .catch(() => { dispatch(getOpportunitiesError()); });
    };

    const getMyOpportunities = async (params?: IGetMyOpportunitiesParams) => {
        const instance = axiosInstance();
        dispatch(getMyOpportunitiesPending());
        await instance.get(`${BASE_URL}/api/Opportunities/my-opportunities`, { params })
            .then((response) => { dispatch(getMyOpportunitiesSuccess(response.data)); })
            .catch(() => { dispatch(getMyOpportunitiesError()); });
    };

    const getOpportunity = async (id: string) => {
        const instance = axiosInstance();
        dispatch(getOpportunityPending());
        await instance.get(`${BASE_URL}/api/Opportunities/${id}`)
            .then((response) => { dispatch(getOpportunitySuccess(response.data)); })
            .catch(() => { dispatch(getOpportunityError()); });
    };

    const createOpportunity = async (payload: ICreateOpportunityDto): Promise<IOpportunityDto | undefined> => {
        const instance = axiosInstance();
        dispatch(createOpportunityPending());
        let result: IOpportunityDto | undefined;
        await instance.post(`${BASE_URL}/api/Opportunities`, payload)
            .then((response) => { dispatch(createOpportunitySuccess(response.data)); result = response.data; })
            .catch(() => { dispatch(createOpportunityError()); });
        return result;
    };

    const updateOpportunity = async (id: string, payload: IUpdateOpportunityDto) => {
        const instance = axiosInstance();
        dispatch(updateOpportunityPending());
        await instance.put(`${BASE_URL}/api/Opportunities/${id}`, payload)
            .then((response) => { dispatch(updateOpportunitySuccess(response.data)); })
            .catch(() => { dispatch(updateOpportunityError()); });
    };

    const deleteOpportunity = async (id: string) => {
        const instance = axiosInstance();
        dispatch(deleteOpportunityPending());
        await instance.delete(`${BASE_URL}/api/Opportunities/${id}`)
            .then(() => { dispatch(deleteOpportunitySuccess()); })
            .catch(() => { dispatch(deleteOpportunityError()); });
    };

    const getPipelineMetrics = async (ownerId?: string) => {
        const instance = axiosInstance();
        dispatch(getPipelineMetricsPending());
        await instance.get(`${BASE_URL}/api/Opportunities/pipeline`, { params: { ownerId } })
            .then((response) => { dispatch(getPipelineMetricsSuccess(response.data)); })
            .catch(() => { dispatch(getPipelineMetricsError()); });
    };

    const getStageHistory = async (id: string) => {
        const instance = axiosInstance();
        dispatch(getStageHistoryPending());
        await instance.get(`${BASE_URL}/api/Opportunities/${id}/stage-history`)
            .then((response) => { dispatch(getStageHistorySuccess(response.data)); })
            .catch(() => { dispatch(getStageHistoryError()); });
    };

    const updateStage = async (id: string, payload: IUpdateStageDto) => {
        const instance = axiosInstance();
        dispatch(updateStagePending());
        await instance.put(`${BASE_URL}/api/Opportunities/${id}/stage`, payload)
            .then((response) => { dispatch(updateStageSuccess(response.data)); })
            .catch(() => { dispatch(updateStageError()); });
    };

    const assignOpportunity = async (id: string, userId: string) => {
        const instance = axiosInstance();
        dispatch(assignOpportunityPending());
        await instance.post(`${BASE_URL}/api/Opportunities/${id}/assign`, { userId })
            .then((response) => { dispatch(assignOpportunitySuccess(response.data)); })
            .catch(() => { dispatch(assignOpportunityError()); });
    };

    return (
        <OpportunityStateContext.Provider value={state}>
            <OpportunityActionContext.Provider value={{ getOpportunities, getMyOpportunities, getOpportunity, createOpportunity, updateOpportunity, deleteOpportunity, getPipelineMetrics, getStageHistory, updateStage, assignOpportunity }}>
                {children}
            </OpportunityActionContext.Provider>
        </OpportunityStateContext.Provider>
    );
};

export const useOpportunityState = () => {
    const context = useContext(OpportunityStateContext);
    if (context === undefined) throw new Error("useOpportunityState must be used within an OpportunityProvider");
    return context;
};

export const useOpportunityActions = () => {
    const context = useContext(OpportunityActionContext);
    if (context === undefined) throw new Error("useOpportunityActions must be used within an OpportunityProvider");
    return context;
};
