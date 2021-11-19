import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ component: Component, isAuthenticated, ...rest }) => {

    console.log(isAuthenticated.isAuthenticated);

    return (
        <Route {...rest}
            render={(props) =>
                isAuthenticated.isAuthenticated ? (
                    <Component {...props} />
                ) : (isAuthenticated.isLoading ? 'Loading...' : <Redirect to="/login" />)
            }
        />
    );
};

export default PrivateRoute;