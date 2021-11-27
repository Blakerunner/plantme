import React, { useState, useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import axios from 'axios';

import PrivateRoute from './routing/PrivateRoute';
import NavbarController from './pages/NavbarController';
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
  const [user, setUser] = useState(null);

  useEffect(() => {
    const local_token = localStorage.getItem('plantme_token');
    const session_token = sessionStorage.getItem('plantme_token');
    if (local_token || session_token) {
      setAuth({ isAuthenticated: true, isLoading: false });
    } else {
      setAuth({ isAuthenticated: false, isLoading: false });
    }
  }, [login]);

  useEffect(() => {
    if ( user == null ) {
      const getUser = async () => {
        const token = sessionStorage.getItem('plantme_token');
        const REACT_APP_SERVER_URL = process.env.REACT_APP_SERVER_URL || "https://plantme.blakerunner.com";

        const response = await axios({
          method: 'get',
          headers: {
            authorization: `Bearer ${token}`
          },
          url: `${REACT_APP_SERVER_URL}/api/v1/auth/silentLogin`
        });
        sessionStorage.setItem('plantme_token', response.data.data.token);
        setUser({
          token: response.data.data.token,
          ...response.data.data.user
        })
      }
      getUser();
    }
  }, [user]);

  return (
    <main>
      <NavbarController auth={auth} user={user} />
      <Switch>
        <Route
          path='/'
          render={() => <div>Welcome to PlantMe</div>}
          exact
        />
        <Route
          path='/login'
          render={(props) => <Login {...props} loginHandler={setLogin} setUser={setUser} />}
          exact
        />
        <Route path='/register' component={Register} exact />
        <Route path='/about' component={About} exact />
        <Route path='/plants'>
          <Plants auth={auth} token={user ? user.token : '' } />
        </Route> 
        <PrivateRoute path='/documentation'>
          <Documentation auth={auth} exact />
        </PrivateRoute>
        <PrivateRoute path='/admin'>
          <Admin auth={auth} isAdmin={user ? user.isAdmin : false} token={user ? user.token : ''} />
        </PrivateRoute>
        <PrivateRoute path='/mypage'>
          <UserPage auth={auth} token={user ? user.token : '' } />
        </PrivateRoute>
        <Route component={NotFound} />
      </Switch>
    </main>
  );
};

export default App;
