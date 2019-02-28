import React from 'react';
import PropTypes from 'prop-types';

const LoginLayout = ({ children }) => (
  <div>
    <div>{children}</div>
  </div>
);
LoginLayout.propTypes = {
  children: PropTypes.element.isRequired,
};
export default LoginLayout;
