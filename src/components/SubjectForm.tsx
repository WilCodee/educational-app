import React, { useContext, useState } from 'react'
import { Form, Input, Button, message } from 'antd';
import { ActionsContext } from 'src/context/AuthContext/ActionsContext/ActionsContext';
import { ModalContext } from 'src/context/ModalContext';
import { postData } from 'src/services/fetch/postData'
import { putData } from 'src/services/fetch/putData'
 
export const SubjectForm = () => {
    const { createAction, updateAction } = useContext(ActionsContext)
    const { mode, data, hideModal } = useContext(ModalContext);
    const [isSubmitting, setIsSubmitting] = useState(false);
    


    const onFinishAdd = async (values: any) => {
        setIsSubmitting(true);
        const addRequest = await postData("subjects", values);
        console.log('ar', addRequest)
        if(addRequest.status){
            message.success("Materia creada exitosamente")
            let newSubject = addRequest.subject
            newSubject.key = newSubject._id
            createAction(newSubject)
        }else{
            message.error("Algo ha salido mal creando la materia")
        }
        setIsSubmitting(false);
        hideModal()
  };


    
    const onFinishEdit = async (values:any) => {
        setIsSubmitting(true);
        const updateRequest = await putData("subjects/" + data._id, values)
        if(updateRequest.status){
            message.success("Materia actualizada exitosamente")
            let updatedSubject = updateRequest.subject
            updatedSubject.key = updatedSubject._id
            updateAction(updatedSubject._id, updatedSubject)
        }else{
            message.error("Algo ha salido mal actualizando la materia")
        }
        setIsSubmitting(false);
        hideModal()
      }

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <>
            {mode === "ADD" && (
                <Form
                    name="basic"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    initialValues={{ remember: true }}
                    onFinish={onFinishAdd}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item
                        label="Nombre"
                        name="name"
                        rules={[{ required: true, message: 'Porfavor Ingresa el nombre' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Descripcion"
                        name="description"
                        rules={[{ required: true, message: 'Porfavor Ingresa la Descripcion' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                        <Button type="primary" htmlType="submit" loading={isSubmitting}>
                            Agregar Materia
                        </Button>
                    </Form.Item>
                </Form>
            )}
            {mode === "EDIT" && (
                <Form
                initialValues={{
                    name: data.name, 
                    description: data.description, 
                  }}
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                onFinish={onFinishEdit}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
                
            >
                <Form.Item
                    label="Nombre"
                    name="name"
                    rules={[{ required: true, message: 'Porfavor Ingresa el nombre' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Descripcion"
                    name="description"
                    rules={[{ required: true, message: 'Porfavor Ingresa la Descripcion' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" htmlType="submit" loading={isSubmitting}>
                        Editar Materia
                    </Button>
                </Form.Item>
            </Form>
            )}

        </>
    )
}
