import { Button, Checkbox, Form, Input, message } from 'antd';
import React, { useContext } from 'react';
import { AuthContext } from 'src/context/AuthContext';
import { LoginOutlined } from '@ant-design/icons';

export const FormLogin = () => {


    const { login } = useContext(AuthContext);

    const onFinish = async(values: any)=>{
        try {
            const url_API= 'https://educational-api.herokuapp.com/login';
            const datarequest = {email: values.email,password:values.password};
            const resp = await fetch(url_API,{
                method: 'POST', // or 'PUT'
                body: JSON.stringify(datarequest), // data can be `string` or {object}!
                headers:{
                  'Content-Type': 'application/json'
                }})
                const {status, token, user, user_id} =  await resp.json();
            if(status){
                localStorage.setItem("userData", user)
                localStorage.setItem("token", token)
                console.log( status, token, user, user_id);
                login()
            }else{
                message.error('El error de Incio de sesión: ');
            }
        } catch (error) {
            console.error('El error es: '+error);
        }

    }
    return (
        
        <>
            <div className='form-login'>
                <Form
                    name="basic"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                >
                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[{ required: true, message: 'Please input your username!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
                        <Checkbox className='check-login'>Recordarme</Checkbox>
                    </Form.Item>

                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                        <Button type="primary" htmlType="submit" className='button-login' icon={<LoginOutlined />}>
                            Iniciar Sesión
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </>
    )
}