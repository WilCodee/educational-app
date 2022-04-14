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
                <Col xxl={12} xl={12} lg={12} md={24} sm={24} xs={24}>
                    <div className='content-left content-left-lg'>
                        
                        <h1 className='title-pre'>Educational App</h1>
                    </div>
                </Col>
                <Col xxl={12} xl={12} lg={12}  md={24} sm={24} xs={24}>
                    <div className='content-rigt'>
                        <FormLogin />
                    </div>
                </Col>
            </Row>
        </div>
        </>
    )
}

export default LoginPage;