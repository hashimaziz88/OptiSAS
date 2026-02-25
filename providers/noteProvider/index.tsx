"use client";
import React, { useReducer, useContext } from "react";
import {
    INITIAL_STATE,
    NoteStateContext,
    NoteActionContext,
    ICreateNoteDto,
    IUpdateNoteDto,
    IGetNotesParams,
} from "./context";
import { NoteReducer } from "./reducer";
import {
    getNotesPending, getNotesSuccess, getNotesError,
    getNotePending, getNoteSuccess, getNoteError,
    createNotePending, createNoteSuccess, createNoteError,
    updateNotePending, updateNoteSuccess, updateNoteError,
    deleteNotePending, deleteNoteSuccess, deleteNoteError,
} from "./actions";
import { axiosInstance } from "@/utils/axiosInstance";

const BASE_URL = process.env.NEXT_PUBLIC_API_LINK;

export const NoteProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [state, dispatch] = useReducer(NoteReducer, INITIAL_STATE);

    const getNotes = async (params?: IGetNotesParams) => {
        const instance = axiosInstance();
        dispatch(getNotesPending());
        await instance.get(`${BASE_URL}/api/Notes`, { params })
            .then((response) => { dispatch(getNotesSuccess(response.data)); })
            .catch(() => { dispatch(getNotesError()); });
    };

    const getNote = async (id: string) => {
        const instance = axiosInstance();
        dispatch(getNotePending());
        await instance.get(`${BASE_URL}/api/Notes/${id}`)
            .then((response) => { dispatch(getNoteSuccess(response.data)); })
            .catch(() => { dispatch(getNoteError()); });
    };

    const createNote = async (payload: ICreateNoteDto) => {
        const instance = axiosInstance();
        dispatch(createNotePending());
        await instance.post(`${BASE_URL}/api/Notes`, payload)
            .then((response) => { dispatch(createNoteSuccess(response.data)); })
            .catch(() => { dispatch(createNoteError()); });
    };

    const updateNote = async (id: string, payload: IUpdateNoteDto) => {
        const instance = axiosInstance();
        dispatch(updateNotePending());
        await instance.put(`${BASE_URL}/api/Notes/${id}`, payload)
            .then((response) => { dispatch(updateNoteSuccess(response.data)); })
            .catch(() => { dispatch(updateNoteError()); });
    };

    const deleteNote = async (id: string) => {
        const instance = axiosInstance();
        dispatch(deleteNotePending());
        await instance.delete(`${BASE_URL}/api/Notes/${id}`)
            .then(() => { dispatch(deleteNoteSuccess()); })
            .catch(() => { dispatch(deleteNoteError()); });
    };

    return (
        <NoteStateContext.Provider value={state}>
            <NoteActionContext.Provider value={{ getNotes, getNote, createNote, updateNote, deleteNote }}>
                {children}
            </NoteActionContext.Provider>
        </NoteStateContext.Provider>
    );
};

export const useNoteState = () => {
    const context = useContext(NoteStateContext);
    if (context === undefined) throw new Error("useNoteState must be used within a NoteProvider");
    return context;
};

export const useNoteActions = () => {
    const context = useContext(NoteActionContext);
    if (context === undefined) throw new Error("useNoteActions must be used within a NoteProvider");
    return context;
};
