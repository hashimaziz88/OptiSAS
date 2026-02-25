import { createAction } from "redux-actions";
import { IContractStateContext, IContractDto, IContractRenewalDto } from "./context";
import { IPagedResult } from "@/types/api";

export enum ContractActionEnums {
    getContractsPending = "GET_CONTRACTS_PENDING",
    getContractsSuccess = "GET_CONTRACTS_SUCCESS",
    getContractsError = "GET_CONTRACTS_ERROR",

    getContractPending = "GET_CONTRACT_PENDING",
    getContractSuccess = "GET_CONTRACT_SUCCESS",
    getContractError = "GET_CONTRACT_ERROR",

    createContractPending = "CREATE_CONTRACT_PENDING",
    createContractSuccess = "CREATE_CONTRACT_SUCCESS",
    createContractError = "CREATE_CONTRACT_ERROR",

    updateContractPending = "UPDATE_CONTRACT_PENDING",
    updateContractSuccess = "UPDATE_CONTRACT_SUCCESS",
    updateContractError = "UPDATE_CONTRACT_ERROR",

    deleteContractPending = "DELETE_CONTRACT_PENDING",
    deleteContractSuccess = "DELETE_CONTRACT_SUCCESS",
    deleteContractError = "DELETE_CONTRACT_ERROR",

    getExpiringContractsPending = "GET_EXPIRING_CONTRACTS_PENDING",
    getExpiringContractsSuccess = "GET_EXPIRING_CONTRACTS_SUCCESS",
    getExpiringContractsError = "GET_EXPIRING_CONTRACTS_ERROR",

    getClientContractsPending = "GET_CLIENT_CONTRACTS_PENDING",
    getClientContractsSuccess = "GET_CLIENT_CONTRACTS_SUCCESS",
    getClientContractsError = "GET_CLIENT_CONTRACTS_ERROR",

    activateContractPending = "ACTIVATE_CONTRACT_PENDING",
    activateContractSuccess = "ACTIVATE_CONTRACT_SUCCESS",
    activateContractError = "ACTIVATE_CONTRACT_ERROR",

    cancelContractPending = "CANCEL_CONTRACT_PENDING",
    cancelContractSuccess = "CANCEL_CONTRACT_SUCCESS",
    cancelContractError = "CANCEL_CONTRACT_ERROR",

    createRenewalPending = "CREATE_RENEWAL_PENDING",
    createRenewalSuccess = "CREATE_RENEWAL_SUCCESS",
    createRenewalError = "CREATE_RENEWAL_ERROR",

    completeRenewalPending = "COMPLETE_RENEWAL_PENDING",
    completeRenewalSuccess = "COMPLETE_RENEWAL_SUCCESS",
    completeRenewalError = "COMPLETE_RENEWAL_ERROR",
}

export const getContractsPending = createAction<IContractStateContext>(ContractActionEnums.getContractsPending, () => ({ isPending: true, isError: false, isSuccess: false }));
export const getContractsSuccess = createAction<IContractStateContext, IPagedResult<IContractDto>>(ContractActionEnums.getContractsSuccess, (pagedResult) => ({ isPending: false, isError: false, isSuccess: true, pagedResult }));
export const getContractsError = createAction<IContractStateContext>(ContractActionEnums.getContractsError, () => ({ isPending: false, isError: true, isSuccess: false }));

export const getContractPending = createAction<IContractStateContext>(ContractActionEnums.getContractPending, () => ({ isPending: true, isError: false, isSuccess: false }));
export const getContractSuccess = createAction<IContractStateContext, IContractDto>(ContractActionEnums.getContractSuccess, (currentContract) => ({ isPending: false, isError: false, isSuccess: true, currentContract }));
export const getContractError = createAction<IContractStateContext>(ContractActionEnums.getContractError, () => ({ isPending: false, isError: true, isSuccess: false }));

export const createContractPending = createAction<IContractStateContext>(ContractActionEnums.createContractPending, () => ({ isPending: true, isError: false, isSuccess: false }));
export const createContractSuccess = createAction<IContractStateContext, IContractDto>(ContractActionEnums.createContractSuccess, (currentContract) => ({ isPending: false, isError: false, isSuccess: true, currentContract }));
export const createContractError = createAction<IContractStateContext>(ContractActionEnums.createContractError, () => ({ isPending: false, isError: true, isSuccess: false }));

export const updateContractPending = createAction<IContractStateContext>(ContractActionEnums.updateContractPending, () => ({ isPending: true, isError: false, isSuccess: false }));
export const updateContractSuccess = createAction<IContractStateContext, IContractDto>(ContractActionEnums.updateContractSuccess, (currentContract) => ({ isPending: false, isError: false, isSuccess: true, currentContract }));
export const updateContractError = createAction<IContractStateContext>(ContractActionEnums.updateContractError, () => ({ isPending: false, isError: true, isSuccess: false }));

export const deleteContractPending = createAction<IContractStateContext>(ContractActionEnums.deleteContractPending, () => ({ isPending: true, isError: false, isSuccess: false }));
export const deleteContractSuccess = createAction<IContractStateContext>(ContractActionEnums.deleteContractSuccess, () => ({ isPending: false, isError: false, isSuccess: true, currentContract: null }));
export const deleteContractError = createAction<IContractStateContext>(ContractActionEnums.deleteContractError, () => ({ isPending: false, isError: true, isSuccess: false }));

export const getExpiringContractsPending = createAction<IContractStateContext>(ContractActionEnums.getExpiringContractsPending, () => ({ isPending: true, isError: false, isSuccess: false }));
export const getExpiringContractsSuccess = createAction<IContractStateContext, IPagedResult<IContractDto>>(ContractActionEnums.getExpiringContractsSuccess, (expiringContracts) => ({ isPending: false, isError: false, isSuccess: true, expiringContracts }));
export const getExpiringContractsError = createAction<IContractStateContext>(ContractActionEnums.getExpiringContractsError, () => ({ isPending: false, isError: true, isSuccess: false }));

export const getClientContractsPending = createAction<IContractStateContext>(ContractActionEnums.getClientContractsPending, () => ({ isPending: true, isError: false, isSuccess: false }));
export const getClientContractsSuccess = createAction<IContractStateContext, IPagedResult<IContractDto>>(ContractActionEnums.getClientContractsSuccess, (pagedResult) => ({ isPending: false, isError: false, isSuccess: true, pagedResult }));
export const getClientContractsError = createAction<IContractStateContext>(ContractActionEnums.getClientContractsError, () => ({ isPending: false, isError: true, isSuccess: false }));

export const activateContractPending = createAction<IContractStateContext>(ContractActionEnums.activateContractPending, () => ({ isPending: true, isError: false, isSuccess: false }));
export const activateContractSuccess = createAction<IContractStateContext, IContractDto>(ContractActionEnums.activateContractSuccess, (currentContract) => ({ isPending: false, isError: false, isSuccess: true, currentContract }));
export const activateContractError = createAction<IContractStateContext>(ContractActionEnums.activateContractError, () => ({ isPending: false, isError: true, isSuccess: false }));

export const cancelContractPending = createAction<IContractStateContext>(ContractActionEnums.cancelContractPending, () => ({ isPending: true, isError: false, isSuccess: false }));
export const cancelContractSuccess = createAction<IContractStateContext, IContractDto>(ContractActionEnums.cancelContractSuccess, (currentContract) => ({ isPending: false, isError: false, isSuccess: true, currentContract }));
export const cancelContractError = createAction<IContractStateContext>(ContractActionEnums.cancelContractError, () => ({ isPending: false, isError: true, isSuccess: false }));

export const createRenewalPending = createAction<IContractStateContext>(ContractActionEnums.createRenewalPending, () => ({ isPending: true, isError: false, isSuccess: false }));
export const createRenewalSuccess = createAction<IContractStateContext, IContractRenewalDto>(ContractActionEnums.createRenewalSuccess, (currentRenewal) => ({ isPending: false, isError: false, isSuccess: true, currentRenewal }));
export const createRenewalError = createAction<IContractStateContext>(ContractActionEnums.createRenewalError, () => ({ isPending: false, isError: true, isSuccess: false }));

export const completeRenewalPending = createAction<IContractStateContext>(ContractActionEnums.completeRenewalPending, () => ({ isPending: true, isError: false, isSuccess: false }));
export const completeRenewalSuccess = createAction<IContractStateContext, IContractRenewalDto>(ContractActionEnums.completeRenewalSuccess, (currentRenewal) => ({ isPending: false, isError: false, isSuccess: true, currentRenewal }));
export const completeRenewalError = createAction<IContractStateContext>(ContractActionEnums.completeRenewalError, () => ({ isPending: false, isError: true, isSuccess: false }));
