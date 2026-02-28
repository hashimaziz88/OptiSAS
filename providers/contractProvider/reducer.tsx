import { handleActions } from "redux-actions";
import { IContractStateContext, INITIAL_STATE } from "./context";
import { ContractActionEnums } from "./actions";

export const ContractReducer = handleActions<IContractStateContext, Partial<IContractStateContext>>(
    {
        [ContractActionEnums.getContractsPending]: (state, action) => ({ ...state, ...action.payload }),
        [ContractActionEnums.getContractsSuccess]: (state, action) => ({ ...state, ...action.payload }),
        [ContractActionEnums.getContractsError]: (state, action) => ({ ...state, ...action.payload }),

        [ContractActionEnums.getContractPending]: (state, action) => ({ ...state, ...action.payload }),
        [ContractActionEnums.getContractSuccess]: (state, action) => ({ ...state, ...action.payload }),
        [ContractActionEnums.getContractError]: (state, action) => ({ ...state, ...action.payload }),

        [ContractActionEnums.createContractPending]: (state, action) => ({ ...state, ...action.payload }),
        [ContractActionEnums.createContractSuccess]: (state, action) => ({ ...state, ...action.payload }),
        [ContractActionEnums.createContractError]: (state, action) => ({ ...state, ...action.payload }),

        [ContractActionEnums.updateContractPending]: (state, action) => ({ ...state, ...action.payload }),
        [ContractActionEnums.updateContractSuccess]: (state, action) => ({ ...state, ...action.payload }),
        [ContractActionEnums.updateContractError]: (state, action) => ({ ...state, ...action.payload }),

        [ContractActionEnums.deleteContractPending]: (state, action) => ({ ...state, ...action.payload }),
        [ContractActionEnums.deleteContractSuccess]: (state, action) => ({ ...state, ...action.payload }),
        [ContractActionEnums.deleteContractError]: (state, action) => ({ ...state, ...action.payload }),

        [ContractActionEnums.getExpiringContractsPending]: (state, action) => ({ ...state, ...action.payload }),
        [ContractActionEnums.getExpiringContractsSuccess]: (state, action) => ({ ...state, ...action.payload }),
        [ContractActionEnums.getExpiringContractsError]: (state, action) => ({ ...state, ...action.payload }),

        [ContractActionEnums.getClientContractsPending]: (state, action) => ({ ...state, ...action.payload }),
        [ContractActionEnums.getClientContractsSuccess]: (state, action) => ({ ...state, ...action.payload }),
        [ContractActionEnums.getClientContractsError]: (state, action) => ({ ...state, ...action.payload }),

        [ContractActionEnums.activateContractPending]: (state, action) => ({ ...state, ...action.payload }),
        [ContractActionEnums.activateContractSuccess]: (state, action) => ({ ...state, ...action.payload }),
        [ContractActionEnums.activateContractError]: (state, action) => ({ ...state, ...action.payload }),

        [ContractActionEnums.cancelContractPending]: (state, action) => ({ ...state, ...action.payload }),
        [ContractActionEnums.cancelContractSuccess]: (state, action) => ({ ...state, ...action.payload }),
        [ContractActionEnums.cancelContractError]: (state, action) => ({ ...state, ...action.payload }),

        [ContractActionEnums.createRenewalPending]: (state, action) => ({ ...state, ...action.payload }),
        [ContractActionEnums.createRenewalSuccess]: (state, action) => ({ ...state, ...action.payload }),
        [ContractActionEnums.createRenewalError]: (state, action) => ({ ...state, ...action.payload }),

        [ContractActionEnums.completeRenewalPending]: (state, action) => ({ ...state, ...action.payload }),
        [ContractActionEnums.completeRenewalSuccess]: (state, action) => ({ ...state, ...action.payload }),
        [ContractActionEnums.completeRenewalError]: (state, action) => ({ ...state, ...action.payload }),

        [ContractActionEnums.getContractRenewalsPending]: (state, action) => ({ ...state, ...action.payload }),
        [ContractActionEnums.getContractRenewalsSuccess]: (state, action) => ({ ...state, ...action.payload }),
        [ContractActionEnums.getContractRenewalsError]: (state, action) => ({ ...state, ...action.payload }),
    },
    INITIAL_STATE,
);
