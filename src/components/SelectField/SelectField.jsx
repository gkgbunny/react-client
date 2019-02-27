import React from 'react';
import PropTypes from 'prop-types';
import style from './style';

const SelectField = (props) => {
  const {
    defaultText, options, error, ...rest
  } = props;
  const contentError = error ? style.errorStyle : {};
  return (
    <>
      <select
        {...rest}
        style={{ ...style.base, ...contentError }}
      >
        <option value="">{defaultText}</option>
        {options.map(element => (
          <option
            value={element.value}
            key={element.value}
          >
            {element.value}
          </option>
        ))}
      </select>
      {error ? <p style={{ ...style.color }}>{error}</p> : ''}
    </>
  );
};

SelectField.propTypes = {
  error: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  defaultText: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(PropTypes.object).isRequired,
};
SelectField.defaultProps = {
  defaultText: 'select',
};
export default SelectField;
