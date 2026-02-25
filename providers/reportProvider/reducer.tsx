import { handleActions } from "redux-actions";
import { IReportStateContext, INITIAL_STATE } from "./context";
import { ReportActionEnums } from "./actions";

export const ReportReducer = handleActions<IReportStateContext, Partial<IReportStateContext>>(
    {
        [ReportActionEnums.getOpportunitiesReportPending]: (state, action) => ({ ...state, ...action.payload }),
        [ReportActionEnums.getOpportunitiesReportSuccess]: (state, action) => ({ ...state, ...action.payload }),
        [ReportActionEnums.getOpportunitiesReportError]: (state, action) => ({ ...state, ...action.payload }),

        [ReportActionEnums.getSalesByPeriodReportPending]: (state, action) => ({ ...state, ...action.payload }),
        [ReportActionEnums.getSalesByPeriodReportSuccess]: (state, action) => ({ ...state, ...action.payload }),
        [ReportActionEnums.getSalesByPeriodReportError]: (state, action) => ({ ...state, ...action.payload }),
    },
    INITIAL_STATE,
);
