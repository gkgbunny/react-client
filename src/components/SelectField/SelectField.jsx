import React from 'react';
import PropTypes from 'prop-types';
import style from './style';

const SelectField = (props) => {
  const {
    defaultText,
    options,
    value,
    isTouched,
    error,
    ...rest
  } = props;
  const contentError = (error) ? style.errorStyle : {};
  return (
    <>
      <select {...rest} value={value} style={{ ...style.base, ...contentError }}>
        <option value="">{defaultText}</option>
        {options.map(element => <option value={element.value}>{element.value}</option>)}
      </select>
      {(error) ? <info style={{ ...style.color }}>{error}</info> : ''}
    </>
  );
};

SelectField.propTypes = {
  error: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  defaultText: PropTypes.string,
  isTouched: PropTypes.bool,
  options: PropTypes.arrayOf(PropTypes.string),
};
SelectField.defaultProps = {
  error: '',
  isTouched: false,
  onChange: () => {},
  defaultText: 'select',
  options: [],
};
export default SelectField;
