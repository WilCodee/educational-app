import React from 'react';
import { Button } from "antd";
import "./App.css";
import EducationalApp from "./pages/EducationalApp";

function App() {
  const [isLogin, setIsLogin] = React.useState(false)
  return (
    <div className="App">
      <Button onClick={() => setIsLogin(!isLogin)}  type="primary">
      { isLogin ? 'Salir' : 'Ingresar'  }
      </Button>
      <EducationalApp isLogin={isLogin} />
    </div>
  );
}

export default App;
