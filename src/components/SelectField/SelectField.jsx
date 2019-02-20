import React from 'react';
import PropTypes from 'prop-types';
import style from './style';

const SelectField = (props) => {
  const {
    defaultText,
    options,
    value,
    ...rest
  } = props;

  return (
    <>
      <select {...rest} value={value} style={{ ...style.base }}>
        <option value="">{defaultText}</option>
        {options.map(element => <option value={element.value}>{element.value}</option>)}
      </select>
    </>
  );
};

SelectField.propTypes = {
  error: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  defaultText: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.string),
};
SelectField.defaultProps = {
  error: '',
  onChange: () => {},
  defaultText: 'select',
  options: [],
};
export default SelectField;
