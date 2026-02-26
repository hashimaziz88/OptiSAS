import { createAction } from "redux-actions";
import { IActivityStateContext, IActivityDto } from "./context";
import { IPagedResult } from "@/types/api";

export enum ActivityActionEnums {
    getActivitiesPending = "GET_ACTIVITIES_PENDING",
    getActivitiesSuccess = "GET_ACTIVITIES_SUCCESS",
    getActivitiesError = "GET_ACTIVITIES_ERROR",

    getActivityPending = "GET_ACTIVITY_PENDING",
    getActivitySuccess = "GET_ACTIVITY_SUCCESS",
    getActivityError = "GET_ACTIVITY_ERROR",

    createActivityPending = "CREATE_ACTIVITY_PENDING",
    createActivitySuccess = "CREATE_ACTIVITY_SUCCESS",
    createActivityError = "CREATE_ACTIVITY_ERROR",

    updateActivityPending = "UPDATE_ACTIVITY_PENDING",
    updateActivitySuccess = "UPDATE_ACTIVITY_SUCCESS",
    updateActivityError = "UPDATE_ACTIVITY_ERROR",

    deleteActivityPending = "DELETE_ACTIVITY_PENDING",
    deleteActivitySuccess = "DELETE_ACTIVITY_SUCCESS",
    deleteActivityError = "DELETE_ACTIVITY_ERROR",

    getUpcomingActivitiesPending = "GET_UPCOMING_ACTIVITIES_PENDING",
    getUpcomingActivitiesSuccess = "GET_UPCOMING_ACTIVITIES_SUCCESS",
    getUpcomingActivitiesError = "GET_UPCOMING_ACTIVITIES_ERROR",

    getOverdueActivitiesPending = "GET_OVERDUE_ACTIVITIES_PENDING",
    getOverdueActivitiesSuccess = "GET_OVERDUE_ACTIVITIES_SUCCESS",
    getOverdueActivitiesError = "GET_OVERDUE_ACTIVITIES_ERROR",

    getMyActivitiesPending = "GET_MY_ACTIVITIES_PENDING",
    getMyActivitiesSuccess = "GET_MY_ACTIVITIES_SUCCESS",
    getMyActivitiesError = "GET_MY_ACTIVITIES_ERROR",

    completeActivityPending = "COMPLETE_ACTIVITY_PENDING",
    completeActivitySuccess = "COMPLETE_ACTIVITY_SUCCESS",
    completeActivityError = "COMPLETE_ACTIVITY_ERROR",

    cancelActivityPending = "CANCEL_ACTIVITY_PENDING",
    cancelActivitySuccess = "CANCEL_ACTIVITY_SUCCESS",
    cancelActivityError = "CANCEL_ACTIVITY_ERROR",
}

export const getActivitiesPending = createAction<IActivityStateContext>(ActivityActionEnums.getActivitiesPending, () => ({ isPending: true, isError: false, isSuccess: false }));
export const getActivitiesSuccess = createAction<IActivityStateContext, IPagedResult<IActivityDto>>(ActivityActionEnums.getActivitiesSuccess, (pagedResult) => ({ isPending: false, isError: false, isSuccess: true, pagedResult }));
export const getActivitiesError = createAction<IActivityStateContext>(ActivityActionEnums.getActivitiesError, () => ({ isPending: false, isError: true, isSuccess: false }));

export const getActivityPending = createAction<IActivityStateContext>(ActivityActionEnums.getActivityPending, () => ({ isPending: true, isError: false, isSuccess: false }));
export const getActivitySuccess = createAction<IActivityStateContext, IActivityDto>(ActivityActionEnums.getActivitySuccess, (currentActivity) => ({ isPending: false, isError: false, isSuccess: true, currentActivity }));
export const getActivityError = createAction<IActivityStateContext>(ActivityActionEnums.getActivityError, () => ({ isPending: false, isError: true, isSuccess: false }));

export const createActivityPending = createAction<IActivityStateContext>(ActivityActionEnums.createActivityPending, () => ({ isPending: true, isError: false, isSuccess: false }));
export const createActivitySuccess = createAction<IActivityStateContext, IActivityDto>(ActivityActionEnums.createActivitySuccess, (currentActivity) => ({ isPending: false, isError: false, isSuccess: true, currentActivity }));
export const createActivityError = createAction<IActivityStateContext>(ActivityActionEnums.createActivityError, () => ({ isPending: false, isError: true, isSuccess: false }));

export const updateActivityPending = createAction<IActivityStateContext>(ActivityActionEnums.updateActivityPending, () => ({ isPending: true, isError: false, isSuccess: false }));
export const updateActivitySuccess = createAction<IActivityStateContext, IActivityDto>(ActivityActionEnums.updateActivitySuccess, (currentActivity) => ({ isPending: false, isError: false, isSuccess: true, currentActivity }));
export const updateActivityError = createAction<IActivityStateContext>(ActivityActionEnums.updateActivityError, () => ({ isPending: false, isError: true, isSuccess: false }));

export const deleteActivityPending = createAction<IActivityStateContext>(ActivityActionEnums.deleteActivityPending, () => ({ isPending: true, isError: false, isSuccess: false }));
export const deleteActivitySuccess = createAction<IActivityStateContext>(ActivityActionEnums.deleteActivitySuccess, () => ({ isPending: false, isError: false, isSuccess: true, currentActivity: null }));
export const deleteActivityError = createAction<IActivityStateContext>(ActivityActionEnums.deleteActivityError, () => ({ isPending: false, isError: true, isSuccess: false }));

export const getUpcomingActivitiesPending = createAction<IActivityStateContext>(ActivityActionEnums.getUpcomingActivitiesPending, () => ({ isPending: true, isError: false, isSuccess: false }));
export const getUpcomingActivitiesSuccess = createAction<IActivityStateContext, IActivityDto[]>(ActivityActionEnums.getUpcomingActivitiesSuccess, (upcomingActivities) => ({ isPending: false, isError: false, isSuccess: true, upcomingActivities }));
export const getUpcomingActivitiesError = createAction<IActivityStateContext>(ActivityActionEnums.getUpcomingActivitiesError, () => ({ isPending: false, isError: true, isSuccess: false }));

export const getOverdueActivitiesPending = createAction<IActivityStateContext>(ActivityActionEnums.getOverdueActivitiesPending, () => ({ isPending: true, isError: false, isSuccess: false }));
export const getOverdueActivitiesSuccess = createAction<IActivityStateContext, IActivityDto[]>(ActivityActionEnums.getOverdueActivitiesSuccess, (overdueActivities) => ({ isPending: false, isError: false, isSuccess: true, overdueActivities }));
export const getOverdueActivitiesError = createAction<IActivityStateContext>(ActivityActionEnums.getOverdueActivitiesError, () => ({ isPending: false, isError: true, isSuccess: false }));

export const getMyActivitiesPending = createAction<IActivityStateContext>(ActivityActionEnums.getMyActivitiesPending, () => ({ isPending: true, isError: false, isSuccess: false }));
export const getMyActivitiesSuccess = createAction<IActivityStateContext, IPagedResult<IActivityDto>>(ActivityActionEnums.getMyActivitiesSuccess, (pagedResult) => ({ isPending: false, isError: false, isSuccess: true, pagedResult }));
export const getMyActivitiesError = createAction<IActivityStateContext>(ActivityActionEnums.getMyActivitiesError, () => ({ isPending: false, isError: true, isSuccess: false }));

export const completeActivityPending = createAction<IActivityStateContext>(ActivityActionEnums.completeActivityPending, () => ({ isPending: true, isError: false, isSuccess: false }));
export const completeActivitySuccess = createAction<IActivityStateContext, IActivityDto>(ActivityActionEnums.completeActivitySuccess, (currentActivity) => ({ isPending: false, isError: false, isSuccess: true, currentActivity }));
export const completeActivityError = createAction<IActivityStateContext>(ActivityActionEnums.completeActivityError, () => ({ isPending: false, isError: true, isSuccess: false }));

export const cancelActivityPending = createAction<IActivityStateContext>(ActivityActionEnums.cancelActivityPending, () => ({ isPending: true, isError: false, isSuccess: false }));
export const cancelActivitySuccess = createAction<IActivityStateContext, IActivityDto>(ActivityActionEnums.cancelActivitySuccess, (currentActivity) => ({ isPending: false, isError: false, isSuccess: true, currentActivity }));
export const cancelActivityError = createAction<IActivityStateContext>(ActivityActionEnums.cancelActivityError, () => ({ isPending: false, isError: true, isSuccess: false }));
