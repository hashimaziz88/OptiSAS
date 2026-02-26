import { createContext } from "react";

// From Swagger
export interface IUserLoginRequest {
    email?: string | null;
    password?: string | null;
}

export interface IUserRegisterRequest {
    email?: string | null;
    password?: string | null;
    firstName?: string | null;
    lastName?: string | null;
    phoneNumber?: string | null;
    // Scenario A: provide tenantName to create a new org (caller becomes Admin)
    tenantName?: string | null;
    // Scenario B: provide tenantId to join an existing org
    tenantId?: string | null;
    // Role for scenario B/C. Options: SalesRep | SalesManager | BusinessDevelopmentManager
    // Ignored when tenantName is provided. Defaults to SalesRep.
    role?: string | null;
}

export interface IUserLoginResponse {
    token?: string | null;
    userId?: string;
    email?: string | null;
    firstName?: string | null;
    lastName?: string | null;
    roles?: string[] | null;
    tenantId?: string | null;
    expiresAt?: string;
}

export interface IAuthStateContext {
    isSuccess: boolean;
    isPending: boolean;
    isError: boolean;
    isAuthenticated: boolean;
    user?: IUserLoginResponse | null;
}

export interface IAuthActionContext {
    login: (payload: IUserLoginRequest) => Promise<void>;
    register: (payload: IUserRegisterRequest) => Promise<void>;
    logout: () => Promise<void>;
    getMe: () => Promise<void>;
}

export const INITIAL_STATE: IAuthStateContext = {
    isSuccess: false,
    isPending: false,
    isError: false,
    isAuthenticated: false,
    user: null,
};

export const AuthStateContext = createContext<IAuthStateContext>(INITIAL_STATE);

export const AuthActionContext = createContext<IAuthActionContext>(undefined!);
