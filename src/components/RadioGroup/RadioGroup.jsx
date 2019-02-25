import React from 'react';
import PropTypes from 'prop-types';
import style from './style';

const RadioGroup = (props) => {
  const {
    error,
    options,
    value,
    onChange,
    ...rest
  } = props;
  return (
    <>
      {options.map(element => (
        <div key={element.value}>
          <label htmlFor={element.value}>
            <input
              type="radio"
              {...rest}
              id={element.value}
              onChange={onChange}
              value={element.value}
              checked={element.value === value}
            />
            {element.key}
          </label>
        </div>
      ))}
      {(error) ? <p style={{ ...style.color }}>{error}</p> : ''}
    </>
  );
};
RadioGroup.propTypes = {
  error: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(PropTypes.object).isRequired,
};
export default RadioGroup;
