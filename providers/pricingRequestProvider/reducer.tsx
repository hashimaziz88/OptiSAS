import { handleActions } from "redux-actions";
import { IPricingRequestStateContext, INITIAL_STATE } from "./context";
import { PricingRequestActionEnums } from "./actions";

export const PricingRequestReducer = handleActions<IPricingRequestStateContext, Partial<IPricingRequestStateContext>>(
    {
        [PricingRequestActionEnums.getPricingRequestsPending]: (state, action) => ({ ...state, ...action.payload }),
        [PricingRequestActionEnums.getPricingRequestsSuccess]: (state, action) => ({ ...state, ...action.payload }),
        [PricingRequestActionEnums.getPricingRequestsError]: (state, action) => ({ ...state, ...action.payload }),

        [PricingRequestActionEnums.getPendingPricingRequestsPending]: (state, action) => ({ ...state, ...action.payload }),
        [PricingRequestActionEnums.getPendingPricingRequestsSuccess]: (state, action) => ({ ...state, ...action.payload }),
        [PricingRequestActionEnums.getPendingPricingRequestsError]: (state, action) => ({ ...state, ...action.payload }),

        [PricingRequestActionEnums.getMyPricingRequestsPending]: (state, action) => ({ ...state, ...action.payload }),
        [PricingRequestActionEnums.getMyPricingRequestsSuccess]: (state, action) => ({ ...state, ...action.payload }),
        [PricingRequestActionEnums.getMyPricingRequestsError]: (state, action) => ({ ...state, ...action.payload }),

        [PricingRequestActionEnums.getPricingRequestPending]: (state, action) => ({ ...state, ...action.payload }),
        [PricingRequestActionEnums.getPricingRequestSuccess]: (state, action) => ({ ...state, ...action.payload }),
        [PricingRequestActionEnums.getPricingRequestError]: (state, action) => ({ ...state, ...action.payload }),

        [PricingRequestActionEnums.createPricingRequestPending]: (state, action) => ({ ...state, ...action.payload }),
        [PricingRequestActionEnums.createPricingRequestSuccess]: (state, action) => ({ ...state, ...action.payload }),
        [PricingRequestActionEnums.createPricingRequestError]: (state, action) => ({ ...state, ...action.payload }),

        [PricingRequestActionEnums.updatePricingRequestPending]: (state, action) => ({ ...state, ...action.payload }),
        [PricingRequestActionEnums.updatePricingRequestSuccess]: (state, action) => ({ ...state, ...action.payload }),
        [PricingRequestActionEnums.updatePricingRequestError]: (state, action) => ({ ...state, ...action.payload }),

        [PricingRequestActionEnums.deletePricingRequestPending]: (state, action) => ({ ...state, ...action.payload }),
        [PricingRequestActionEnums.deletePricingRequestSuccess]: (state, action) => ({ ...state, ...action.payload }),
        [PricingRequestActionEnums.deletePricingRequestError]: (state, action) => ({ ...state, ...action.payload }),

        [PricingRequestActionEnums.assignPricingRequestPending]: (state, action) => ({ ...state, ...action.payload }),
        [PricingRequestActionEnums.assignPricingRequestSuccess]: (state, action) => ({ ...state, ...action.payload }),
        [PricingRequestActionEnums.assignPricingRequestError]: (state, action) => ({ ...state, ...action.payload }),

        [PricingRequestActionEnums.completePricingRequestPending]: (state, action) => ({ ...state, ...action.payload }),
        [PricingRequestActionEnums.completePricingRequestSuccess]: (state, action) => ({ ...state, ...action.payload }),
        [PricingRequestActionEnums.completePricingRequestError]: (state, action) => ({ ...state, ...action.payload }),
    },
    INITIAL_STATE,
);
