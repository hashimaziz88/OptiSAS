"use client";
import React, { useReducer, useContext } from "react";
import {
    INITIAL_STATE,
    ProposalStateContext,
    ProposalActionContext,
    ICreateProposalDto,
    IUpdateProposalDto,
    IGetProposalsParams,
    ICreateProposalLineItemDto,
} from "./context";
import { ProposalReducer } from "./reducer";
import {
    getProposalsPending, getProposalsSuccess, getProposalsError,
    getProposalPending, getProposalSuccess, getProposalError,
    createProposalPending, createProposalSuccess, createProposalError,
    updateProposalPending, updateProposalSuccess, updateProposalError,
    deleteProposalPending, deleteProposalSuccess, deleteProposalError,
    addLineItemPending, addLineItemSuccess, addLineItemError,
    updateLineItemPending, updateLineItemSuccess, updateLineItemError,
    deleteLineItemPending, deleteLineItemSuccess, deleteLineItemError,
    submitProposalPending, submitProposalSuccess, submitProposalError,
    approveProposalPending, approveProposalSuccess, approveProposalError,
    rejectProposalPending, rejectProposalSuccess, rejectProposalError,
} from "./actions";
import { axiosInstance } from "@/utils/axiosInstance";

const BASE_URL = process.env.NEXT_PUBLIC_API_LINK;

export const ProposalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [state, dispatch] = useReducer(ProposalReducer, INITIAL_STATE);

    const getProposals = async (params?: IGetProposalsParams) => {
        const instance = axiosInstance();
        dispatch(getProposalsPending());
        await instance.get(`${BASE_URL}/api/Proposals`, { params })
            .then((response) => { dispatch(getProposalsSuccess(response.data)); })
            .catch(() => { dispatch(getProposalsError()); });
    };

    const getProposal = async (id: string) => {
        const instance = axiosInstance();
        dispatch(getProposalPending());
        await instance.get(`${BASE_URL}/api/Proposals/${id}`)
            .then((response) => { dispatch(getProposalSuccess(response.data)); })
            .catch(() => { dispatch(getProposalError()); });
    };

    const createProposal = async (payload: ICreateProposalDto) => {
        const instance = axiosInstance();
        dispatch(createProposalPending());
        await instance.post(`${BASE_URL}/api/Proposals`, payload)
            .then((response) => { dispatch(createProposalSuccess(response.data)); })
            .catch(() => { dispatch(createProposalError()); });
    };

    const updateProposal = async (id: string, payload: IUpdateProposalDto) => {
        const instance = axiosInstance();
        dispatch(updateProposalPending());
        await instance.put(`${BASE_URL}/api/Proposals/${id}`, payload)
            .then((response) => { dispatch(updateProposalSuccess(response.data)); })
            .catch(() => { dispatch(updateProposalError()); });
    };

    const deleteProposal = async (id: string) => {
        const instance = axiosInstance();
        dispatch(deleteProposalPending());
        await instance.delete(`${BASE_URL}/api/Proposals/${id}`)
            .then(() => { dispatch(deleteProposalSuccess()); })
            .catch(() => { dispatch(deleteProposalError()); });
    };

    const addLineItem = async (proposalId: string, payload: ICreateProposalLineItemDto) => {
        const instance = axiosInstance();
        dispatch(addLineItemPending());
        await instance.post(`${BASE_URL}/api/Proposals/${proposalId}/line-items`, payload)
            .then((response) => { dispatch(addLineItemSuccess(response.data)); })
            .catch(() => { dispatch(addLineItemError()); });
    };

    const updateLineItem = async (proposalId: string, lineItemId: string, payload: ICreateProposalLineItemDto) => {
        const instance = axiosInstance();
        dispatch(updateLineItemPending());
        await instance.put(`${BASE_URL}/api/Proposals/${proposalId}/line-items/${lineItemId}`, payload)
            .then(() => { dispatch(updateLineItemSuccess()); })
            .catch(() => { dispatch(updateLineItemError()); });
    };

    const deleteLineItem = async (proposalId: string, lineItemId: string) => {
        const instance = axiosInstance();
        dispatch(deleteLineItemPending());
        await instance.delete(`${BASE_URL}/api/Proposals/${proposalId}/line-items/${lineItemId}`)
            .then(() => { dispatch(deleteLineItemSuccess()); })
            .catch(() => { dispatch(deleteLineItemError()); });
    };

    const submitProposal = async (id: string) => {
        const instance = axiosInstance();
        dispatch(submitProposalPending());
        await instance.put(`${BASE_URL}/api/Proposals/${id}/submit`)
            .then((response) => { dispatch(submitProposalSuccess(response.data)); })
            .catch(() => { dispatch(submitProposalError()); });
    };

    const approveProposal = async (id: string) => {
        const instance = axiosInstance();
        dispatch(approveProposalPending());
        await instance.put(`${BASE_URL}/api/Proposals/${id}/approve`)
            .then((response) => { dispatch(approveProposalSuccess(response.data)); })
            .catch(() => { dispatch(approveProposalError()); });
    };

    const rejectProposal = async (id: string) => {
        const instance = axiosInstance();
        dispatch(rejectProposalPending());
        await instance.put(`${BASE_URL}/api/Proposals/${id}/reject`)
            .then((response) => { dispatch(rejectProposalSuccess(response.data)); })
            .catch(() => { dispatch(rejectProposalError()); });
    };

    return (
        <ProposalStateContext.Provider value={state}>
            <ProposalActionContext.Provider value={{ getProposals, getProposal, createProposal, updateProposal, deleteProposal, addLineItem, updateLineItem, deleteLineItem, submitProposal, approveProposal, rejectProposal }}>
                {children}
            </ProposalActionContext.Provider>
        </ProposalStateContext.Provider>
    );
};

export const useProposalState = () => {
    const context = useContext(ProposalStateContext);
    if (context === undefined) throw new Error("useProposalState must be used within a ProposalProvider");
    return context;
};

export const useProposalActions = () => {
    const context = useContext(ProposalActionContext);
    if (context === undefined) throw new Error("useProposalActions must be used within a ProposalProvider");
    return context;
};
