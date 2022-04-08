import React, { createContext, useReducer } from 'react'
import { ActionsInitialState, ActionsReducer } from './ActionsReducer'
import { ADMIN_ACTIONS } from './AdminTypes';

export const ActionsContext:any = createContext()

export const ActionsProvider = ({ children }: any):any => {
    const [{name,description,key,ObjectAdmin}, dispatch] = useReducer(ActionsReducer, ActionsInitialState)

    const value:any = {
        ADD: 'ADD',
        EDIT: 'EDIT',
        subjects:ObjectAdmin,
        key:key,
        name: name,
        description: description,
        readAction: () =>{
            dispatch({type: ADMIN_ACTIONS.READ_ADMIN});
        },
        createAction: (url:any,ActionData:any) =>{
            dispatch({type: ADMIN_ACTIONS.CREATE_ADMIN, payload: {url,ActionData}});
        },
        uploadAction: (url:any,data:any,ActionData:any) =>{
            dispatch({type: ADMIN_ACTIONS.UPDATE_ADMIN, payload: {url,data,ActionData}});
        },
        deleteAction: (url:any,ActionData:any) =>{
            dispatch({type: ADMIN_ACTIONS.DELETE_ADMIN, payload: {url,ActionData}});
        },

      };
    return <ActionsContext.Provider value={value}>{children}</ActionsContext.Provider>;
};
