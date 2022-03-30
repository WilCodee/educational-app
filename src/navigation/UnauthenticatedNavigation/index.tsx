import React from 'react'; 
import { Routes, Route } from 'react-router-dom';
import LoginPage from '../../pages/Auth/LoginPage';

const UnauthenticatedNavigation = () => {
    return(
      <Routes>
        <Route path="/" element={<LoginPage />} />
      </Routes>
    )
}

export default UnauthenticatedNavigation;