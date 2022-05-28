import { Button,Form, Input, message } from 'antd';
import React, {  useState } from 'react';
import { LoginOutlined,AlertOutlined } from '@ant-design/icons';
import { getData } from 'src/services/fetch/getData';
import { useNavigate } from 'react-router-dom';

export const RecoverPassword = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate()

    const onFinish = async(values: any)=>{
        try {
            setLoading(true);
            const requestEmail = await getData(`send_welcome_email/${values.email}`);
            if (requestEmail.status) {
                message.success("Credenciales enviadas");
            }else{
                message.error('El Correo No existe en la plataforma');
            }
        } catch (error) {
            message.error('Ha existido un error al enviar los datos:'+error);
        }
        setLoading(false);
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
                    <Form.Item >
                        <Button type="primary" htmlType="submit" className='button-login' icon={<LoginOutlined />} loading={loading} disabled={loading}>
                            Enviar Credenciales
                        </Button>
                    </Form.Item>
                    <Form.Item >
                        <Button type="primary" htmlType="submit" className='button-login'  onClick={() => navigate("/") }icon={<AlertOutlined />} disabled={loading}>
                            Volver a Inicio de Sesion
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </>
    )
}
