import {Col, Row } from 'antd';
import React from 'react'; 
import '../../styles/login.css';
import { FormLogin } from 'src/components/Login/FormLogin';


const LoginPage = () => {
    
    return(
        <>
        <div className='content-principal'>
            <Row>
                <Col xxl={12} xl={12} lg={12} md={24} sm={24} xs={24}>
                    <div className='content-left content-left-lg'>
                        <img src={require('../../assets/images/logo.png')} alt="noencontrado" width={220} height={240} />
                        <h1 className='title-pre'>Thot</h1>
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