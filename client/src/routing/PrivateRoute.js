import React from "react";
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const props = children.props;
  
  return (
    <Route>
      {props.auth.isAuthenticated ? children :  <Redirect to="/login" /> }
    </Route>
  );
};

export default PrivateRoute;
