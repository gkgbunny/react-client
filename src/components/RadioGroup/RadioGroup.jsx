/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/label-has-for */
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
  // const contentError = (error || isTouched) ? style.errorStyle : {};
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
      {(error) ? <info style={{ ...style.color }}>{error}</info> : ''}
    </>
  );
};
RadioGroup.propTypes = {
  error: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  onClick: PropTypes.func,
  onBlur: PropTypes.func,
  options: PropTypes.arrayOf(PropTypes.string),
};
RadioGroup.defaultProps = {
  error: '',
  onClick: () => {},
  onBlur: () => {},
  onChange: () => {},
  options: [],
};
export default RadioGroup;
