import React from 'react';
import PropTypes from 'prop-types';
import style from './style';

const TextField = (props) => {
  const { error, ...rest } = props;

  const contentError = (error) ? style.errorStyle : {};
  return (
    <>
      <input type="text" {...rest} style={{ ...style.base, ...contentError }} />
      {(error) ? <p style={{ ...style.color }}>{error}</p> : ''}
    </>
  );
};
TextField.propTypes = {
  error: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  onClick: PropTypes.func,
  onBlur: PropTypes.func,
};
TextField.defaultProps = {
  error: '',
  onChange: () => {},
  onClick: () => {},
  onBlur: () => {},
};
export default TextField;
