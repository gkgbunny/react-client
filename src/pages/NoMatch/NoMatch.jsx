import React from 'react';
import { Typography } from '@material-ui/core';

const NoMatch = () => (
  <>
    <div align="center">
      <h1>Not Found</h1>
    </div>
    <Typography variant="display1" align="center" htmlFontSize="2">
      Seems like the page you are looking after does not exist
    </Typography>
  </>
);
export default NoMatch;
