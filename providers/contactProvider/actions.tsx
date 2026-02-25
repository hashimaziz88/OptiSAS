import { createAction } from "redux-actions";
import { IContactStateContext, IContactDto } from "./context";
import { IPagedResult } from "@/types/api";

export enum ContactActionEnums {
    getContactsPending = "GET_CONTACTS_PENDING",
    getContactsSuccess = "GET_CONTACTS_SUCCESS",
    getContactsError = "GET_CONTACTS_ERROR",

    getContactsByClientPending = "GET_CONTACTS_BY_CLIENT_PENDING",
    getContactsByClientSuccess = "GET_CONTACTS_BY_CLIENT_SUCCESS",
    getContactsByClientError = "GET_CONTACTS_BY_CLIENT_ERROR",

    getContactPending = "GET_CONTACT_PENDING",
    getContactSuccess = "GET_CONTACT_SUCCESS",
    getContactError = "GET_CONTACT_ERROR",

    createContactPending = "CREATE_CONTACT_PENDING",
    createContactSuccess = "CREATE_CONTACT_SUCCESS",
    createContactError = "CREATE_CONTACT_ERROR",

    updateContactPending = "UPDATE_CONTACT_PENDING",
    updateContactSuccess = "UPDATE_CONTACT_SUCCESS",
    updateContactError = "UPDATE_CONTACT_ERROR",

    deleteContactPending = "DELETE_CONTACT_PENDING",
    deleteContactSuccess = "DELETE_CONTACT_SUCCESS",
    deleteContactError = "DELETE_CONTACT_ERROR",

    setContactPrimaryPending = "SET_CONTACT_PRIMARY_PENDING",
    setContactPrimarySuccess = "SET_CONTACT_PRIMARY_SUCCESS",
    setContactPrimaryError = "SET_CONTACT_PRIMARY_ERROR",
}

export const getContactsPending = createAction<IContactStateContext>(ContactActionEnums.getContactsPending, () => ({ isPending: true, isError: false, isSuccess: false }));
export const getContactsSuccess = createAction<IContactStateContext, IPagedResult<IContactDto>>(ContactActionEnums.getContactsSuccess, (pagedResult) => ({ isPending: false, isError: false, isSuccess: true, pagedResult }));
export const getContactsError = createAction<IContactStateContext>(ContactActionEnums.getContactsError, () => ({ isPending: false, isError: true, isSuccess: false }));

export const getContactsByClientPending = createAction<IContactStateContext>(ContactActionEnums.getContactsByClientPending, () => ({ isPending: true, isError: false, isSuccess: false }));
export const getContactsByClientSuccess = createAction<IContactStateContext, IContactDto[]>(ContactActionEnums.getContactsByClientSuccess, (clientContacts) => ({ isPending: false, isError: false, isSuccess: true, clientContacts }));
export const getContactsByClientError = createAction<IContactStateContext>(ContactActionEnums.getContactsByClientError, () => ({ isPending: false, isError: true, isSuccess: false }));

export const getContactPending = createAction<IContactStateContext>(ContactActionEnums.getContactPending, () => ({ isPending: true, isError: false, isSuccess: false }));
export const getContactSuccess = createAction<IContactStateContext, IContactDto>(ContactActionEnums.getContactSuccess, (currentContact) => ({ isPending: false, isError: false, isSuccess: true, currentContact }));
export const getContactError = createAction<IContactStateContext>(ContactActionEnums.getContactError, () => ({ isPending: false, isError: true, isSuccess: false }));

export const createContactPending = createAction<IContactStateContext>(ContactActionEnums.createContactPending, () => ({ isPending: true, isError: false, isSuccess: false }));
export const createContactSuccess = createAction<IContactStateContext, IContactDto>(ContactActionEnums.createContactSuccess, (currentContact) => ({ isPending: false, isError: false, isSuccess: true, currentContact }));
export const createContactError = createAction<IContactStateContext>(ContactActionEnums.createContactError, () => ({ isPending: false, isError: true, isSuccess: false }));

export const updateContactPending = createAction<IContactStateContext>(ContactActionEnums.updateContactPending, () => ({ isPending: true, isError: false, isSuccess: false }));
export const updateContactSuccess = createAction<IContactStateContext, IContactDto>(ContactActionEnums.updateContactSuccess, (currentContact) => ({ isPending: false, isError: false, isSuccess: true, currentContact }));
export const updateContactError = createAction<IContactStateContext>(ContactActionEnums.updateContactError, () => ({ isPending: false, isError: true, isSuccess: false }));

export const deleteContactPending = createAction<IContactStateContext>(ContactActionEnums.deleteContactPending, () => ({ isPending: true, isError: false, isSuccess: false }));
export const deleteContactSuccess = createAction<IContactStateContext>(ContactActionEnums.deleteContactSuccess, () => ({ isPending: false, isError: false, isSuccess: true, currentContact: null }));
export const deleteContactError = createAction<IContactStateContext>(ContactActionEnums.deleteContactError, () => ({ isPending: false, isError: true, isSuccess: false }));

export const setContactPrimaryPending = createAction<IContactStateContext>(ContactActionEnums.setContactPrimaryPending, () => ({ isPending: true, isError: false, isSuccess: false }));
export const setContactPrimarySuccess = createAction<IContactStateContext>(ContactActionEnums.setContactPrimarySuccess, () => ({ isPending: false, isError: false, isSuccess: true }));
export const setContactPrimaryError = createAction<IContactStateContext>(ContactActionEnums.setContactPrimaryError, () => ({ isPending: false, isError: true, isSuccess: false }));
