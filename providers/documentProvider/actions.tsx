import { createAction } from "redux-actions";
import { IDocumentStateContext, IDocumentDto } from "./context";
import { IPagedResult } from "@/types/api";

export enum DocumentActionEnums {
    getDocumentsPending = "GET_DOCUMENTS_PENDING",
    getDocumentsSuccess = "GET_DOCUMENTS_SUCCESS",
    getDocumentsError = "GET_DOCUMENTS_ERROR",

    getDocumentPending = "GET_DOCUMENT_PENDING",
    getDocumentSuccess = "GET_DOCUMENT_SUCCESS",
    getDocumentError = "GET_DOCUMENT_ERROR",

    uploadDocumentPending = "UPLOAD_DOCUMENT_PENDING",
    uploadDocumentSuccess = "UPLOAD_DOCUMENT_SUCCESS",
    uploadDocumentError = "UPLOAD_DOCUMENT_ERROR",

    downloadDocumentPending = "DOWNLOAD_DOCUMENT_PENDING",
    downloadDocumentSuccess = "DOWNLOAD_DOCUMENT_SUCCESS",
    downloadDocumentError = "DOWNLOAD_DOCUMENT_ERROR",

    deleteDocumentPending = "DELETE_DOCUMENT_PENDING",
    deleteDocumentSuccess = "DELETE_DOCUMENT_SUCCESS",
    deleteDocumentError = "DELETE_DOCUMENT_ERROR",
}

export const getDocumentsPending = createAction<IDocumentStateContext>(DocumentActionEnums.getDocumentsPending, () => ({ isPending: true, isError: false, isSuccess: false }));
export const getDocumentsSuccess = createAction<IDocumentStateContext, IPagedResult<IDocumentDto>>(DocumentActionEnums.getDocumentsSuccess, (pagedResult) => ({ isPending: false, isError: false, isSuccess: true, pagedResult }));
export const getDocumentsError = createAction<IDocumentStateContext>(DocumentActionEnums.getDocumentsError, () => ({ isPending: false, isError: true, isSuccess: false }));

export const getDocumentPending = createAction<IDocumentStateContext>(DocumentActionEnums.getDocumentPending, () => ({ isPending: true, isError: false, isSuccess: false }));
export const getDocumentSuccess = createAction<IDocumentStateContext, IDocumentDto>(DocumentActionEnums.getDocumentSuccess, (currentDocument) => ({ isPending: false, isError: false, isSuccess: true, currentDocument }));
export const getDocumentError = createAction<IDocumentStateContext>(DocumentActionEnums.getDocumentError, () => ({ isPending: false, isError: true, isSuccess: false }));

export const uploadDocumentPending = createAction<IDocumentStateContext>(DocumentActionEnums.uploadDocumentPending, () => ({ isPending: true, isError: false, isSuccess: false }));
export const uploadDocumentSuccess = createAction<IDocumentStateContext, IDocumentDto>(DocumentActionEnums.uploadDocumentSuccess, (currentDocument) => ({ isPending: false, isError: false, isSuccess: true, currentDocument }));
export const uploadDocumentError = createAction<IDocumentStateContext>(DocumentActionEnums.uploadDocumentError, () => ({ isPending: false, isError: true, isSuccess: false }));

export const downloadDocumentPending = createAction<IDocumentStateContext>(DocumentActionEnums.downloadDocumentPending, () => ({ isPending: true, isError: false, isSuccess: false }));
export const downloadDocumentSuccess = createAction<IDocumentStateContext, Blob>(DocumentActionEnums.downloadDocumentSuccess, (downloadBlob) => ({ isPending: false, isError: false, isSuccess: true, downloadBlob }));
export const downloadDocumentError = createAction<IDocumentStateContext>(DocumentActionEnums.downloadDocumentError, () => ({ isPending: false, isError: true, isSuccess: false }));

export const deleteDocumentPending = createAction<IDocumentStateContext>(DocumentActionEnums.deleteDocumentPending, () => ({ isPending: true, isError: false, isSuccess: false }));
export const deleteDocumentSuccess = createAction<IDocumentStateContext>(DocumentActionEnums.deleteDocumentSuccess, () => ({ isPending: false, isError: false, isSuccess: true, currentDocument: null }));
export const deleteDocumentError = createAction<IDocumentStateContext>(DocumentActionEnums.deleteDocumentError, () => ({ isPending: false, isError: true, isSuccess: false }));
