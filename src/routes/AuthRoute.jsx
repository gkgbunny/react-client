import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import { AuthLayout } from '../layouts';

const AuthRoute = ({ component: Component, ...rest }) => {
  const storedToken = localStorage.getItem('token');
  if (!storedToken) {
    return (
      <Route
        {...rest}
        render={matchProps => (
          <AuthLayout>
            <Component {...matchProps} />
          </AuthLayout>
        )}
      />
    );
  }
  return (
    <Route>
      <Redirect to="/trainee" />
    </Route>
  );
};
AuthRoute.propTypes = {
  component: PropTypes.element.isRequired,
};
export default AuthRoute;
