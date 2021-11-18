import React from "react";
import { Route, Switch } from "react-router-dom";
import "./App.css";

import PrivateRoute from "./routing/PrivateRoute";
import Home from "./pages/Home";
import Seed from "./pages/Seed";
import Login from "./auth/Login";
import Register from "./auth/Register";
import About from "./pages/About";
import Plants from "./pages/Plants";


const App = () => {

  const isAuthenticated = () => {
    const token = localStorage.getItem('plantme_token');
    try {
      if (token) {
        return true;
      }
      else {
        return false;
      }
    } catch (error) {
      return false;
    }
  }

  return (
    <main>
      <Switch>
        <PrivateRoute path="/" component={Home} isAuthenticated={isAuthenticated} exact />
        <Route path="/login" component={Login} exact isAuthenticated={isAuthenticated} />
        <Route path="/about" component={About} exact />
        <PrivateRoute path="/plants" component={Plants} isAuthenticated={isAuthenticated} />
        <PrivateRoute path="/seed" component={Seed} isAuthenticated={isAuthenticated} exact />
        <Route path="/register" component={Register} exact />
      </Switch>
    </main>
  );
};

export default App;
