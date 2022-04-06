import React, { useReducer} from 'react';
import { Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { modalInitialState, modalReducer } from './modalReducer';
import { MODAL_ACTIONS } from './modalActions';
import StudentForm from 'src/components/Forms/StudentForm';
import StudentDetail from 'src/components/Details/StudentDetail';


export const MODAL_MODES = {
    ADD : "ADD",
    EDIT: "EDIT",
    DETAILS: "DETAILS"
}


export const ModalContext = React.createContext({});

const { confirm } = Modal;


export const ModalProvider = ({children}) => {
    

    const [state, dispatch] = useReducer( modalReducer , modalInitialState );


    const handleCancel = () => {
        if(state.mode !== MODAL_MODES.DETAILS ){
            confirm( {
            title: '¿Confirmas que deseas cerrar el formulario?',
            icon: <ExclamationCircleOutlined />,
            content: 'Se perderá toda la información ingresada.',
            okText: 'Sí',
            cancelText: 'No',
            onOk() {
                // form.resetFields();
                dispatch({type: MODAL_ACTIONS.HIDE_MODAL});
            },
            onCancel() {},
            });
            return; 
        }
        dispatch({type: MODAL_ACTIONS.HIDE_MODAL})
    };
    
    const ModalForm = () => {
        let content;
        switch(state.contentComponent){
            case 'StudentForm':
                content = <StudentForm />
                break;  
            default:
                console.log('No se ha enviado un formulario como paráemtro');
                break;
        }
        return content; 
    }

    const ModalDetails = () => {
        let content; 
        switch(state.contentComponent){
            case 'StudentDetail':
                content = <StudentDetail />
                break;

            default:
                console.log('No se ha enviado un formulario como paráemtro');
                break;
        }
        return content; 
    }

   

    const value ={
        isOpen: state.isOpen,
        mode: state.mode, 
        data: state.data, 
        title: state.title, 
        contentComponent: state.contentComponent,
        ingredients: state.ingredients,
        showModal: (info) => dispatch({type: MODAL_ACTIONS.SHOW_MODAL, payload: info }) ,
        hideModal: () => dispatch({type: MODAL_ACTIONS.HIDE_MODAL})
    };


      return(
      <>
      <ModalContext.Provider value= {value}>
      {children}
      
      <Modal
        title={<h3>{state.title}</h3>}
        visible={ state.isOpen }
        maskClosable={ false }
        onCancel={handleCancel}
        footer={ null }
        width={ 600 }
        destroyOnClose={true}>
        
         { state.mode === MODAL_MODES.ADD && <ModalForm/>}
         { state.mode === MODAL_MODES.EDIT && <ModalForm/> }
         { state.mode === MODAL_MODES.DETAILS && <ModalDetails/>}

      </Modal>
      </ModalContext.Provider>
      
      </>
      )
}