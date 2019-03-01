import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';
import { PrivateLayout } from '../layouts';
import { NoMatch } from '../pages';

const PrivateRoute = ({ component: Component, ...rest }) => {
  if (rest.computedMatch.isExact) {
    return (
      <Route
        {...rest}
        render={matchProps => (
          <PrivateLayout>
            <Component {...matchProps} />
          </PrivateLayout>
        )
        }
      />
    );
  }
  return <NoMatch />;
};

PrivateRoute.propTypes = {
  component: PropTypes.element.isRequired,
};
export default PrivateRoute;
