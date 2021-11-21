import React, { useState, useEffect } from "react";
import { Route, Switch } from "react-router-dom";

import PrivateRoute from "./routing/PrivateRoute";
import Home from "./pages/Home";
import Seed from "./pages/Seed";
import Login from "./auth/Login";
import Register from "./auth/Register";
import About from "./pages/About";
import Plants from "./pages/Plants";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";

const App = () => {
  const [auth, setAuth] = useState({
    isLoading: true,
    isAuthenticated: false,
  });

  useEffect(() => {
    const local_token = localStorage.getItem("plantme_token");
    const session_token = sessionStorage.getItem("plantme_token");
    if (local_token || session_token) {
      setAuth({ isAuthenticated: true, isLoading: false });
    } else {
      setAuth({ isAuthenticated: false, isLoading: false });
    }
  }, []);

  console.log(auth);

  return (
    <main>
      <Switch>
        <PrivateRoute path="/" component={Home} auth={auth} exact />
        <Route path="/login" component={Login} exact />
        <Route path="/about" component={About} exact />
        <PrivateRoute path="/plants" component={Plants} auth={auth} />
        <PrivateRoute path="/admin" component={Admin} auth={auth} />
        <PrivateRoute path="/seed" component={Seed} auth={auth} exact />
        <Route path="/register" component={Register} exact />
        <Route component={NotFound} />
      </Switch>
    </main>
  );
};

export default App;
