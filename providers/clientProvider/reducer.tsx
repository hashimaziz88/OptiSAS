import { handleActions } from "redux-actions";
import { IClientStateContext, INITIAL_STATE } from "./context";
import { ClientActionEnums } from "./actions";

export const ClientReducer = handleActions<IClientStateContext, Partial<IClientStateContext>>(
    {
        [ClientActionEnums.getClientsPending]: (state, action) => ({ ...state, ...action.payload }),
        [ClientActionEnums.getClientsSuccess]: (state, action) => ({ ...state, ...action.payload }),
        [ClientActionEnums.getClientsError]: (state, action) => ({ ...state, ...action.payload }),

        [ClientActionEnums.getClientPending]: (state, action) => ({ ...state, ...action.payload }),
        [ClientActionEnums.getClientSuccess]: (state, action) => ({ ...state, ...action.payload }),
        [ClientActionEnums.getClientError]: (state, action) => ({ ...state, ...action.payload }),

        [ClientActionEnums.getClientStatsPending]: (state, action) => ({ ...state, ...action.payload }),
        [ClientActionEnums.getClientStatsSuccess]: (state, action) => ({ ...state, ...action.payload }),
        [ClientActionEnums.getClientStatsError]: (state, action) => ({ ...state, ...action.payload }),

        [ClientActionEnums.createClientPending]: (state, action) => ({ ...state, ...action.payload }),
        [ClientActionEnums.createClientSuccess]: (state, action) => ({ ...state, ...action.payload }),
        [ClientActionEnums.createClientError]: (state, action) => ({ ...state, ...action.payload }),

        [ClientActionEnums.updateClientPending]: (state, action) => ({ ...state, ...action.payload }),
        [ClientActionEnums.updateClientSuccess]: (state, action) => ({ ...state, ...action.payload }),
        [ClientActionEnums.updateClientError]: (state, action) => ({ ...state, ...action.payload }),

        [ClientActionEnums.deleteClientPending]: (state, action) => ({ ...state, ...action.payload }),
        [ClientActionEnums.deleteClientSuccess]: (state, action) => ({ ...state, ...action.payload }),
        [ClientActionEnums.deleteClientError]: (state, action) => ({ ...state, ...action.payload }),
    },
    INITIAL_STATE,
);
