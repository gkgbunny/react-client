import React from 'react';
import PropTypes from 'prop-types';
import style from './style';

const Button = (props) => {
  const {
    disabled,
    value,
  } = props;
  console.log('Inside Button****************', disabled);
  // const contentSuccess = (disabled) ? {} : style.successColor;
  return (
    <>
      <input type="button" disabled={disabled} value={value} style={{ ...style.base }} />
    </>
  );
};
Button.propTypes = {
  disabled: PropTypes.bool,
  value: PropTypes.string.isRequired,
};
Button.defaultProps = {
  disabled: 'false',
};
export default Button;
