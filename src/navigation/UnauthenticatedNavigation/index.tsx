import React from 'react'; 
import { Routes, Route } from 'react-router-dom';
import NotFoundPage from '../../pages/Errors/NotFoundPage';
import LoginPage from '../../pages/Auth/LoginPage';
import RecoverPage from '../../pages/Auth/RecoverPage';

const UnauthenticatedNavigation = () => {
    return(
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/recoverpassword" element={<RecoverPage/>} />
        <Route path='*' element={<NotFoundPage/>}/>

      </Routes>
    )
}

export default UnauthenticatedNavigation;