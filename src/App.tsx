import React from 'react';
import "./App.css";
import { AuthProvider } from './context/AuthContext';
import EducationalApp from "./pages/EducationalApp";
function App() {

  return (
    <div className="App">
      <AuthProvider>
          <EducationalApp />
      </AuthProvider>
    </div>
  );
}

export default App