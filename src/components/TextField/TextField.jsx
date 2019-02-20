import React from 'react';
import PropTypes from 'prop-types';
import style from './style';

const TextField = (props) => {
  const { error, ...rest } = props;
  return (
    <>
      <input type="text" {...rest} style={{ ...style.base }} />
    </>
  );
};
TextField.propTypes = {
  error: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func,
};
TextField.defaultProps = {
  error: '',
  onChange: () => {},
};
export default TextField;
