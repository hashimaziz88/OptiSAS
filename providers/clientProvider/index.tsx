"use client";
import React, { useReducer, useContext } from "react";
import {
    INITIAL_STATE,
    ClientStateContext,
    ClientActionContext,
    ICreateClientDto,
    IUpdateClientDto,
    IGetClientsParams,
} from "./context";
import { ClientReducer } from "./reducer";
import {
    getClientsPending, getClientsSuccess, getClientsError,
    getClientPending, getClientSuccess, getClientError,
    getClientStatsPending, getClientStatsSuccess, getClientStatsError,
    createClientPending, createClientSuccess, createClientError,
    updateClientPending, updateClientSuccess, updateClientError,
    deleteClientPending, deleteClientSuccess, deleteClientError,
} from "./actions";
import { axiosInstance } from "@/utils/axiosInstance";

const BASE_URL = process.env.NEXT_PUBLIC_API_LINK;

export const ClientProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [state, dispatch] = useReducer(ClientReducer, INITIAL_STATE);

    const getClients = async (params?: IGetClientsParams) => {
        const instance = axiosInstance();
        dispatch(getClientsPending());
        await instance.get(`${BASE_URL}/api/Clients`, { params })
            .then((response) => { dispatch(getClientsSuccess(response.data)); })
            .catch(() => { dispatch(getClientsError()); });
    };

    const getClient = async (id: string) => {
        const instance = axiosInstance();
        dispatch(getClientPending());
        await instance.get(`${BASE_URL}/api/Clients/${id}`)
            .then((response) => { dispatch(getClientSuccess(response.data)); })
            .catch(() => { dispatch(getClientError()); });
    };

    const getClientStats = async (id: string) => {
        const instance = axiosInstance();
        dispatch(getClientStatsPending());
        await instance.get(`${BASE_URL}/api/Clients/${id}/stats`)
            .then((response) => { dispatch(getClientStatsSuccess(response.data)); })
            .catch(() => { dispatch(getClientStatsError()); });
    };

    const createClient = async (payload: ICreateClientDto) => {
        const instance = axiosInstance();
        dispatch(createClientPending());
        await instance.post(`${BASE_URL}/api/Clients`, payload)
            .then((response) => { dispatch(createClientSuccess(response.data)); })
            .catch(() => { dispatch(createClientError()); });
    };

    const updateClient = async (id: string, payload: IUpdateClientDto) => {
        const instance = axiosInstance();
        dispatch(updateClientPending());
        await instance.put(`${BASE_URL}/api/Clients/${id}`, payload)
            .then((response) => { dispatch(updateClientSuccess(response.data)); })
            .catch(() => { dispatch(updateClientError()); });
    };

    const deleteClient = async (id: string) => {
        const instance = axiosInstance();
        dispatch(deleteClientPending());
        await instance.delete(`${BASE_URL}/api/Clients/${id}`)
            .then(() => { dispatch(deleteClientSuccess()); })
            .catch(() => { dispatch(deleteClientError()); });
    };

    return (
        <ClientStateContext.Provider value={state}>
            <ClientActionContext.Provider value={{ getClients, getClient, getClientStats, createClient, updateClient, deleteClient }}>
                {children}
            </ClientActionContext.Provider>
        </ClientStateContext.Provider>
    );
};

export const useClientState = () => {
    const context = useContext(ClientStateContext);
    if (context === undefined) throw new Error("useClientState must be used within a ClientProvider");
    return context;
};

export const useClientActions = () => {
    const context = useContext(ClientActionContext);
    if (context === undefined) throw new Error("useClientActions must be used within a ClientProvider");
    return context;
};
