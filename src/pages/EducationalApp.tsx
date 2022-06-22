import React, { useContext, useEffect } from "react";
import AuthenticatedNavigation from "../navigation/AuthenticatedNavigation";
import UnauthenticatedNavigation from "../navigation/UnauthenticatedNavigation";
import { AuthContext } from "../context/AuthContext";
import { Provider } from 'react-redux'
import { store } from "src/store";

const EducationalApp = (): any => {
  const { isLogin, login} = useContext(AuthContext);
  useEffect(() => {
    const sessionInfo = localStorage.getItem("userData");
    if (typeof sessionInfo !== "undefined" && sessionInfo !== null) {
      login(JSON.parse(sessionInfo));
    }
  }, []);

  if (!isLogin) return <UnauthenticatedNavigation />;
  if (isLogin) return (
  <Provider store={store}>
    <AuthenticatedNavigation />
  </Provider>
  )
};

export default EducationalApp;
