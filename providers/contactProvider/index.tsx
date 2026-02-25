"use client";
import React, { useReducer, useContext } from "react";
import {
    INITIAL_STATE,
    ContactStateContext,
    ContactActionContext,
    ICreateContactDto,
    IUpdateContactDto,
    IGetContactsParams,
} from "./context";
import { ContactReducer } from "./reducer";
import {
    getContactsPending, getContactsSuccess, getContactsError,
    getContactsByClientPending, getContactsByClientSuccess, getContactsByClientError,
    getContactPending, getContactSuccess, getContactError,
    createContactPending, createContactSuccess, createContactError,
    updateContactPending, updateContactSuccess, updateContactError,
    deleteContactPending, deleteContactSuccess, deleteContactError,
    setContactPrimaryPending, setContactPrimarySuccess, setContactPrimaryError,
} from "./actions";
import { axiosInstance } from "@/utils/axiosInstance";

const BASE_URL = process.env.NEXT_PUBLIC_API_LINK;

export const ContactProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [state, dispatch] = useReducer(ContactReducer, INITIAL_STATE);

    const getContacts = async (params?: IGetContactsParams) => {
        const instance = axiosInstance();
        dispatch(getContactsPending());
        await instance.get(`${BASE_URL}/api/Contacts`, { params })
            .then((response) => { dispatch(getContactsSuccess(response.data)); })
            .catch(() => { dispatch(getContactsError()); });
    };

    const getContactsByClient = async (clientId: string) => {
        const instance = axiosInstance();
        dispatch(getContactsByClientPending());
        await instance.get(`${BASE_URL}/api/Contacts/by-client/${clientId}`)
            .then((response) => { dispatch(getContactsByClientSuccess(response.data)); })
            .catch(() => { dispatch(getContactsByClientError()); });
    };

    const getContact = async (id: string) => {
        const instance = axiosInstance();
        dispatch(getContactPending());
        await instance.get(`${BASE_URL}/api/Contacts/${id}`)
            .then((response) => { dispatch(getContactSuccess(response.data)); })
            .catch(() => { dispatch(getContactError()); });
    };

    const createContact = async (payload: ICreateContactDto) => {
        const instance = axiosInstance();
        dispatch(createContactPending());
        await instance.post(`${BASE_URL}/api/Contacts`, payload)
            .then((response) => { dispatch(createContactSuccess(response.data)); })
            .catch(() => { dispatch(createContactError()); });
    };

    const updateContact = async (id: string, payload: IUpdateContactDto) => {
        const instance = axiosInstance();
        dispatch(updateContactPending());
        await instance.put(`${BASE_URL}/api/Contacts/${id}`, payload)
            .then((response) => { dispatch(updateContactSuccess(response.data)); })
            .catch(() => { dispatch(updateContactError()); });
    };

    const deleteContact = async (id: string) => {
        const instance = axiosInstance();
        dispatch(deleteContactPending());
        await instance.delete(`${BASE_URL}/api/Contacts/${id}`)
            .then(() => { dispatch(deleteContactSuccess()); })
            .catch(() => { dispatch(deleteContactError()); });
    };

    const setContactPrimary = async (id: string) => {
        const instance = axiosInstance();
        dispatch(setContactPrimaryPending());
        await instance.put(`${BASE_URL}/api/Contacts/${id}/set-primary`)
            .then(() => { dispatch(setContactPrimarySuccess()); })
            .catch(() => { dispatch(setContactPrimaryError()); });
    };

    return (
        <ContactStateContext.Provider value={state}>
            <ContactActionContext.Provider value={{ getContacts, getContactsByClient, getContact, createContact, updateContact, deleteContact, setContactPrimary }}>
                {children}
            </ContactActionContext.Provider>
        </ContactStateContext.Provider>
    );
};

export const useContactState = () => {
    const context = useContext(ContactStateContext);
    if (context === undefined) throw new Error("useContactState must be used within a ContactProvider");
    return context;
};

export const useContactActions = () => {
    const context = useContext(ContactActionContext);
    if (context === undefined) throw new Error("useContactActions must be used within a ContactProvider");
    return context;
};
