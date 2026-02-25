import { createContext } from "react";
import { IPagedResult } from "@/types/api";

export interface IContactDto {
    id: string;
    clientId: string;
    clientName: string;
    firstName: string;
    lastName: string;
    fullName: string;
    email: string;
    phoneNumber: string;
    position: string;
    isPrimaryContact: boolean;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface ICreateContactDto {
    clientId: string;
    firstName: string;
    lastName: string;
    email?: string;
    phoneNumber?: string;
    position?: string;
    isPrimaryContact?: boolean;
}

export interface IUpdateContactDto {
    firstName?: string;
    lastName?: string;
    email?: string;
    phoneNumber?: string;
    position?: string;
    isPrimaryContact?: boolean;
    isActive?: boolean;
}

export interface IGetContactsParams {
    clientId?: string;
    searchTerm?: string;
    pageNumber?: number;
    pageSize?: number;
}

export interface IContactStateContext {
    isPending: boolean;
    isError: boolean;
    isSuccess: boolean;
    pagedResult?: IPagedResult<IContactDto> | null;
    currentContact?: IContactDto | null;
    clientContacts?: IContactDto[] | null;
}

export interface IContactActionContext {
    getContacts: (params?: IGetContactsParams) => Promise<void>;
    getContactsByClient: (clientId: string) => Promise<void>;
    getContact: (id: string) => Promise<void>;
    createContact: (payload: ICreateContactDto) => Promise<void>;
    updateContact: (id: string, payload: IUpdateContactDto) => Promise<void>;
    deleteContact: (id: string) => Promise<void>;
    setContactPrimary: (id: string) => Promise<void>;
}

export const INITIAL_STATE: IContactStateContext = {
    isPending: false,
    isError: false,
    isSuccess: false,
    pagedResult: null,
    currentContact: null,
    clientContacts: null,
};

export const ContactStateContext = createContext<IContactStateContext>(INITIAL_STATE);
export const ContactActionContext = createContext<IContactActionContext>(undefined!);
