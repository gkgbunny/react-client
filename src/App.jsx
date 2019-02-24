import React from 'react';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { ChildrenDemo } from './pages';
import theme from './theme';


const App = () => (
  <div>
    <MuiThemeProvider theme={theme}>
      <ChildrenDemo />
    </MuiThemeProvider>
  </div>
);
export default App;
