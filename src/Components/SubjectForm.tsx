import React from 'react'
import { Form, Input, Button } from 'antd';



export const SubjectForm = () => {

    const onFinish = (values: any) => {
        console.log('Success:', values);
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
                    name="username"
                    rules={[{ required: true, message: 'Porfavor Ingresa el nombre' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Descripcion"
                    name="description"
                    rules={[{ required: true, message: 'Porfavor Ingresa la Descripcion' }]}
                >
                    <Input/>
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
