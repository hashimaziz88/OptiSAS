import { createAction } from "redux-actions";
import { IProposalStateContext, IProposalDto, IProposalWithLineItemsDto, IProposalLineItemDto } from "./context";
import { IPagedResult } from "@/types/api";

export enum ProposalActionEnums {
    getProposalsPending = "GET_PROPOSALS_PENDING",
    getProposalsSuccess = "GET_PROPOSALS_SUCCESS",
    getProposalsError = "GET_PROPOSALS_ERROR",

    getProposalPending = "GET_PROPOSAL_PENDING",
    getProposalSuccess = "GET_PROPOSAL_SUCCESS",
    getProposalError = "GET_PROPOSAL_ERROR",

    createProposalPending = "CREATE_PROPOSAL_PENDING",
    createProposalSuccess = "CREATE_PROPOSAL_SUCCESS",
    createProposalError = "CREATE_PROPOSAL_ERROR",

    updateProposalPending = "UPDATE_PROPOSAL_PENDING",
    updateProposalSuccess = "UPDATE_PROPOSAL_SUCCESS",
    updateProposalError = "UPDATE_PROPOSAL_ERROR",

    deleteProposalPending = "DELETE_PROPOSAL_PENDING",
    deleteProposalSuccess = "DELETE_PROPOSAL_SUCCESS",
    deleteProposalError = "DELETE_PROPOSAL_ERROR",

    addLineItemPending = "ADD_LINE_ITEM_PENDING",
    addLineItemSuccess = "ADD_LINE_ITEM_SUCCESS",
    addLineItemError = "ADD_LINE_ITEM_ERROR",

    updateLineItemPending = "UPDATE_LINE_ITEM_PENDING",
    updateLineItemSuccess = "UPDATE_LINE_ITEM_SUCCESS",
    updateLineItemError = "UPDATE_LINE_ITEM_ERROR",

    deleteLineItemPending = "DELETE_LINE_ITEM_PENDING",
    deleteLineItemSuccess = "DELETE_LINE_ITEM_SUCCESS",
    deleteLineItemError = "DELETE_LINE_ITEM_ERROR",

    submitProposalPending = "SUBMIT_PROPOSAL_PENDING",
    submitProposalSuccess = "SUBMIT_PROPOSAL_SUCCESS",
    submitProposalError = "SUBMIT_PROPOSAL_ERROR",

    approveProposalPending = "APPROVE_PROPOSAL_PENDING",
    approveProposalSuccess = "APPROVE_PROPOSAL_SUCCESS",
    approveProposalError = "APPROVE_PROPOSAL_ERROR",

    rejectProposalPending = "REJECT_PROPOSAL_PENDING",
    rejectProposalSuccess = "REJECT_PROPOSAL_SUCCESS",
    rejectProposalError = "REJECT_PROPOSAL_ERROR",
}

export const getProposalsPending = createAction<IProposalStateContext>(ProposalActionEnums.getProposalsPending, () => ({ isPending: true, isError: false, isSuccess: false }));
export const getProposalsSuccess = createAction<IProposalStateContext, IPagedResult<IProposalDto>>(ProposalActionEnums.getProposalsSuccess, (pagedResult) => ({ isPending: false, isError: false, isSuccess: true, pagedResult }));
export const getProposalsError = createAction<IProposalStateContext>(ProposalActionEnums.getProposalsError, () => ({ isPending: false, isError: true, isSuccess: false }));

export const getProposalPending = createAction<IProposalStateContext>(ProposalActionEnums.getProposalPending, () => ({ isPending: true, isError: false, isSuccess: false }));
export const getProposalSuccess = createAction<IProposalStateContext, IProposalWithLineItemsDto>(ProposalActionEnums.getProposalSuccess, (currentProposal) => ({ isPending: false, isError: false, isSuccess: true, currentProposal }));
export const getProposalError = createAction<IProposalStateContext>(ProposalActionEnums.getProposalError, () => ({ isPending: false, isError: true, isSuccess: false }));

export const createProposalPending = createAction<IProposalStateContext>(ProposalActionEnums.createProposalPending, () => ({ isPending: true, isError: false, isSuccess: false }));
export const createProposalSuccess = createAction<IProposalStateContext, IProposalWithLineItemsDto>(ProposalActionEnums.createProposalSuccess, (currentProposal) => ({ isPending: false, isError: false, isSuccess: true, currentProposal }));
export const createProposalError = createAction<IProposalStateContext>(ProposalActionEnums.createProposalError, () => ({ isPending: false, isError: true, isSuccess: false }));

export const updateProposalPending = createAction<IProposalStateContext>(ProposalActionEnums.updateProposalPending, () => ({ isPending: true, isError: false, isSuccess: false }));
export const updateProposalSuccess = createAction<IProposalStateContext, IProposalWithLineItemsDto>(ProposalActionEnums.updateProposalSuccess, (currentProposal) => ({ isPending: false, isError: false, isSuccess: true, currentProposal }));
export const updateProposalError = createAction<IProposalStateContext>(ProposalActionEnums.updateProposalError, () => ({ isPending: false, isError: true, isSuccess: false }));

export const deleteProposalPending = createAction<IProposalStateContext>(ProposalActionEnums.deleteProposalPending, () => ({ isPending: true, isError: false, isSuccess: false }));
export const deleteProposalSuccess = createAction<IProposalStateContext>(ProposalActionEnums.deleteProposalSuccess, () => ({ isPending: false, isError: false, isSuccess: true, currentProposal: null }));
export const deleteProposalError = createAction<IProposalStateContext>(ProposalActionEnums.deleteProposalError, () => ({ isPending: false, isError: true, isSuccess: false }));

export const addLineItemPending = createAction<IProposalStateContext>(ProposalActionEnums.addLineItemPending, () => ({ isPending: true, isError: false, isSuccess: false }));
export const addLineItemSuccess = createAction<IProposalStateContext, IProposalLineItemDto>(ProposalActionEnums.addLineItemSuccess, () => ({ isPending: false, isError: false, isSuccess: true }));
export const addLineItemError = createAction<IProposalStateContext>(ProposalActionEnums.addLineItemError, () => ({ isPending: false, isError: true, isSuccess: false }));

export const updateLineItemPending = createAction<IProposalStateContext>(ProposalActionEnums.updateLineItemPending, () => ({ isPending: true, isError: false, isSuccess: false }));
export const updateLineItemSuccess = createAction<IProposalStateContext>(ProposalActionEnums.updateLineItemSuccess, () => ({ isPending: false, isError: false, isSuccess: true }));
export const updateLineItemError = createAction<IProposalStateContext>(ProposalActionEnums.updateLineItemError, () => ({ isPending: false, isError: true, isSuccess: false }));

export const deleteLineItemPending = createAction<IProposalStateContext>(ProposalActionEnums.deleteLineItemPending, () => ({ isPending: true, isError: false, isSuccess: false }));
export const deleteLineItemSuccess = createAction<IProposalStateContext>(ProposalActionEnums.deleteLineItemSuccess, () => ({ isPending: false, isError: false, isSuccess: true }));
export const deleteLineItemError = createAction<IProposalStateContext>(ProposalActionEnums.deleteLineItemError, () => ({ isPending: false, isError: true, isSuccess: false }));

export const submitProposalPending = createAction<IProposalStateContext>(ProposalActionEnums.submitProposalPending, () => ({ isPending: true, isError: false, isSuccess: false }));
export const submitProposalSuccess = createAction<IProposalStateContext, IProposalWithLineItemsDto>(ProposalActionEnums.submitProposalSuccess, (currentProposal) => ({ isPending: false, isError: false, isSuccess: true, currentProposal }));
export const submitProposalError = createAction<IProposalStateContext>(ProposalActionEnums.submitProposalError, () => ({ isPending: false, isError: true, isSuccess: false }));

export const approveProposalPending = createAction<IProposalStateContext>(ProposalActionEnums.approveProposalPending, () => ({ isPending: true, isError: false, isSuccess: false }));
export const approveProposalSuccess = createAction<IProposalStateContext, IProposalWithLineItemsDto>(ProposalActionEnums.approveProposalSuccess, (currentProposal) => ({ isPending: false, isError: false, isSuccess: true, currentProposal }));
export const approveProposalError = createAction<IProposalStateContext>(ProposalActionEnums.approveProposalError, () => ({ isPending: false, isError: true, isSuccess: false }));

export const rejectProposalPending = createAction<IProposalStateContext>(ProposalActionEnums.rejectProposalPending, () => ({ isPending: true, isError: false, isSuccess: false }));
export const rejectProposalSuccess = createAction<IProposalStateContext, IProposalWithLineItemsDto>(ProposalActionEnums.rejectProposalSuccess, (currentProposal) => ({ isPending: false, isError: false, isSuccess: true, currentProposal }));
export const rejectProposalError = createAction<IProposalStateContext>(ProposalActionEnums.rejectProposalError, () => ({ isPending: false, isError: true, isSuccess: false }));
