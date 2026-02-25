import { handleActions } from "redux-actions";
import { IProposalStateContext, INITIAL_STATE } from "./context";
import { ProposalActionEnums } from "./actions";

export const ProposalReducer = handleActions<IProposalStateContext, Partial<IProposalStateContext>>(
    {
        [ProposalActionEnums.getProposalsPending]: (state, action) => ({ ...state, ...action.payload }),
        [ProposalActionEnums.getProposalsSuccess]: (state, action) => ({ ...state, ...action.payload }),
        [ProposalActionEnums.getProposalsError]: (state, action) => ({ ...state, ...action.payload }),

        [ProposalActionEnums.getProposalPending]: (state, action) => ({ ...state, ...action.payload }),
        [ProposalActionEnums.getProposalSuccess]: (state, action) => ({ ...state, ...action.payload }),
        [ProposalActionEnums.getProposalError]: (state, action) => ({ ...state, ...action.payload }),

        [ProposalActionEnums.createProposalPending]: (state, action) => ({ ...state, ...action.payload }),
        [ProposalActionEnums.createProposalSuccess]: (state, action) => ({ ...state, ...action.payload }),
        [ProposalActionEnums.createProposalError]: (state, action) => ({ ...state, ...action.payload }),

        [ProposalActionEnums.updateProposalPending]: (state, action) => ({ ...state, ...action.payload }),
        [ProposalActionEnums.updateProposalSuccess]: (state, action) => ({ ...state, ...action.payload }),
        [ProposalActionEnums.updateProposalError]: (state, action) => ({ ...state, ...action.payload }),

        [ProposalActionEnums.deleteProposalPending]: (state, action) => ({ ...state, ...action.payload }),
        [ProposalActionEnums.deleteProposalSuccess]: (state, action) => ({ ...state, ...action.payload }),
        [ProposalActionEnums.deleteProposalError]: (state, action) => ({ ...state, ...action.payload }),

        [ProposalActionEnums.addLineItemPending]: (state, action) => ({ ...state, ...action.payload }),
        [ProposalActionEnums.addLineItemSuccess]: (state, action) => ({ ...state, ...action.payload }),
        [ProposalActionEnums.addLineItemError]: (state, action) => ({ ...state, ...action.payload }),

        [ProposalActionEnums.updateLineItemPending]: (state, action) => ({ ...state, ...action.payload }),
        [ProposalActionEnums.updateLineItemSuccess]: (state, action) => ({ ...state, ...action.payload }),
        [ProposalActionEnums.updateLineItemError]: (state, action) => ({ ...state, ...action.payload }),

        [ProposalActionEnums.deleteLineItemPending]: (state, action) => ({ ...state, ...action.payload }),
        [ProposalActionEnums.deleteLineItemSuccess]: (state, action) => ({ ...state, ...action.payload }),
        [ProposalActionEnums.deleteLineItemError]: (state, action) => ({ ...state, ...action.payload }),

        [ProposalActionEnums.submitProposalPending]: (state, action) => ({ ...state, ...action.payload }),
        [ProposalActionEnums.submitProposalSuccess]: (state, action) => ({ ...state, ...action.payload }),
        [ProposalActionEnums.submitProposalError]: (state, action) => ({ ...state, ...action.payload }),

        [ProposalActionEnums.approveProposalPending]: (state, action) => ({ ...state, ...action.payload }),
        [ProposalActionEnums.approveProposalSuccess]: (state, action) => ({ ...state, ...action.payload }),
        [ProposalActionEnums.approveProposalError]: (state, action) => ({ ...state, ...action.payload }),

        [ProposalActionEnums.rejectProposalPending]: (state, action) => ({ ...state, ...action.payload }),
        [ProposalActionEnums.rejectProposalSuccess]: (state, action) => ({ ...state, ...action.payload }),
        [ProposalActionEnums.rejectProposalError]: (state, action) => ({ ...state, ...action.payload }),
    },
    INITIAL_STATE,
);
