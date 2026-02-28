"use client";
import React, { useReducer, useContext } from "react";
import {
    INITIAL_STATE,
    PricingRequestStateContext,
    PricingRequestActionContext,
    IPricingRequestDto,
    ICreatePricingRequestDto,
    IUpdatePricingRequestDto,
    IGetPricingRequestsParams,
} from "./context";
import { PricingRequestReducer } from "./reducer";
import {
    getPricingRequestsPending, getPricingRequestsSuccess, getPricingRequestsError,
    getPendingPricingRequestsPending, getPendingPricingRequestsSuccess, getPendingPricingRequestsError,
    getMyPricingRequestsPending, getMyPricingRequestsSuccess, getMyPricingRequestsError,
    getPricingRequestPending, getPricingRequestSuccess, getPricingRequestError,
    createPricingRequestPending, createPricingRequestSuccess, createPricingRequestError,
    updatePricingRequestPending, updatePricingRequestSuccess, updatePricingRequestError,
    deletePricingRequestPending, deletePricingRequestSuccess, deletePricingRequestError,
    assignPricingRequestPending, assignPricingRequestSuccess, assignPricingRequestError,
    completePricingRequestPending, completePricingRequestSuccess, completePricingRequestError,
} from "./actions";
import { axiosInstance } from "@/utils/axiosInstance";

const BASE_URL = process.env.NEXT_PUBLIC_API_LINK;

export const PricingRequestProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [state, dispatch] = useReducer(PricingRequestReducer, INITIAL_STATE);

    const getPricingRequests = async (params?: IGetPricingRequestsParams) => {
        const instance = axiosInstance();
        dispatch(getPricingRequestsPending());
        await instance.get(`${BASE_URL}/api/PricingRequests`, { params })
            .then((response) => { dispatch(getPricingRequestsSuccess(response.data)); })
            .catch(() => { dispatch(getPricingRequestsError()); });
    };

    const getPendingPricingRequests = async () => {
        const instance = axiosInstance();
        dispatch(getPendingPricingRequestsPending());
        await instance.get(`${BASE_URL}/api/PricingRequests/pending`)
            .then((response) => { dispatch(getPendingPricingRequestsSuccess(response.data)); })
            .catch(() => { dispatch(getPendingPricingRequestsError()); });
    };

    const getMyPricingRequests = async () => {
        const instance = axiosInstance();
        dispatch(getMyPricingRequestsPending());
        await instance.get(`${BASE_URL}/api/PricingRequests/my-requests`)
            .then((response) => { dispatch(getMyPricingRequestsSuccess(response.data)); })
            .catch(() => { dispatch(getMyPricingRequestsError()); });
    };

    const getPricingRequest = async (id: string) => {
        const instance = axiosInstance();
        dispatch(getPricingRequestPending());
        await instance.get(`${BASE_URL}/api/PricingRequests/${id}`)
            .then((response) => { dispatch(getPricingRequestSuccess(response.data)); })
            .catch(() => { dispatch(getPricingRequestError()); });
    };

    const createPricingRequest = async (payload: ICreatePricingRequestDto): Promise<IPricingRequestDto | undefined> => {
        const instance = axiosInstance();
        dispatch(createPricingRequestPending());
        let result: IPricingRequestDto | undefined;
        await instance.post(`${BASE_URL}/api/PricingRequests`, payload)
            .then((response) => { dispatch(createPricingRequestSuccess(response.data)); result = response.data; })
            .catch(() => { dispatch(createPricingRequestError()); });
        return result;
    };

    const updatePricingRequest = async (id: string, payload: IUpdatePricingRequestDto) => {
        const instance = axiosInstance();
        dispatch(updatePricingRequestPending());
        await instance.put(`${BASE_URL}/api/PricingRequests/${id}`, payload)
            .then((response) => { dispatch(updatePricingRequestSuccess(response.data)); })
            .catch(() => { dispatch(updatePricingRequestError()); });
    };

    const deletePricingRequest = async (id: string) => {
        const instance = axiosInstance();
        dispatch(deletePricingRequestPending());
        await instance.delete(`${BASE_URL}/api/PricingRequests/${id}`)
            .then(() => { dispatch(deletePricingRequestSuccess()); })
            .catch(() => { dispatch(deletePricingRequestError()); });
    };

    const assignPricingRequest = async (id: string, userId: string) => {
        const instance = axiosInstance();
        dispatch(assignPricingRequestPending());
        await instance.post(`${BASE_URL}/api/PricingRequests/${id}/assign`, { userId })
            .then((response) => { dispatch(assignPricingRequestSuccess(response.data)); })
            .catch(() => { dispatch(assignPricingRequestError()); });
    };

    const completePricingRequest = async (id: string) => {
        const instance = axiosInstance();
        dispatch(completePricingRequestPending());
        await instance.put(`${BASE_URL}/api/PricingRequests/${id}/complete`)
            .then((response) => { dispatch(completePricingRequestSuccess(response.data)); })
            .catch(() => { dispatch(completePricingRequestError()); });
    };

    return (
        <PricingRequestStateContext.Provider value={state}>
            <PricingRequestActionContext.Provider value={{ getPricingRequests, getPendingPricingRequests, getMyPricingRequests, getPricingRequest, createPricingRequest, updatePricingRequest, deletePricingRequest, assignPricingRequest, completePricingRequest }}>
                {children}
            </PricingRequestActionContext.Provider>
        </PricingRequestStateContext.Provider>
    );
};

export const usePricingRequestState = () => {
    const context = useContext(PricingRequestStateContext);
    if (context === undefined) throw new Error("usePricingRequestState must be used within a PricingRequestProvider");
    return context;
};

export const usePricingRequestActions = () => {
    const context = useContext(PricingRequestActionContext);
    if (context === undefined) throw new Error("usePricingRequestActions must be used within a PricingRequestProvider");
    return context;
};
