"use client";
import React, { useReducer, useContext } from "react";
import {
    INITIAL_STATE,
    DocumentStateContext,
    DocumentActionContext,
    IGetDocumentsParams,
} from "./context";
import { DocumentReducer } from "./reducer";
import {
    getDocumentsPending, getDocumentsSuccess, getDocumentsError,
    getDocumentPending, getDocumentSuccess, getDocumentError,
    uploadDocumentPending, uploadDocumentSuccess, uploadDocumentError,
    downloadDocumentPending, downloadDocumentSuccess, downloadDocumentError,
    deleteDocumentPending, deleteDocumentSuccess, deleteDocumentError,
} from "./actions";
import { axiosInstance } from "@/utils/axiosInstance";

const BASE_URL = process.env.NEXT_PUBLIC_API_LINK;

export const DocumentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [state, dispatch] = useReducer(DocumentReducer, INITIAL_STATE);

    const getDocuments = async (params?: IGetDocumentsParams) => {
        const instance = axiosInstance();
        dispatch(getDocumentsPending());
        await instance.get(`${BASE_URL}/api/Documents`, { params })
            .then((response) => { dispatch(getDocumentsSuccess(response.data)); })
            .catch(() => { dispatch(getDocumentsError()); });
    };

    const getDocument = async (id: string) => {
        const instance = axiosInstance();
        dispatch(getDocumentPending());
        await instance.get(`${BASE_URL}/api/Documents/${id}`)
            .then((response) => { dispatch(getDocumentSuccess(response.data)); })
            .catch(() => { dispatch(getDocumentError()); });
    };

    const uploadDocument = async (formData: FormData) => {
        const instance = axiosInstance();
        dispatch(uploadDocumentPending());
        await instance.post(`${BASE_URL}/api/Documents/upload`, formData, { headers: { 'Content-Type': 'multipart/form-data' } })
            .then((response) => { dispatch(uploadDocumentSuccess(response.data)); })
            .catch(() => { dispatch(uploadDocumentError()); });
    };

    const downloadDocument = async (id: string) => {
        const instance = axiosInstance();
        dispatch(downloadDocumentPending());
        await instance.get(`${BASE_URL}/api/Documents/${id}/download`, { responseType: 'blob' })
            .then((response) => { dispatch(downloadDocumentSuccess(response.data)); })
            .catch(() => { dispatch(downloadDocumentError()); });
    };

    const deleteDocument = async (id: string) => {
        const instance = axiosInstance();
        dispatch(deleteDocumentPending());
        await instance.delete(`${BASE_URL}/api/Documents/${id}`)
            .then(() => { dispatch(deleteDocumentSuccess()); })
            .catch(() => { dispatch(deleteDocumentError()); });
    };

    return (
        <DocumentStateContext.Provider value={state}>
            <DocumentActionContext.Provider value={{ getDocuments, getDocument, uploadDocument, downloadDocument, deleteDocument }}>
                {children}
            </DocumentActionContext.Provider>
        </DocumentStateContext.Provider>
    );
};

export const useDocumentState = () => {
    const context = useContext(DocumentStateContext);
    if (context === undefined) throw new Error("useDocumentState must be used within a DocumentProvider");
    return context;
};

export const useDocumentActions = () => {
    const context = useContext(DocumentActionContext);
    if (context === undefined) throw new Error("useDocumentActions must be used within a DocumentProvider");
    return context;
};
