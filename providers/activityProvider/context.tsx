import { createContext } from "react";
import { IPagedResult } from "@/types/api";

export interface IActivityDto {
    id: string;
    type: number;
    typeName: string;
    subject: string;
    description: string;
    relatedToType: number;
    relatedToTypeName: string;
    relatedToId: string;
    relatedToTitle: string;
    assignedToId: string;
    assignedToName: string;
    status: number;
    statusName: string;
    priority: number;
    priorityName: string;
    dueDate: string;
    completedDate: string;
    duration: number;
    location: string;
    outcome: string;
    createdById: string;
    createdByName: string;
    createdAt: string;
    updatedAt: string;
    isOverdue: boolean;
}

export interface ICreateActivityDto {
    type: number;
    subject: string;
    description?: string;
    relatedToType?: number;
    relatedToId?: string;
    assignedToId?: string;
    priority?: number;
    dueDate: string;
    duration?: number;
    location?: string;
}

export interface IUpdateActivityDto {
    subject?: string;
    description?: string;
    assignedToId?: string;
    priority?: number;
    dueDate?: string;
    duration?: number;
    location?: string;
    outcome?: string;
}

export interface ICompleteActivityDto {
    outcome?: string;
}

export interface IGetActivitiesParams {
    assignedToId?: string;
    type?: number;
    status?: number;
    relatedToType?: number;
    relatedToId?: string;
    pageNumber?: number;
    pageSize?: number;
}

export interface IGetMyActivitiesParams {
    status?: number;
    pageNumber?: number;
    pageSize?: number;
}

export interface IActivityStateContext {
    isPending: boolean;
    isError: boolean;
    isSuccess: boolean;
    pagedResult?: IPagedResult<IActivityDto> | null;
    currentActivity?: IActivityDto | null;
    upcomingActivities?: IActivityDto[] | null;
    overdueActivities?: IActivityDto[] | null;
}

export interface IActivityActionContext {
    getActivities: (params?: IGetActivitiesParams) => Promise<void>;
    getActivity: (id: string) => Promise<void>;
    createActivity: (payload: ICreateActivityDto) => Promise<void>;
    updateActivity: (id: string, payload: IUpdateActivityDto) => Promise<void>;
    deleteActivity: (id: string) => Promise<void>;
    getUpcomingActivities: (daysAhead?: number) => Promise<void>;
    getOverdueActivities: () => Promise<void>;
    getMyActivities: (params?: IGetMyActivitiesParams) => Promise<void>;
    completeActivity: (id: string, payload: ICompleteActivityDto) => Promise<void>;
    cancelActivity: (id: string) => Promise<void>;
}

export const INITIAL_STATE: IActivityStateContext = {
    isPending: false,
    isError: false,
    isSuccess: false,
    pagedResult: null,
    currentActivity: null,
    upcomingActivities: null,
    overdueActivities: null,
};

export const ActivityStateContext = createContext<IActivityStateContext>(INITIAL_STATE);
export const ActivityActionContext = createContext<IActivityActionContext>(undefined!);
