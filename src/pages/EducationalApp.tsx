import React, { useContext } from "react";
import AuthenticatedNavigation from "../navigation/AuthenticatedNavigation";
import UnauthenticatedNavigation from "../navigation/UnauthenticatedNavigation";
import { AuthContext } from "../context/AuthContext"; 

const EducationalApp = ():any => {
  const { isLogin } = useContext(AuthContext)
 
  if (!isLogin) return <UnauthenticatedNavigation />;
  if (isLogin) return <AuthenticatedNavigation />;
};

export default EducationalApp;