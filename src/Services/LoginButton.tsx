import React from 'react';
import { Button } from "antd";
import EducationalApp from "../pages/EducationalApp";

export const LoginButton =() => {
  const [isLogin, setIsLogin] = React.useState(false)
  return (
    <div>
      
      <Button onClick={() => setIsLogin(!isLogin)}  type="primary">
      { isLogin ? 'Salir' : 'Ingresar'  }
      </Button>
      <EducationalApp isLogin={isLogin} />
    </div>
  );
}
