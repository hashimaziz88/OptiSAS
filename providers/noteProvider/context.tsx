import { createContext } from "react";
import { IPagedResult } from "@/types/api";

export interface INoteDto {
    id: string;
    content: string;
    relatedToType: number;
    relatedToTypeName: string;
    relatedToId: string;
    isPrivate: boolean;
    createdById: string;
    createdByName: string;
    createdAt: string;
    updatedAt: string;
}

export interface ICreateNoteDto {
    content: string;
    relatedToType: number;
    relatedToId: string;
    isPrivate?: boolean;
}

export interface IUpdateNoteDto {
    content?: string;
    isPrivate?: boolean;
}

export interface IGetNotesParams {
    relatedToType?: number;
    relatedToId?: string;
    pageNumber?: number;
    pageSize?: number;
}

export interface INoteStateContext {
    isPending: boolean;
    isError: boolean;
    isSuccess: boolean;
    pagedResult?: IPagedResult<INoteDto> | null;
    currentNote?: INoteDto | null;
}

export interface INoteActionContext {
    getNotes: (params?: IGetNotesParams) => Promise<void>;
    getNote: (id: string) => Promise<void>;
    createNote: (payload: ICreateNoteDto) => Promise<void>;
    updateNote: (id: string, payload: IUpdateNoteDto) => Promise<void>;
    deleteNote: (id: string) => Promise<void>;
}

export const INITIAL_STATE: INoteStateContext = {
    isPending: false,
    isError: false,
    isSuccess: false,
    pagedResult: null,
    currentNote: null,
};

export const NoteStateContext = createContext<INoteStateContext>(INITIAL_STATE);
export const NoteActionContext = createContext<INoteActionContext>(undefined!);
