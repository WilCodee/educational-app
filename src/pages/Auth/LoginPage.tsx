import { Button } from 'antd';
import React, { useContext } from 'react'; 
import { AuthContext } from 'src/context/AuthContext';

const LoginPage = () => {
    const { login } = useContext(AuthContext)
    return(
        <div>
            <h3>LOGIN PAGE</h3>
            <Button type='primary' onClick={login}>INICIAR SESIÓN</Button>
        </div>
    )
}

export default LoginPage;