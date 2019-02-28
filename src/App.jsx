import React from 'react';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from './theme';
import { Trainee } from './pages';

const App = () => (
  <div>
    <CssBaseline />
    <MuiThemeProvider theme={theme}>
      <Typography>
        <Trainee />
      </Typography>
    </MuiThemeProvider>
  </div>
);
export default App;
