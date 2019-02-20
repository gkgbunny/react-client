import React from 'react';
import PropTypes from 'prop-types';

const RadioGroup = (props) => {
  const {
    error,
    options,
    value,
    ...rest
  } = props;
  console.log(value);

  return (
    <>
      {options.map(element => (
        <div>
          <input type="radio" {...rest} value={element.value} name="options" />
          {element.label}
        </div>
      ))}
    </>
  );
};
RadioGroup.propTypes = {
  error: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  options: PropTypes.arrayOf(PropTypes.string),
};
RadioGroup.defaultProps = {
  error: '',
  onChange: () => {},
  options: [],
};
export default RadioGroup;
