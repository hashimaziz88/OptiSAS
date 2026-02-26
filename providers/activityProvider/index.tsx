"use client";
import React, { useReducer, useContext } from "react";
import {
    INITIAL_STATE,
    ActivityStateContext,
    ActivityActionContext,
    ICreateActivityDto,
    IUpdateActivityDto,
    IGetActivitiesParams,
    IGetMyActivitiesParams,
    ICompleteActivityDto,
} from "./context";
import { ActivityReducer } from "./reducer";
import {
    getActivitiesPending, getActivitiesSuccess, getActivitiesError,
    getActivityPending, getActivitySuccess, getActivityError,
    createActivityPending, createActivitySuccess, createActivityError,
    updateActivityPending, updateActivitySuccess, updateActivityError,
    deleteActivityPending, deleteActivitySuccess, deleteActivityError,
    getUpcomingActivitiesPending, getUpcomingActivitiesSuccess, getUpcomingActivitiesError,
    getOverdueActivitiesPending, getOverdueActivitiesSuccess, getOverdueActivitiesError,
    getMyActivitiesPending, getMyActivitiesSuccess, getMyActivitiesError,
    completeActivityPending, completeActivitySuccess, completeActivityError,
    cancelActivityPending, cancelActivitySuccess, cancelActivityError,
} from "./actions";
import { axiosInstance } from "@/utils/axiosInstance";

const BASE_URL = process.env.NEXT_PUBLIC_API_LINK;

export const ActivityProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [state, dispatch] = useReducer(ActivityReducer, INITIAL_STATE);

    const getActivities = async (params?: IGetActivitiesParams) => {
        const instance = axiosInstance();
        dispatch(getActivitiesPending());
        await instance.get(`${BASE_URL}/api/Activities`, { params })
            .then((response) => { dispatch(getActivitiesSuccess(response.data)); })
            .catch(() => { dispatch(getActivitiesError()); });
    };

    const getActivity = async (id: string) => {
        const instance = axiosInstance();
        dispatch(getActivityPending());
        await instance.get(`${BASE_URL}/api/Activities/${id}`)
            .then((response) => { dispatch(getActivitySuccess(response.data)); })
            .catch(() => { dispatch(getActivityError()); });
    };

    const createActivity = async (payload: ICreateActivityDto) => {
        const instance = axiosInstance();
        dispatch(createActivityPending());
        await instance.post(`${BASE_URL}/api/Activities`, payload)
            .then((response) => { dispatch(createActivitySuccess(response.data)); })
            .catch(() => { dispatch(createActivityError()); });
    };

    const updateActivity = async (id: string, payload: IUpdateActivityDto) => {
        const instance = axiosInstance();
        dispatch(updateActivityPending());
        await instance.put(`${BASE_URL}/api/Activities/${id}`, payload)
            .then((response) => { dispatch(updateActivitySuccess(response.data)); })
            .catch(() => { dispatch(updateActivityError()); });
    };

    const deleteActivity = async (id: string) => {
        const instance = axiosInstance();
        dispatch(deleteActivityPending());
        await instance.delete(`${BASE_URL}/api/Activities/${id}`)
            .then(() => { dispatch(deleteActivitySuccess()); })
            .catch(() => { dispatch(deleteActivityError()); });
    };

    const getUpcomingActivities = async (daysAhead?: number) => {
        const instance = axiosInstance();
        dispatch(getUpcomingActivitiesPending());
        await instance.get(`${BASE_URL}/api/Activities/upcoming`, { params: { daysAhead, pageSize: 100 } })
            .then((response) => {
                const data = response.data;
                const arr = Array.isArray(data) ? data : (data?.items ?? []);
                dispatch(getUpcomingActivitiesSuccess(arr));
            })
            .catch(() => { dispatch(getUpcomingActivitiesError()); });
    };

    const getOverdueActivities = async () => {
        const instance = axiosInstance();
        dispatch(getOverdueActivitiesPending());
        await instance.get(`${BASE_URL}/api/Activities/overdue`, { params: { pageSize: 100 } })
            .then((response) => {
                const data = response.data;
                const arr = Array.isArray(data) ? data : (data?.items ?? []);
                dispatch(getOverdueActivitiesSuccess(arr));
            })
            .catch(() => { dispatch(getOverdueActivitiesError()); });
    };

    const getMyActivities = async (params?: IGetMyActivitiesParams) => {
        const instance = axiosInstance();
        dispatch(getMyActivitiesPending());
        await instance.get(`${BASE_URL}/api/Activities/my-activities`, { params })
            .then((response) => { dispatch(getMyActivitiesSuccess(response.data)); })
            .catch(() => { dispatch(getMyActivitiesError()); });
    };

    const completeActivity = async (id: string, payload: ICompleteActivityDto) => {
        const instance = axiosInstance();
        dispatch(completeActivityPending());
        await instance.put(`${BASE_URL}/api/Activities/${id}/complete`, payload)
            .then((response) => { dispatch(completeActivitySuccess(response.data)); })
            .catch(() => { dispatch(completeActivityError()); });
    };

    const cancelActivity = async (id: string) => {
        const instance = axiosInstance();
        dispatch(cancelActivityPending());
        await instance.put(`${BASE_URL}/api/Activities/${id}/cancel`)
            .then((response) => { dispatch(cancelActivitySuccess(response.data)); })
            .catch(() => { dispatch(cancelActivityError()); });
    };

    return (
        <ActivityStateContext.Provider value={state}>
            <ActivityActionContext.Provider value={{ getActivities, getActivity, createActivity, updateActivity, deleteActivity, getUpcomingActivities, getOverdueActivities, getMyActivities, completeActivity, cancelActivity }}>
                {children}
            </ActivityActionContext.Provider>
        </ActivityStateContext.Provider>
    );
};

export const useActivityState = () => {
    const context = useContext(ActivityStateContext);
    if (context === undefined) throw new Error("useActivityState must be used within an ActivityProvider");
    return context;
};

export const useActivityActions = () => {
    const context = useContext(ActivityActionContext);
    if (context === undefined) throw new Error("useActivityActions must be used within an ActivityProvider");
    return context;
};
