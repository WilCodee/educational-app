import React, { useContext, useEffect, useState } from 'react'
import { Form, Input, Button } from 'antd';
import { SubjectContext } from 'src/context/AuthContext/SubjectContext/SubjectContext';
import { ModalContext } from 'src/context/ModalContext';



export const SubjectForm = (selectedKey: any) => {
    const { createSubject, subjects, uploadSubject } = useContext(SubjectContext)
    const { mode, data, hideModal } = useContext(ModalContext);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const onFinishAdd = (values: any) => {

        createSubject({
            key: subjects.length + 1, //EN PRUEBAS - CON LA API SE ARREGLA
            ...values
        })
        hideModal()
        console.log('LLave:', selectedKey.selectedKey[0]);
        console.log('Success:', subjects);
    };
    const onFinishEdit = (values: any) => {

        uploadSubject({
            
            key: selectedKey.selectedKey[0],
            ...values
        })
        hideModal()
        console.log('LLave:', selectedKey.selectedKey[0]);
        console.log('Success:', subjects);
    };


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
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                initialValues={{ remember: true }}
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
