import { handleActions } from "redux-actions";
import { IDocumentStateContext, INITIAL_STATE } from "./context";
import { DocumentActionEnums } from "./actions";

export const DocumentReducer = handleActions<IDocumentStateContext, Partial<IDocumentStateContext>>(
    {
        [DocumentActionEnums.getDocumentsPending]: (state, action) => ({ ...state, ...action.payload }),
        [DocumentActionEnums.getDocumentsSuccess]: (state, action) => ({ ...state, ...action.payload }),
        [DocumentActionEnums.getDocumentsError]: (state, action) => ({ ...state, ...action.payload }),

        [DocumentActionEnums.getDocumentPending]: (state, action) => ({ ...state, ...action.payload }),
        [DocumentActionEnums.getDocumentSuccess]: (state, action) => ({ ...state, ...action.payload }),
        [DocumentActionEnums.getDocumentError]: (state, action) => ({ ...state, ...action.payload }),

        [DocumentActionEnums.uploadDocumentPending]: (state, action) => ({ ...state, ...action.payload }),
        [DocumentActionEnums.uploadDocumentSuccess]: (state, action) => ({ ...state, ...action.payload }),
        [DocumentActionEnums.uploadDocumentError]: (state, action) => ({ ...state, ...action.payload }),

        [DocumentActionEnums.downloadDocumentPending]: (state, action) => ({ ...state, ...action.payload }),
        [DocumentActionEnums.downloadDocumentSuccess]: (state, action) => ({ ...state, ...action.payload }),
        [DocumentActionEnums.downloadDocumentError]: (state, action) => ({ ...state, ...action.payload }),

        [DocumentActionEnums.deleteDocumentPending]: (state, action) => ({ ...state, ...action.payload }),
        [DocumentActionEnums.deleteDocumentSuccess]: (state, action) => ({ ...state, ...action.payload }),
        [DocumentActionEnums.deleteDocumentError]: (state, action) => ({ ...state, ...action.payload }),
    },
    INITIAL_STATE,
);
