import React, { useContext, useState } from 'react'
import { Form, Input, Button } from 'antd';
import { ActionsContext } from 'src/context/AuthContext/ActionsContext/ActionsContext';
import { ModalContext } from 'src/context/ModalContext';



export const SubjectForm = (selectedKey: any) => {
    const { createAction, uploadAction } = useContext(ActionsContext)
    const { mode, data, hideModal } = useContext(ModalContext);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const onFinishAdd = async (values: any) => {
        setIsSubmitting(true)
        createAction('subjects',values)
        setIsSubmitting(false)
        hideModal()

    };
    
    const onFinishEdit = async (values:any) => {

        setIsSubmitting(true);
        uploadAction('subjects',data,values)
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
                            Agregar Materias
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
                        Editar Materias
                    </Button>
                </Form.Item>
            </Form>
            )}

        </>
    )
}
