import React, { useContext, useEffect } from "react";
import AuthenticatedNavigation from "../navigation/AuthenticatedNavigation";
import UnauthenticatedNavigation from "../navigation/UnauthenticatedNavigation";
import { AuthContext } from "../context/AuthContext";
const EducationalApp = (): any => {
  const { isLogin, login } = useContext(AuthContext);
  useEffect(() => {
    const sessionInfo = localStorage.getItem("userData");
    if (typeof sessionInfo !== "undefined" && sessionInfo !== null) {
      login(sessionInfo);
    }
    console.log(sessionInfo);
  }, []);

  if (!isLogin) return <UnauthenticatedNavigation />;
  if (isLogin) return <AuthenticatedNavigation />;
};

export default EducationalApp;
