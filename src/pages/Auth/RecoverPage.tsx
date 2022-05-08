import {Col, Row } from 'antd';
import React from 'react'; 
import '../../styles/login.css';
import { RecoverPassword } from '../AllUsers/RecoverPassword';

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
                        <RecoverPassword />
                    </div>
                </Col>
            </Row>
        </div>
        </>
    )
}

export default LoginPage;