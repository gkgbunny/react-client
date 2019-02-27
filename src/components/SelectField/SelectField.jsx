import React from 'react';
import PropTypes from 'prop-types';
import style from './style';

const SelectField = (props) => {
  const { defaultText, options, ...rest } = props;

  return (
    <>
      <select {...rest} style={{ ...style.base }}>
        <option value="defaultText">{defaultText}</option>
        {options.map(element => (
          <option value={element.value} key={element.value}>
            {element.value}
          </option>
        ))}
      </select>
    </>
  );
};

SelectField.propTypes = {
  error: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  defaultText: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.object).isRequired,
};
SelectField.defaultProps = {
  defaultText: 'select',
};
export default SelectField;
