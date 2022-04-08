
import { message } from "antd";
import { deleteData } from "src/services/fetch/deleteData";
import { postData } from "src/services/fetch/postData";
import { putData } from "src/services/fetch/putData";
import { ADMIN_ACTIONS } from "./AdminTypes";


export const ActionsInitialState = {
    ObjectAdmin: [],
    key: '',
    name: 'Matematicas',
    description: 'Numerales y nuevos '
}

export const ActionsReducer = (state = ActionsInitialState, action: any) => {

    switch (action.type) {
        case ADMIN_ACTIONS.READ_ADMIN:
            
            return { ...state, ObjectAdmin: action.payload }
        case ADMIN_ACTIONS.CREATE_ADMIN:

            const onFinishAdd = async () => {
                const ActionsObject = {
                    ...action.payload.ActionData

                };
                
                const addRequest = await postData(`${action.payload.url}`, ActionsObject);
                if (addRequest.status) {
                    message.success("creada exitosamente")
                } else {
                    message.error("Algo ha salido mal")
                }
                
            };
            onFinishAdd()
            return { ...state/* , ObjectAdmin: [...state.ObjectAdmin, action.payload] */ }

        case ADMIN_ACTIONS.UPDATE_ADMIN:
            /* state.ObjectAdmin[action.payload.key] = action.payload */
            const onFinishEdit = async () => {
 
                const ActionsObject = {
                    ...action.payload.ActionData
                };
                const updateRequest = await putData(`${action.payload.url}/${action.payload.data._id}` , ActionsObject);
                if(updateRequest.status){
                  message.success(" editado exitosamente")
                }else{
                  message.error("Algo ha salido mal")
                }
              }
              onFinishEdit()  
            return { ...state }
        case ADMIN_ACTIONS.DELETE_ADMIN:
            /* action.payload.map((key: any) => {

                const filterData = (state.ObjectAdmin.filter(sub => sub.key !== key))
                state.ObjectAdmin = filterData

            }) */
            const handleDelete = async () => {
                const deleteRequest = await deleteData(`${action.payload.url}/${action.payload.ActionData[0]['_id']}`)
                if (deleteRequest.status) {

                    message.success("eliminado(s) exitosamente")
                } else {
                    message.error("Algo ha salido mal al eliminar")
                }
            }
            handleDelete()

            return { ...state }
        default:
            return state
    }

}
