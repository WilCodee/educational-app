import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { SideBar } from 'src/UI/SideBar';
import StudentsPage from '../../pages/Admin/StudentsPage';
import TeachersPage from '../../pages/Admin/TeachersPage';
import { Layout } from 'antd';
import { Navbar } from 'src/UI/Navbar';
import { SubjectsPage } from 'src/pages/Admin/SubjectsPage';
import { ModalProvider } from 'src/context/ModalContext';


const AuthenticatedNavigation = () => {
  return (
    <>
      <Layout>
      <Navbar />
        <SideBar >
        <ModalProvider>
        <Routes>
          <Route path="students" element={<StudentsPage />} />
          <Route path="teachers" element={<TeachersPage />} />
          <Route path="subjects" element={<SubjectsPage/>} />
        </Routes>
        </ModalProvider>
        </SideBar>
      </Layout>
    </>
  )
}

export default AuthenticatedNavigation; 