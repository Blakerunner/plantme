import React, { useState, useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import "./App.css";

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

  const [isAuthenticated, setAuthenticated] = useState({
    isLoading: true,
    isAuthenticated: false,
  });

  useEffect(() => {
    const local_token = localStorage.getItem('plantme_token');
    const session_token = sessionStorage.getItem('plantme_token');
    if (local_token || session_token) {
      setAuthenticated({ isAuthenticated: true, isLoading: false });
    } else {
      setAuthenticated({ isAuthenticated: false, isLoading: false });
    }

  }, [])

  console.log(isAuthenticated);

  return (<main>
    <Switch>
      <PrivateRoute path="/" component={Home} isAuthenticated={isAuthenticated} exact />
      <Route path="/login" component={Login} isAuthenticated={isAuthenticated} exact />
      <Route path="/about" component={About} exact />
      <PrivateRoute path="/plants" component={Plants} isAuthenticated={isAuthenticated} />
      <PrivateRoute path="/admin" component={Admin} isAuthenticated={isAuthenticated} />
      <PrivateRoute path="/seed" component={Seed} isAuthenticated={isAuthenticated} exact />
      <Route path="/register" component={Register} exact />
      <Route component={NotFound} />
    </Switch>
  </main>

  );
};

export default App;
