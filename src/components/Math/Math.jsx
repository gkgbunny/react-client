import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';

const Math = (props) => {
  const {
    first,
    second,
    operator,
    children,
  } = props;
  console.log(children);

  return (
    <>
      <Typography variant="h4">
        {first}
        {operator}
        {second}
        {children}
      </Typography>
    </>
  );
};
Math.propTypes = {
  first: PropTypes.number.isRequired,
  second: PropTypes.number.isRequired,
  operator: PropTypes.arrayOf(PropTypes.string),
  children: PropTypes.func,
};
Math.defaultProps = {
  operator: ['+', '-', '/', '*'],
  children: () => {},
};
export default Math;
