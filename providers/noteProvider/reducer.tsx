import { handleActions } from "redux-actions";
import { INoteStateContext, INITIAL_STATE } from "./context";
import { NoteActionEnums } from "./actions";

export const NoteReducer = handleActions<INoteStateContext, Partial<INoteStateContext>>(
    {
        [NoteActionEnums.getNotesPending]: (state, action) => ({ ...state, ...action.payload }),
        [NoteActionEnums.getNotesSuccess]: (state, action) => ({ ...state, ...action.payload }),
        [NoteActionEnums.getNotesError]: (state, action) => ({ ...state, ...action.payload }),

        [NoteActionEnums.getNotePending]: (state, action) => ({ ...state, ...action.payload }),
        [NoteActionEnums.getNoteSuccess]: (state, action) => ({ ...state, ...action.payload }),
        [NoteActionEnums.getNoteError]: (state, action) => ({ ...state, ...action.payload }),

        [NoteActionEnums.createNotePending]: (state, action) => ({ ...state, ...action.payload }),
        [NoteActionEnums.createNoteSuccess]: (state, action) => ({ ...state, ...action.payload }),
        [NoteActionEnums.createNoteError]: (state, action) => ({ ...state, ...action.payload }),

        [NoteActionEnums.updateNotePending]: (state, action) => ({ ...state, ...action.payload }),
        [NoteActionEnums.updateNoteSuccess]: (state, action) => ({ ...state, ...action.payload }),
        [NoteActionEnums.updateNoteError]: (state, action) => ({ ...state, ...action.payload }),

        [NoteActionEnums.deleteNotePending]: (state, action) => ({ ...state, ...action.payload }),
        [NoteActionEnums.deleteNoteSuccess]: (state, action) => ({ ...state, ...action.payload }),
        [NoteActionEnums.deleteNoteError]: (state, action) => ({ ...state, ...action.payload }),
    },
    INITIAL_STATE,
);
