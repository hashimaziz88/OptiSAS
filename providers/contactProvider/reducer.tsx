import { handleActions } from "redux-actions";
import { IContactStateContext, INITIAL_STATE } from "./context";
import { ContactActionEnums } from "./actions";

export const ContactReducer = handleActions<IContactStateContext, Partial<IContactStateContext>>(
    {
        [ContactActionEnums.getContactsPending]: (state, action) => ({ ...state, ...action.payload }),
        [ContactActionEnums.getContactsSuccess]: (state, action) => ({ ...state, ...action.payload }),
        [ContactActionEnums.getContactsError]: (state, action) => ({ ...state, ...action.payload }),

        [ContactActionEnums.getContactsByClientPending]: (state, action) => ({ ...state, ...action.payload }),
        [ContactActionEnums.getContactsByClientSuccess]: (state, action) => ({ ...state, ...action.payload }),
        [ContactActionEnums.getContactsByClientError]: (state, action) => ({ ...state, ...action.payload }),

        [ContactActionEnums.getContactPending]: (state, action) => ({ ...state, ...action.payload }),
        [ContactActionEnums.getContactSuccess]: (state, action) => ({ ...state, ...action.payload }),
        [ContactActionEnums.getContactError]: (state, action) => ({ ...state, ...action.payload }),

        [ContactActionEnums.createContactPending]: (state, action) => ({ ...state, ...action.payload }),
        [ContactActionEnums.createContactSuccess]: (state, action) => ({ ...state, ...action.payload }),
        [ContactActionEnums.createContactError]: (state, action) => ({ ...state, ...action.payload }),

        [ContactActionEnums.updateContactPending]: (state, action) => ({ ...state, ...action.payload }),
        [ContactActionEnums.updateContactSuccess]: (state, action) => ({ ...state, ...action.payload }),
        [ContactActionEnums.updateContactError]: (state, action) => ({ ...state, ...action.payload }),

        [ContactActionEnums.deleteContactPending]: (state, action) => ({ ...state, ...action.payload }),
        [ContactActionEnums.deleteContactSuccess]: (state, action) => ({ ...state, ...action.payload }),
        [ContactActionEnums.deleteContactError]: (state, action) => ({ ...state, ...action.payload }),

        [ContactActionEnums.setContactPrimaryPending]: (state, action) => ({ ...state, ...action.payload }),
        [ContactActionEnums.setContactPrimarySuccess]: (state, action) => ({ ...state, ...action.payload }),
        [ContactActionEnums.setContactPrimaryError]: (state, action) => ({ ...state, ...action.payload }),
    },
    INITIAL_STATE,
);
