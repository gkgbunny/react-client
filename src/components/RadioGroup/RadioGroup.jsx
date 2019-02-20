/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/label-has-for */
import React from 'react';
import PropTypes from 'prop-types';

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
        <div>
          <label>
            <input type="radio" {...rest} onChange={onChange} value={element.value} checked={element.value === value} />
            {element.key}
          </label>
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
