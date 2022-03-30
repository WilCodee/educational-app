import { Button } from 'antd';
import React, { useContext } from 'react'; 
import { AuthContext } from 'src/context/AuthContext';

const StudentsPage = () => {
    const {logout} = useContext(AuthContext);
    return(
        <div>
            <h3>Estudiantes Page</h3>
            <Button type='primary' onClick={logout}>CERRAR SESIÓN</Button>
        </div>
    )
}

export default StudentsPage; 