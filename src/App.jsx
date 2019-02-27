import React from 'react';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import { ChildrenDemo } from './pages';
import theme from './theme';

const App = () => (
  <div>
    <MuiThemeProvider theme={theme}>
      <Typography>
        <ChildrenDemo />
      </Typography>
    </MuiThemeProvider>
  </div>
);
export default App;
