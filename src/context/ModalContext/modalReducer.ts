import { MODAL_ACTIONS} from "./modalActions";

export const modalInitialState = {
  isOpen: false,
  mode: 'DETAILS', 
  data:{},
  title: '',
  contentComponent:'',
};

export function modalReducer(state, action) {
  switch (action.type) {
    case  MODAL_ACTIONS.SHOW_MODAL:
      return { ...state, 
               isOpen: true, 
               mode: action.payload.mode, 
               data: action.payload.data, 
               title: action.payload.title,
               contentComponent: action.payload.contentComponent
            };

    case MODAL_ACTIONS.HIDE_MODAL :
        return { ...state, 
                 isOpen: false,
                 mode: 'DETAILS', 
                 data: {},
                 title: '',
                 contentComponent: '' 
               };
    default:
      console.log("default action");
  }
}