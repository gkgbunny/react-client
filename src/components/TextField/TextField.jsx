import React from 'react';
import PropTypes from 'prop-types';
import style from './style';

const TextField = (props) => {
  const { error, ...rest } = props;
  const contentError = (error) ? style.error : {};
  return (
    <>
      <input type="text" {...rest} style={{ ...style.base, ...contentError }} />
      {(error) ? <info style={{ ...style.color }}>{error}</info> : ''}
    </>
  );
};
TextField.propTypes = {
  error: PropTypes.string,
};
TextField.defaultProps = {
  error: '',
};
export default TextField;
