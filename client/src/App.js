import React, { useState, useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';

import Home from './pages/Home';
import Seed from './pages/Seed';

const App = () => {
  const [isLoggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('token')) {
      setLoggedIn(true);
    }
  }, [isLoggedIn]);
  return (
    <main>
      <Switch>
        <Route path='/' component={Home} isLoggedIn={isLoggedIn} exact />
        <Route path='/seed' component={Seed} isLoggedIn={isLoggedIn} exact />
      </Switch>
    </main>
  );
};

export default App;
