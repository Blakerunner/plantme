import React, { useState, useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';

import PrivateRoute from './routing/PrivateRoute';
import Home from './pages/Home';
import Login from './auth/Login';
import Register from './auth/Register';
import About from './pages/About';
import Plants from './pages/Plants';
import Admin from './pages/Admin';
import NotFound from './pages/NotFound';
import Documentation from './pages/Documentation';
import UserPage from './pages/UserPage';

const App = () => {
  const [auth, setAuth] = useState({
    isLoading: true,
    isAuthenticated: false,
  });

  const [login, setLogin] = useState(false);

  useEffect(() => {
    const local_token = localStorage.getItem('plantme_token');
    const session_token = sessionStorage.getItem('plantme_token');
    if (local_token || session_token) {
      setAuth({ isAuthenticated: true, isLoading: false });
    } else {
      setAuth({ isAuthenticated: false, isLoading: false });
    }
  }, [login]);

  console.log(auth);

  return (
    <main>
      <Switch>
        <Route
          path='/'
          render={(props) => <Home {...props} auth={auth} />}
          exact
        />
        <Route
          path='/login'
          render={(props) => <Login {...props} loginHandler={setLogin} />}
          exact
        />
        <Route path='/register' component={Register} exact />
        <Route path='/about' component={About} exact />
        <PrivateRoute
          path='/documentation'
          component={Documentation}
          auth={auth}
          exact
        />
        <Route path='/plants' component={Plants} auth={auth} />
        <PrivateRoute path='/admin' component={Admin} auth={auth} />
        <PrivateRoute path='/mypage/:userId' component={UserPage} auth={auth} />
        <Route component={NotFound} />
      </Switch>
    </main>
  );
};

export default App;
