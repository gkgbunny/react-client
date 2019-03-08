import React from 'react';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import theme from './theme';
import {
  Trainee,
  InputDemo,
  ChildrenDemo,
  SliderDemo,
  Login,
  TextFieldDemo,
  NoMatch,
} from './pages';
import { PrivateRoute, AuthRoute } from './routes';
import { SnackBarProvider } from './contexts';

const App = () => (
  <div>
    <SnackBarProvider>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <Typography>
          <Router>
            <Switch>
              <PrivateRoute exact path="/trainee" component={Trainee} />
              <AuthRoute exact path="/login" component={Login} />
              <PrivateRoute exact path="/inputdemo" component={InputDemo} />
              <PrivateRoute exact path="/childrendemo" component={ChildrenDemo} />
              <PrivateRoute exact path="/sliderdemo" component={SliderDemo} />
              <PrivateRoute exact path="/textfielddemo" component={TextFieldDemo} />
              <PrivateRoute component={NoMatch} />
            </Switch>
          </Router>
        </Typography>
      </MuiThemeProvider>
    </SnackBarProvider>
  </div>
);
export default App;
