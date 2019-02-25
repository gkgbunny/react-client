import React from 'react';
import PropTypes from 'prop-types';

const RadioGroup = (props) => {
  const {
    error, options, value, onChange, ...rest
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
    </>
  );
};
RadioGroup.propTypes = {
  error: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(PropTypes.object),
};
RadioGroup.defaultProps = {
  options: [],
};
export default RadioGroup;
