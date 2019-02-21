import React from 'react';
import PropTypes from 'prop-types';
// import style from './style';

const Button = (props) => {
  const {
    disabled,
    style,
    value,
    onClick,
  } = props;

  return (
    <>
      <input type="button" onClick={onClick} disabled={disabled} value={value} style={style} />
    </>
  );
};
Button.propTypes = {
  disabled: PropTypes.bool,
  style: PropTypes.objectOf(PropTypes.string),
  value: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};
Button.defaultProps = {
  disabled: 'false',
  style: {},
};
export default Button;
