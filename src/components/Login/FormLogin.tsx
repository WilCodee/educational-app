import { Button, Checkbox, Form, Input, message } from 'antd';
import React, { useContext, useState } from 'react';
import { AuthContext } from 'src/context/AuthContext';
import { LoginOutlined } from '@ant-design/icons';
import { postData } from 'src/services/fetch/postData';

export const FormLogin = () => {
    const [loading, setLoading] = useState(false);

    const { login } = useContext(AuthContext);

    const onFinish = async(values: any)=>{
        try {
            setLoading(true);
            const datarequest = {email: values.email,password:values.password};
            const resp = await postData('login', datarequest)
            if(resp.status){
                const { user, token } = resp
                localStorage.setItem("userData", JSON.stringify(user));
                localStorage.setItem("token", token);
                login(user)
                const {firstName,lastName} =  user.profile.fullName;
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