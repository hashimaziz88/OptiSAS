import { handleActions } from "redux-actions";
import { IDashboardStateContext, INITIAL_STATE } from "./context";
import { DashboardActionEnums } from "./actions";

export const DashboardReducer = handleActions<IDashboardStateContext, Partial<IDashboardStateContext>>(
    {
        [DashboardActionEnums.getDashboardOverviewPending]: (state, action) => ({ ...state, ...action.payload }),
        [DashboardActionEnums.getDashboardOverviewSuccess]: (state, action) => ({ ...state, ...action.payload }),
        [DashboardActionEnums.getDashboardOverviewError]: (state, action) => ({ ...state, ...action.payload }),

        [DashboardActionEnums.getDashboardPipelineMetricsPending]: (state, action) => ({ ...state, ...action.payload }),
        [DashboardActionEnums.getDashboardPipelineMetricsSuccess]: (state, action) => ({ ...state, ...action.payload }),
        [DashboardActionEnums.getDashboardPipelineMetricsError]: (state, action) => ({ ...state, ...action.payload }),

        [DashboardActionEnums.getSalesPerformancePending]: (state, action) => ({ ...state, ...action.payload }),
        [DashboardActionEnums.getSalesPerformanceSuccess]: (state, action) => ({ ...state, ...action.payload }),
        [DashboardActionEnums.getSalesPerformanceError]: (state, action) => ({ ...state, ...action.payload }),

        [DashboardActionEnums.getActivitiesSummaryPending]: (state, action) => ({ ...state, ...action.payload }),
        [DashboardActionEnums.getActivitiesSummarySuccess]: (state, action) => ({ ...state, ...action.payload }),
        [DashboardActionEnums.getActivitiesSummaryError]: (state, action) => ({ ...state, ...action.payload }),

        [DashboardActionEnums.getContractsExpiringPending]: (state, action) => ({ ...state, ...action.payload }),
        [DashboardActionEnums.getContractsExpiringSuccess]: (state, action) => ({ ...state, ...action.payload }),
        [DashboardActionEnums.getContractsExpiringError]: (state, action) => ({ ...state, ...action.payload }),
    },
    INITIAL_STATE,
);
