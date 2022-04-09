import {Col, Row } from 'antd';
import React from 'react'; 
import { ImagenBuo } from 'src/images/ImagenBuo';
import '../../styles/login.css';
import { FormLogin } from 'src/components/Login/FormLogin';

const LoginPage = () => {
    
    return(
        <>
        <div className='content-principal'>
            <Row>
                <Col span={12}>
                    <div className='content-left'>
                        
                        <h1 className='title-pre'>Educational App</h1>
                    </div>
                </Col>
                <Col span={12}>
                    <div className='content-rigt'>
                        <FormLogin />
                    </div>
                </Col>
            </Row>
            <h3>LOGIN PAGE</h3>
        </div>
        </>
    )
}

export default LoginPage;