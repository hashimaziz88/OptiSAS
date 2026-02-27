"use client";
import React, { useReducer, useContext } from "react";
import {
    INITIAL_STATE,
    ContractStateContext,
    ContractActionContext,
    ICreateContractDto,
    IUpdateContractDto,
    IGetContractsParams,
    ICreateContractRenewalDto,
} from "./context";
import { ContractReducer } from "./reducer";
import {
    getContractsPending, getContractsSuccess, getContractsError,
    getContractPending, getContractSuccess, getContractError,
    createContractPending, createContractSuccess, createContractError,
    updateContractPending, updateContractSuccess, updateContractError,
    deleteContractPending, deleteContractSuccess, deleteContractError,
    getExpiringContractsPending, getExpiringContractsSuccess, getExpiringContractsError,
    getClientContractsPending, getClientContractsSuccess, getClientContractsError,
    activateContractPending, activateContractSuccess, activateContractError,
    cancelContractPending, cancelContractSuccess, cancelContractError,
    createRenewalPending, createRenewalSuccess, createRenewalError,
    completeRenewalPending, completeRenewalSuccess, completeRenewalError,
    getContractRenewalsPending, getContractRenewalsSuccess, getContractRenewalsError,
} from "./actions";
import { axiosInstance } from "@/utils/axiosInstance";

const BASE_URL = process.env.NEXT_PUBLIC_API_LINK;

export const ContractProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [state, dispatch] = useReducer(ContractReducer, INITIAL_STATE);

    const getContracts = async (params?: IGetContractsParams) => {
        const instance = axiosInstance();
        dispatch(getContractsPending());
        await instance.get(`${BASE_URL}/api/Contracts`, { params })
            .then((response) => { dispatch(getContractsSuccess(response.data)); })
            .catch(() => { dispatch(getContractsError()); });
    };

    const getContract = async (id: string) => {
        const instance = axiosInstance();
        dispatch(getContractPending());
        await instance.get(`${BASE_URL}/api/Contracts/${id}`)
            .then((response) => { dispatch(getContractSuccess(response.data)); })
            .catch(() => { dispatch(getContractError()); });
    };

    const createContract = async (payload: ICreateContractDto) => {
        const instance = axiosInstance();
        dispatch(createContractPending());
        await instance.post(`${BASE_URL}/api/Contracts`, payload)
            .then((response) => { dispatch(createContractSuccess(response.data)); })
            .catch(() => { dispatch(createContractError()); });
    };

    const updateContract = async (id: string, payload: IUpdateContractDto) => {
        const instance = axiosInstance();
        dispatch(updateContractPending());
        await instance.put(`${BASE_URL}/api/Contracts/${id}`, payload)
            .then((response) => { dispatch(updateContractSuccess(response.data)); })
            .catch(() => { dispatch(updateContractError()); });
    };

    const deleteContract = async (id: string) => {
        const instance = axiosInstance();
        dispatch(deleteContractPending());
        await instance.delete(`${BASE_URL}/api/Contracts/${id}`)
            .then(() => { dispatch(deleteContractSuccess()); })
            .catch(() => { dispatch(deleteContractError()); });
    };

    const getExpiringContracts = async (daysUntilExpiry?: number) => {
        const instance = axiosInstance();
        dispatch(getExpiringContractsPending());
        await instance.get(`${BASE_URL}/api/Contracts/expiring`, { params: { daysUntilExpiry } })
            .then((response) => { dispatch(getExpiringContractsSuccess(response.data)); })
            .catch(() => { dispatch(getExpiringContractsError()); });
    };

    const getClientContracts = async (clientId: string) => {
        const instance = axiosInstance();
        dispatch(getClientContractsPending());
        await instance.get(`${BASE_URL}/api/Contracts/client/${clientId}`)
            .then((response) => { dispatch(getClientContractsSuccess(response.data)); })
            .catch(() => { dispatch(getClientContractsError()); });
    };

    const activateContract = async (id: string) => {
        const instance = axiosInstance();
        dispatch(activateContractPending());
        await instance.put(`${BASE_URL}/api/Contracts/${id}/activate`)
            .then((response) => { dispatch(activateContractSuccess(response.data)); })
            .catch(() => { dispatch(activateContractError()); });
    };

    const cancelContract = async (id: string) => {
        const instance = axiosInstance();
        dispatch(cancelContractPending());
        await instance.put(`${BASE_URL}/api/Contracts/${id}/cancel`)
            .then((response) => { dispatch(cancelContractSuccess(response.data)); })
            .catch(() => { dispatch(cancelContractError()); });
    };

    const createRenewal = async (contractId: string, payload: ICreateContractRenewalDto) => {
        const instance = axiosInstance();
        dispatch(createRenewalPending());
        await instance.post(`${BASE_URL}/api/Contracts/${contractId}/renewals`, payload)
            .then((response) => { dispatch(createRenewalSuccess(response.data)); })
            .catch(() => { dispatch(createRenewalError()); });
    };

    const completeRenewal = async (renewalId: string) => {
        const instance = axiosInstance();
        dispatch(completeRenewalPending());
        await instance.put(`${BASE_URL}/api/Contracts/renewals/${renewalId}/complete`)
            .then((response) => { dispatch(completeRenewalSuccess(response.data)); })
            .catch(() => { dispatch(completeRenewalError()); });
    };

    const getContractRenewals = async (contractId: string) => {
        const instance = axiosInstance();
        dispatch(getContractRenewalsPending());
        await instance.get(`${BASE_URL}/api/Contracts/${contractId}/renewals`)
            .then((response) => { dispatch(getContractRenewalsSuccess(response.data)); })
            .catch(() => { dispatch(getContractRenewalsError()); });
    };

    return (
        <ContractStateContext.Provider value={state}>
            <ContractActionContext.Provider value={{ getContracts, getContract, createContract, updateContract, deleteContract, getExpiringContracts, getClientContracts, activateContract, cancelContract, createRenewal, completeRenewal, getContractRenewals }}>
                {children}
            </ContractActionContext.Provider>
        </ContractStateContext.Provider>
    );
};

export const useContractState = () => {
    const context = useContext(ContractStateContext);
    if (context === undefined) throw new Error("useContractState must be used within a ContractProvider");
    return context;
};

export const useContractActions = () => {
    const context = useContext(ContractActionContext);
    if (context === undefined) throw new Error("useContractActions must be used within a ContractProvider");
    return context;
};
