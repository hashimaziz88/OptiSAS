import { handleActions } from "redux-actions";
import { IActivityStateContext, INITIAL_STATE } from "./context";
import { ActivityActionEnums } from "./actions";

export const ActivityReducer = handleActions<IActivityStateContext, Partial<IActivityStateContext>>(
    {
        [ActivityActionEnums.getActivitiesPending]: (state, action) => ({ ...state, ...action.payload }),
        [ActivityActionEnums.getActivitiesSuccess]: (state, action) => ({ ...state, ...action.payload }),
        [ActivityActionEnums.getActivitiesError]: (state, action) => ({ ...state, ...action.payload }),

        [ActivityActionEnums.getActivityPending]: (state, action) => ({ ...state, ...action.payload }),
        [ActivityActionEnums.getActivitySuccess]: (state, action) => ({ ...state, ...action.payload }),
        [ActivityActionEnums.getActivityError]: (state, action) => ({ ...state, ...action.payload }),

        [ActivityActionEnums.createActivityPending]: (state, action) => ({ ...state, ...action.payload }),
        [ActivityActionEnums.createActivitySuccess]: (state, action) => ({ ...state, ...action.payload }),
        [ActivityActionEnums.createActivityError]: (state, action) => ({ ...state, ...action.payload }),

        [ActivityActionEnums.updateActivityPending]: (state, action) => ({ ...state, ...action.payload }),
        [ActivityActionEnums.updateActivitySuccess]: (state, action) => ({ ...state, ...action.payload }),
        [ActivityActionEnums.updateActivityError]: (state, action) => ({ ...state, ...action.payload }),

        [ActivityActionEnums.deleteActivityPending]: (state, action) => ({ ...state, ...action.payload }),
        [ActivityActionEnums.deleteActivitySuccess]: (state, action) => ({ ...state, ...action.payload }),
        [ActivityActionEnums.deleteActivityError]: (state, action) => ({ ...state, ...action.payload }),

        [ActivityActionEnums.getUpcomingActivitiesPending]: (state, action) => ({ ...state, ...action.payload }),
        [ActivityActionEnums.getUpcomingActivitiesSuccess]: (state, action) => ({ ...state, ...action.payload }),
        [ActivityActionEnums.getUpcomingActivitiesError]: (state, action) => ({ ...state, ...action.payload }),

        [ActivityActionEnums.getOverdueActivitiesPending]: (state, action) => ({ ...state, ...action.payload }),
        [ActivityActionEnums.getOverdueActivitiesSuccess]: (state, action) => ({ ...state, ...action.payload }),
        [ActivityActionEnums.getOverdueActivitiesError]: (state, action) => ({ ...state, ...action.payload }),

        [ActivityActionEnums.getMyActivitiesPending]: (state, action) => ({ ...state, ...action.payload }),
        [ActivityActionEnums.getMyActivitiesSuccess]: (state, action) => ({ ...state, ...action.payload }),
        [ActivityActionEnums.getMyActivitiesError]: (state, action) => ({ ...state, ...action.payload }),

        [ActivityActionEnums.completeActivityPending]: (state, action) => ({ ...state, ...action.payload }),
        [ActivityActionEnums.completeActivitySuccess]: (state, action) => ({ ...state, ...action.payload }),
        [ActivityActionEnums.completeActivityError]: (state, action) => ({ ...state, ...action.payload }),

        [ActivityActionEnums.cancelActivityPending]: (state, action) => ({ ...state, ...action.payload }),
        [ActivityActionEnums.cancelActivitySuccess]: (state, action) => ({ ...state, ...action.payload }),
        [ActivityActionEnums.cancelActivityError]: (state, action) => ({ ...state, ...action.payload }),
    },
    INITIAL_STATE,
);
