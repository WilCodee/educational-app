import { Button, Checkbox, Form, Input, message } from 'antd';
import React, { useContext, useState } from 'react';
import { AuthContext } from 'src/context/AuthContext';
import { LoginOutlined } from '@ant-design/icons';

export const FormLogin = () => {
    const [loading, setLoading] = useState(false);

    const { login } = useContext(AuthContext);

    const onFinish = async(values: any)=>{
        try {
            setLoading(true);
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
                const {firstName,lastName} =  await user.profile.fullName;
                message.success(`Bienvenido ${firstName}  ${lastName}`)

                setTimeout(function(){
                },5000);
            }else{
                message.error('Credenciales incorrectas ');
            }
            setLoading(false);
        } catch (error) {
            console.error('El error es: '+error);
        }

    }
    return (
        
        <>
            <div className='form-login'>
                <Form
                    name="basic"
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                >
                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[{ required: true, message: 'Por favor ingrese su correo!' }, {type:'email', message: 'Ingrese un email valido!'}]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[{ required: true, message: 'Por favor ingrese su contraseña!' }]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item name="remember" valuePropName="checked" >
                        <Checkbox className='check-login'>Recordarme</Checkbox>
                    </Form.Item>

                    <Form.Item >
                        <Button type="primary" htmlType="submit" className='button-login' icon={<LoginOutlined />} loading={loading} disabled={loading}>
                            Iniciar Sesión
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </>
    )
}