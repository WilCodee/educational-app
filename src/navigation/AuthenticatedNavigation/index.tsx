import React from 'react'; 
import { Routes, Route } from 'react-router-dom';
import StudentsPage from '../../pages/Admin/StudentsPage';
import TeachersPage from '../../pages/Admin/TeachersPage';

const AuthenticatedNavigation = () => {
    return(
      <Routes>
        <Route path="/" element={<StudentsPage />} />
        <Route path="teachers" element={<TeachersPage />} />
      </Routes>
    )
}

export default AuthenticatedNavigation; 