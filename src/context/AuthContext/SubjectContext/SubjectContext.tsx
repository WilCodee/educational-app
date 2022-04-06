import React, { createContext, useReducer } from 'react'
import { subjectInitialState, SubjectsReducer } from './SubjectsReducer'
import { SUBJECT_ACTIONS } from './SubjectsTypes';

export const SubjectContext:any = createContext()

export const SubjectProvider = ({ children }: any):any => {
    const [{name,description,key,subjects}, dispatch] = useReducer(SubjectsReducer, subjectInitialState)

    const value:any = {
        ADD: 'ADD',
        EDIT: 'EDIT',
        subjects:subjects,
        key:key,
        name: name,
        description: description,
        readSubject: (subjects:any) =>{
            dispatch({type: SUBJECT_ACTIONS.READ_SUBJECT, payload: subjects});
        },
        createSubject: ( subjects:any) =>{
            dispatch({type: SUBJECT_ACTIONS.CREATE_SUBJECT, payload: subjects});
        },
        uploadSubject: (subjects:any) =>{
            dispatch({type: SUBJECT_ACTIONS.UPDATE_SUBJECT, payload: subjects});
        },
        deleteSubject: (key:any) =>{
            dispatch({type: SUBJECT_ACTIONS.DELETE_SUBJECT, payload: key});
        },

      };
    return <SubjectContext.Provider value={value}>{children}</SubjectContext.Provider>;
};
