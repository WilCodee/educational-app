import React, { useContext, useEffect, useState } from 'react'
import { Form, Input, Button } from 'antd';
import { SubjectContext } from 'src/context/AuthContext/SubjectContext/SubjectContext';



export const SubjectForm = ( selectedKey: any) => {
    const { createSubject, subjects, uploadSubject} = useContext(SubjectContext)

    const onFinish = (values: any) => {
/* 
            uploadSubject({
                key: selectedKey.selectedKey[0],
                ...values
            }) */

            createSubject({
                key: subjects.length + 1, //EN PRUEBAS - CON LA API SE ARREGLA
                ...values
            })
        console.log('LLave:', selectedKey.selectedKey[0]);
        console.log('Success:', subjects); 
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <>

            <Form
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
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
                    <Button type="primary" htmlType="submit">
                        Enviar
                    </Button>
                </Form.Item>
            </Form>

        </>
    )
}
