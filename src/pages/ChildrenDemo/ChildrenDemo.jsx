import React from 'react';
import Typography from '@material-ui/core/Typography';
import { Math } from '../../components';

const ChildrenDemo = () => (
  <>
    <Math first="7" second="4" operator="+">
      <Typography variant="h6" gutterBottom>
        Sum of 7 and 4 is 11
      </Typography>
    </Math>
    <Math first="7" second="4" operator="-">
      <Typography variant="h6" gutterBottom>
        Substraction of 7 and 4 is 3
      </Typography>
    </Math>
    <Math first="7" second="4" operator="*">
      <Typography variant="h6" gutterBottom>
        Multiplication of 7 and 4 is 28
      </Typography>
    </Math>
    <Math first="7" second="0" operator="/">
      <Typography variant="h6" gutterBottom>
        Division of 7 and 0 is infinity
      </Typography>
    </Math>
    <Math first="7" second="0" operator="^">
      <Typography variant="h6" gutterBottom>
        Invalid operation
      </Typography>
    </Math>
  </>
);
export default ChildrenDemo;
