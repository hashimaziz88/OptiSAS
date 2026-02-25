import { createAction } from "redux-actions";
import { INoteStateContext, INoteDto } from "./context";
import { IPagedResult } from "@/types/api";

export enum NoteActionEnums {
    getNotesPending = "GET_NOTES_PENDING",
    getNotesSuccess = "GET_NOTES_SUCCESS",
    getNotesError = "GET_NOTES_ERROR",

    getNotePending = "GET_NOTE_PENDING",
    getNoteSuccess = "GET_NOTE_SUCCESS",
    getNoteError = "GET_NOTE_ERROR",

    createNotePending = "CREATE_NOTE_PENDING",
    createNoteSuccess = "CREATE_NOTE_SUCCESS",
    createNoteError = "CREATE_NOTE_ERROR",

    updateNotePending = "UPDATE_NOTE_PENDING",
    updateNoteSuccess = "UPDATE_NOTE_SUCCESS",
    updateNoteError = "UPDATE_NOTE_ERROR",

    deleteNotePending = "DELETE_NOTE_PENDING",
    deleteNoteSuccess = "DELETE_NOTE_SUCCESS",
    deleteNoteError = "DELETE_NOTE_ERROR",
}

export const getNotesPending = createAction<INoteStateContext>(NoteActionEnums.getNotesPending, () => ({ isPending: true, isError: false, isSuccess: false }));
export const getNotesSuccess = createAction<INoteStateContext, IPagedResult<INoteDto>>(NoteActionEnums.getNotesSuccess, (pagedResult) => ({ isPending: false, isError: false, isSuccess: true, pagedResult }));
export const getNotesError = createAction<INoteStateContext>(NoteActionEnums.getNotesError, () => ({ isPending: false, isError: true, isSuccess: false }));

export const getNotePending = createAction<INoteStateContext>(NoteActionEnums.getNotePending, () => ({ isPending: true, isError: false, isSuccess: false }));
export const getNoteSuccess = createAction<INoteStateContext, INoteDto>(NoteActionEnums.getNoteSuccess, (currentNote) => ({ isPending: false, isError: false, isSuccess: true, currentNote }));
export const getNoteError = createAction<INoteStateContext>(NoteActionEnums.getNoteError, () => ({ isPending: false, isError: true, isSuccess: false }));

export const createNotePending = createAction<INoteStateContext>(NoteActionEnums.createNotePending, () => ({ isPending: true, isError: false, isSuccess: false }));
export const createNoteSuccess = createAction<INoteStateContext, INoteDto>(NoteActionEnums.createNoteSuccess, (currentNote) => ({ isPending: false, isError: false, isSuccess: true, currentNote }));
export const createNoteError = createAction<INoteStateContext>(NoteActionEnums.createNoteError, () => ({ isPending: false, isError: true, isSuccess: false }));

export const updateNotePending = createAction<INoteStateContext>(NoteActionEnums.updateNotePending, () => ({ isPending: true, isError: false, isSuccess: false }));
export const updateNoteSuccess = createAction<INoteStateContext, INoteDto>(NoteActionEnums.updateNoteSuccess, (currentNote) => ({ isPending: false, isError: false, isSuccess: true, currentNote }));
export const updateNoteError = createAction<INoteStateContext>(NoteActionEnums.updateNoteError, () => ({ isPending: false, isError: true, isSuccess: false }));

export const deleteNotePending = createAction<INoteStateContext>(NoteActionEnums.deleteNotePending, () => ({ isPending: true, isError: false, isSuccess: false }));
export const deleteNoteSuccess = createAction<INoteStateContext>(NoteActionEnums.deleteNoteSuccess, () => ({ isPending: false, isError: false, isSuccess: true, currentNote: null }));
export const deleteNoteError = createAction<INoteStateContext>(NoteActionEnums.deleteNoteError, () => ({ isPending: false, isError: true, isSuccess: false }));
