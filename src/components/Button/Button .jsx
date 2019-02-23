import React from 'react';
import PropTypes from 'prop-types';
import style from './style';

const Button = (props) => {
  const {
    disabled,
    value,
    buttonStyle,
  } = props;
  const contentSuccess = (disabled) ? {} : buttonStyle;
  return (
    <>
      <input type="button" disabled={disabled} value={value} style={{ ...style.base, ...contentSuccess }} />
    </>
  );
};
Button.propTypes = {
  disabled: PropTypes.bool,
  value: PropTypes.string.isRequired,
  buttonStyle: PropTypes.objectOf(PropTypes.string),
};
Button.defaultProps = {
  disabled: 'false',
  buttonStyle: {},
};
export default Button;
