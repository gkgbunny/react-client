import React from 'react';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import theme from './theme';
import { Trainee } from './pages/Trainee';
// import { ChildrenDemo } from './pages';

const App = () => (
  <div>
    <MuiThemeProvider theme={theme}>
      <Typography>
        <Trainee />
      </Typography>
    </MuiThemeProvider>
  </div>
);
export default App;
