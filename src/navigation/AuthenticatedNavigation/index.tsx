import React, { useContext, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { SideBar } from "src/UI/SideBar";
import StudentsPage from "../../pages/Admin/StudentsPage";
import TeachersPage from "../../pages/Admin/TeachersPage";
import NotFoundPage from "../../pages/Errors/NotFoundPage";
import { Layout } from "antd";
import { Navbar } from "src/UI/Navbar";
import { SubjectsPage } from "src/pages/Admin/SubjectsPage";
import { ActionsProvider } from "src/context/AuthContext/ActionsContext/ActionsContext";
import { ModalProvider } from "src/context/ModalContext";
import CoursesPage from "src/pages/Admin/CoursesPage";
import { AuthContext } from "src/context/AuthContext";
import ActivitiesPage from "src/pages/Teachers/ActivitiesPage";

const AuthenticatedNavigation = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  useEffect(() => {
    user.isAdmin && navigate("/courses");
    user.isTeacher && navigate("/courses");
    user.isStudent && navigate("/courses");
  }, []);

  return (
    <>
      <Layout>
        <ActionsProvider>
          <Navbar />
          <SideBar>
            <ModalProvider>
              <Routes>
               
                {user.isAdmin && (
                  <>
                    <Route path="students" element={<StudentsPage />} />
                    <Route path="teachers" element={<TeachersPage />} />
                    <Route path="subjects" element={<SubjectsPage />} />
                    <Route path="courses" element={<CoursesPage />} />
                    
                  </>
                )}
                {user.isTeacher && (
                  <>
                    <Route path="courses" element={<CoursesPage />} />
                    <Route path="activities" element={<ActivitiesPage />} />
                  </>
                )}
                {user.isStudent && (
                  <>
                    <Route path="courses" element={<CoursesPage />} />
                  </>
                )}
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </ModalProvider>
          </SideBar>
        </ActionsProvider>
      </Layout>
    </>
  );
};

export default AuthenticatedNavigation;
