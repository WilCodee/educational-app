import React from "react";
import AuthenticatedNavigation from "../navigation/AuthenticatedNavigation";
import UnauthenticatedNavigation from "../navigation/UnauthenticatedNavigation";

const EducationalApp = ({isLogin}:any):any => {

  if (!isLogin) return <UnauthenticatedNavigation />;
  if (isLogin) return <AuthenticatedNavigation />;
};

export default EducationalApp;