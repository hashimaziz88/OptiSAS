import { createContext } from "react";
import { IPagedResult } from "@/types/api";

export interface IDocumentDto {
    id: string;
    fileName: string;
    fileSize: number;
    contentType: string;
    category: number;
    categoryName: string;
    relatedToType: number;
    relatedToTypeName: string;
    relatedToId: string;
    description: string;
    uploadedById: string;
    uploadedByName: string;
    createdAt: string;
}

export interface IGetDocumentsParams {
    relatedToType?: number;
    relatedToId?: string;
    category?: number;
    pageNumber?: number;
    pageSize?: number;
}

export interface IDocumentStateContext {
    isPending: boolean;
    isError: boolean;
    isSuccess: boolean;
    pagedResult?: IPagedResult<IDocumentDto> | null;
    currentDocument?: IDocumentDto | null;
    downloadBlob?: Blob | null;
}

export interface IDocumentActionContext {
    getDocuments: (params?: IGetDocumentsParams) => Promise<void>;
    getDocument: (id: string) => Promise<void>;
    uploadDocument: (formData: FormData) => Promise<void>;
    downloadDocument: (id: string) => Promise<void>;
    deleteDocument: (id: string) => Promise<void>;
}

export const INITIAL_STATE: IDocumentStateContext = {
    isPending: false,
    isError: false,
    isSuccess: false,
    pagedResult: null,
    currentDocument: null,
    downloadBlob: null,
};

export const DocumentStateContext = createContext<IDocumentStateContext>(INITIAL_STATE);
export const DocumentActionContext = createContext<IDocumentActionContext>(undefined!);
