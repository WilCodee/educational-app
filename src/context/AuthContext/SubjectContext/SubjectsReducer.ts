
import { SUBJECT_ACTIONS } from "./SubjectsTypes";


export const subjectInitialState = {
    subjects: [],
    key: '',
    name: 'Matematicas',
    description: 'Numerales y nuevos '
}

export const SubjectsReducer = (state = subjectInitialState, action: any) => {

    switch (action.type) {
        case SUBJECT_ACTIONS.READ_SUBJECT:
            return { ...state, subjects:action.payload}
        case SUBJECT_ACTIONS.CREATE_SUBJECT:
            return { ...state, subjects:[ ...state.subjects ,action.payload]}
        case SUBJECT_ACTIONS.UPDATE_SUBJECT: 
        state.subjects[action.payload.key] = action.payload 
            return { ...state }
        case SUBJECT_ACTIONS.DELETE_SUBJECT:         
            action.payload.map((key:any) =>{

                const filterData = ( state.subjects.filter(sub => sub.key !== key))
                state.subjects =filterData
                
            })
        
            return { ...state }
        default:
            return state
    }

}
