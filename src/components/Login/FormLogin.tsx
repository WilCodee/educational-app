import { Button, Card, Form, Input, message } from 'antd';
import React, { useContext, useState } from 'react';
import { AuthContext } from 'src/context/AuthContext';
import { LoginOutlined } from '@ant-design/icons';
import { postData } from 'src/services/fetch/postData';
import { postData as superAdminPostData } from 'src/services/fetch/superadmin/postData'
import { useNavigate } from 'react-router-dom';

export const FormLogin = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate()
    const { login } = useContext(AuthContext);

    const onFinish = async (values: any) => {
        try {
            setLoading(true);
            const instituteRequest = await superAdminPostData('institute_by_code', { code: values.code })
            console.log('ir', instituteRequest)
            if (instituteRequest.status) {
                const datarequest = { email: values.email, password: values.password, dbb_id: instituteRequest.institute.dbb_id };
                const resp = await postData('login', datarequest)
                if (resp.status) {
                    //save institute info in localstorage
                    const { institute } = instituteRequest
                    localStorage.setItem("institute", JSON.stringify(institute))

                    //save user info in localstorage and do login
                    const { user, token } = resp
                    localStorage.setItem("userData", JSON.stringify(user));
                    localStorage.setItem("token", token);
                    login(user)
                    const { firstName, lastName } = user.profile.fullName;
                    message.success(`Bienvenido ${firstName}  ${lastName}`)
                    setTimeout(function () {
                    }, 5000);
                } else {
                    message.error('Credenciales incorrectas ');
                }
            } else {
                message.error("Instituto no encontrado")
            }
            setLoading(false);
        } catch (error) {
            console.error('El error es: ' + error);
        }
    }
    return (

        <Card title="Inicio de Sesión" style={{ width: "70%" }} >

            <Form
                name="basic"
                initialValues={{ remember: true }}
                onFinish={onFinish}
                layout="vertical"
            >
                <Form.Item
                    label="Código"
                    name="code"
                    rules={[{ required: true, message: 'Por favor ingrese el código de su institución!' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Email"
                    name="email"
                    rules={[{ required: true, message: 'Por favor ingrese su correo!' }, { type: 'email', message: 'Ingrese un email valido!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[{ required: true, message: 'Por favor ingrese su contraseña!' }]}
                    extra={<a onClick={() => navigate("/recoverpassword")}>Olvidé mi contraseña</a>}
                >
                    <Input.Password />
                </Form.Item>






                <Form.Item>
                    <Button
                        type="primary"
                        htmlType="submit"
                        className='button-login'
                        icon={<LoginOutlined />}
                        loading={loading}
                        disabled={loading}
                    >
                        Iniciar Sesión
                    </Button>
                </Form.Item>
            </Form>

        </Card>
    )
}