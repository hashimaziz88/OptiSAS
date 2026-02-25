import { createAction } from "redux-actions";
import { IClientStateContext, IClientDto, IClientStatsDto } from "./context";
import { IPagedResult } from "@/types/api";

export enum ClientActionEnums {
    getClientsPending = "GET_CLIENTS_PENDING",
    getClientsSuccess = "GET_CLIENTS_SUCCESS",
    getClientsError = "GET_CLIENTS_ERROR",

    getClientPending = "GET_CLIENT_PENDING",
    getClientSuccess = "GET_CLIENT_SUCCESS",
    getClientError = "GET_CLIENT_ERROR",

    getClientStatsPending = "GET_CLIENT_STATS_PENDING",
    getClientStatsSuccess = "GET_CLIENT_STATS_SUCCESS",
    getClientStatsError = "GET_CLIENT_STATS_ERROR",

    createClientPending = "CREATE_CLIENT_PENDING",
    createClientSuccess = "CREATE_CLIENT_SUCCESS",
    createClientError = "CREATE_CLIENT_ERROR",

    updateClientPending = "UPDATE_CLIENT_PENDING",
    updateClientSuccess = "UPDATE_CLIENT_SUCCESS",
    updateClientError = "UPDATE_CLIENT_ERROR",

    deleteClientPending = "DELETE_CLIENT_PENDING",
    deleteClientSuccess = "DELETE_CLIENT_SUCCESS",
    deleteClientError = "DELETE_CLIENT_ERROR",
}

export const getClientsPending = createAction<IClientStateContext>(ClientActionEnums.getClientsPending, () => ({ isPending: true, isError: false, isSuccess: false }));
export const getClientsSuccess = createAction<IClientStateContext, IPagedResult<IClientDto>>(ClientActionEnums.getClientsSuccess, (pagedResult) => ({ isPending: false, isError: false, isSuccess: true, pagedResult }));
export const getClientsError = createAction<IClientStateContext>(ClientActionEnums.getClientsError, () => ({ isPending: false, isError: true, isSuccess: false }));

export const getClientPending = createAction<IClientStateContext>(ClientActionEnums.getClientPending, () => ({ isPending: true, isError: false, isSuccess: false }));
export const getClientSuccess = createAction<IClientStateContext, IClientDto>(ClientActionEnums.getClientSuccess, (currentClient) => ({ isPending: false, isError: false, isSuccess: true, currentClient }));
export const getClientError = createAction<IClientStateContext>(ClientActionEnums.getClientError, () => ({ isPending: false, isError: true, isSuccess: false }));

export const getClientStatsPending = createAction<IClientStateContext>(ClientActionEnums.getClientStatsPending, () => ({ isPending: true, isError: false, isSuccess: false }));
export const getClientStatsSuccess = createAction<IClientStateContext, IClientStatsDto>(ClientActionEnums.getClientStatsSuccess, (clientStats) => ({ isPending: false, isError: false, isSuccess: true, clientStats }));
export const getClientStatsError = createAction<IClientStateContext>(ClientActionEnums.getClientStatsError, () => ({ isPending: false, isError: true, isSuccess: false }));

export const createClientPending = createAction<IClientStateContext>(ClientActionEnums.createClientPending, () => ({ isPending: true, isError: false, isSuccess: false }));
export const createClientSuccess = createAction<IClientStateContext, IClientDto>(ClientActionEnums.createClientSuccess, (currentClient) => ({ isPending: false, isError: false, isSuccess: true, currentClient }));
export const createClientError = createAction<IClientStateContext>(ClientActionEnums.createClientError, () => ({ isPending: false, isError: true, isSuccess: false }));

export const updateClientPending = createAction<IClientStateContext>(ClientActionEnums.updateClientPending, () => ({ isPending: true, isError: false, isSuccess: false }));
export const updateClientSuccess = createAction<IClientStateContext, IClientDto>(ClientActionEnums.updateClientSuccess, (currentClient) => ({ isPending: false, isError: false, isSuccess: true, currentClient }));
export const updateClientError = createAction<IClientStateContext>(ClientActionEnums.updateClientError, () => ({ isPending: false, isError: true, isSuccess: false }));

export const deleteClientPending = createAction<IClientStateContext>(ClientActionEnums.deleteClientPending, () => ({ isPending: true, isError: false, isSuccess: false }));
export const deleteClientSuccess = createAction<IClientStateContext>(ClientActionEnums.deleteClientSuccess, () => ({ isPending: false, isError: false, isSuccess: true, currentClient: null }));
export const deleteClientError = createAction<IClientStateContext>(ClientActionEnums.deleteClientError, () => ({ isPending: false, isError: true, isSuccess: false }));
