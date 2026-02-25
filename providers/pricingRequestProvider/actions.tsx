import { createAction } from "redux-actions";
import { IPricingRequestStateContext, IPricingRequestDto } from "./context";
import { IPagedResult } from "@/types/api";

export enum PricingRequestActionEnums {
    getPricingRequestsPending = "GET_PRICING_REQUESTS_PENDING",
    getPricingRequestsSuccess = "GET_PRICING_REQUESTS_SUCCESS",
    getPricingRequestsError = "GET_PRICING_REQUESTS_ERROR",

    getPendingPricingRequestsPending = "GET_PENDING_PRICING_REQUESTS_PENDING",
    getPendingPricingRequestsSuccess = "GET_PENDING_PRICING_REQUESTS_SUCCESS",
    getPendingPricingRequestsError = "GET_PENDING_PRICING_REQUESTS_ERROR",

    getMyPricingRequestsPending = "GET_MY_PRICING_REQUESTS_PENDING",
    getMyPricingRequestsSuccess = "GET_MY_PRICING_REQUESTS_SUCCESS",
    getMyPricingRequestsError = "GET_MY_PRICING_REQUESTS_ERROR",

    getPricingRequestPending = "GET_PRICING_REQUEST_PENDING",
    getPricingRequestSuccess = "GET_PRICING_REQUEST_SUCCESS",
    getPricingRequestError = "GET_PRICING_REQUEST_ERROR",

    createPricingRequestPending = "CREATE_PRICING_REQUEST_PENDING",
    createPricingRequestSuccess = "CREATE_PRICING_REQUEST_SUCCESS",
    createPricingRequestError = "CREATE_PRICING_REQUEST_ERROR",

    updatePricingRequestPending = "UPDATE_PRICING_REQUEST_PENDING",
    updatePricingRequestSuccess = "UPDATE_PRICING_REQUEST_SUCCESS",
    updatePricingRequestError = "UPDATE_PRICING_REQUEST_ERROR",

    deletePricingRequestPending = "DELETE_PRICING_REQUEST_PENDING",
    deletePricingRequestSuccess = "DELETE_PRICING_REQUEST_SUCCESS",
    deletePricingRequestError = "DELETE_PRICING_REQUEST_ERROR",

    assignPricingRequestPending = "ASSIGN_PRICING_REQUEST_PENDING",
    assignPricingRequestSuccess = "ASSIGN_PRICING_REQUEST_SUCCESS",
    assignPricingRequestError = "ASSIGN_PRICING_REQUEST_ERROR",

    completePricingRequestPending = "COMPLETE_PRICING_REQUEST_PENDING",
    completePricingRequestSuccess = "COMPLETE_PRICING_REQUEST_SUCCESS",
    completePricingRequestError = "COMPLETE_PRICING_REQUEST_ERROR",
}

export const getPricingRequestsPending = createAction<IPricingRequestStateContext>(PricingRequestActionEnums.getPricingRequestsPending, () => ({ isPending: true, isError: false, isSuccess: false }));
export const getPricingRequestsSuccess = createAction<IPricingRequestStateContext, IPagedResult<IPricingRequestDto>>(PricingRequestActionEnums.getPricingRequestsSuccess, (pagedResult) => ({ isPending: false, isError: false, isSuccess: true, pagedResult }));
export const getPricingRequestsError = createAction<IPricingRequestStateContext>(PricingRequestActionEnums.getPricingRequestsError, () => ({ isPending: false, isError: true, isSuccess: false }));

export const getPendingPricingRequestsPending = createAction<IPricingRequestStateContext>(PricingRequestActionEnums.getPendingPricingRequestsPending, () => ({ isPending: true, isError: false, isSuccess: false }));
export const getPendingPricingRequestsSuccess = createAction<IPricingRequestStateContext, IPagedResult<IPricingRequestDto>>(PricingRequestActionEnums.getPendingPricingRequestsSuccess, (pendingRequests) => ({ isPending: false, isError: false, isSuccess: true, pendingRequests }));
export const getPendingPricingRequestsError = createAction<IPricingRequestStateContext>(PricingRequestActionEnums.getPendingPricingRequestsError, () => ({ isPending: false, isError: true, isSuccess: false }));

export const getMyPricingRequestsPending = createAction<IPricingRequestStateContext>(PricingRequestActionEnums.getMyPricingRequestsPending, () => ({ isPending: true, isError: false, isSuccess: false }));
export const getMyPricingRequestsSuccess = createAction<IPricingRequestStateContext, IPagedResult<IPricingRequestDto>>(PricingRequestActionEnums.getMyPricingRequestsSuccess, (myRequests) => ({ isPending: false, isError: false, isSuccess: true, myRequests }));
export const getMyPricingRequestsError = createAction<IPricingRequestStateContext>(PricingRequestActionEnums.getMyPricingRequestsError, () => ({ isPending: false, isError: true, isSuccess: false }));

export const getPricingRequestPending = createAction<IPricingRequestStateContext>(PricingRequestActionEnums.getPricingRequestPending, () => ({ isPending: true, isError: false, isSuccess: false }));
export const getPricingRequestSuccess = createAction<IPricingRequestStateContext, IPricingRequestDto>(PricingRequestActionEnums.getPricingRequestSuccess, (currentRequest) => ({ isPending: false, isError: false, isSuccess: true, currentRequest }));
export const getPricingRequestError = createAction<IPricingRequestStateContext>(PricingRequestActionEnums.getPricingRequestError, () => ({ isPending: false, isError: true, isSuccess: false }));

export const createPricingRequestPending = createAction<IPricingRequestStateContext>(PricingRequestActionEnums.createPricingRequestPending, () => ({ isPending: true, isError: false, isSuccess: false }));
export const createPricingRequestSuccess = createAction<IPricingRequestStateContext, IPricingRequestDto>(PricingRequestActionEnums.createPricingRequestSuccess, (currentRequest) => ({ isPending: false, isError: false, isSuccess: true, currentRequest }));
export const createPricingRequestError = createAction<IPricingRequestStateContext>(PricingRequestActionEnums.createPricingRequestError, () => ({ isPending: false, isError: true, isSuccess: false }));

export const updatePricingRequestPending = createAction<IPricingRequestStateContext>(PricingRequestActionEnums.updatePricingRequestPending, () => ({ isPending: true, isError: false, isSuccess: false }));
export const updatePricingRequestSuccess = createAction<IPricingRequestStateContext, IPricingRequestDto>(PricingRequestActionEnums.updatePricingRequestSuccess, (currentRequest) => ({ isPending: false, isError: false, isSuccess: true, currentRequest }));
export const updatePricingRequestError = createAction<IPricingRequestStateContext>(PricingRequestActionEnums.updatePricingRequestError, () => ({ isPending: false, isError: true, isSuccess: false }));

export const deletePricingRequestPending = createAction<IPricingRequestStateContext>(PricingRequestActionEnums.deletePricingRequestPending, () => ({ isPending: true, isError: false, isSuccess: false }));
export const deletePricingRequestSuccess = createAction<IPricingRequestStateContext>(PricingRequestActionEnums.deletePricingRequestSuccess, () => ({ isPending: false, isError: false, isSuccess: true, currentRequest: null }));
export const deletePricingRequestError = createAction<IPricingRequestStateContext>(PricingRequestActionEnums.deletePricingRequestError, () => ({ isPending: false, isError: true, isSuccess: false }));

export const assignPricingRequestPending = createAction<IPricingRequestStateContext>(PricingRequestActionEnums.assignPricingRequestPending, () => ({ isPending: true, isError: false, isSuccess: false }));
export const assignPricingRequestSuccess = createAction<IPricingRequestStateContext, IPricingRequestDto>(PricingRequestActionEnums.assignPricingRequestSuccess, (currentRequest) => ({ isPending: false, isError: false, isSuccess: true, currentRequest }));
export const assignPricingRequestError = createAction<IPricingRequestStateContext>(PricingRequestActionEnums.assignPricingRequestError, () => ({ isPending: false, isError: true, isSuccess: false }));

export const completePricingRequestPending = createAction<IPricingRequestStateContext>(PricingRequestActionEnums.completePricingRequestPending, () => ({ isPending: true, isError: false, isSuccess: false }));
export const completePricingRequestSuccess = createAction<IPricingRequestStateContext, IPricingRequestDto>(PricingRequestActionEnums.completePricingRequestSuccess, (currentRequest) => ({ isPending: false, isError: false, isSuccess: true, currentRequest }));
export const completePricingRequestError = createAction<IPricingRequestStateContext>(PricingRequestActionEnums.completePricingRequestError, () => ({ isPending: false, isError: true, isSuccess: false }));
