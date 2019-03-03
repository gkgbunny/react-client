import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  typography: {
    fontFamily: [
      '"Comic Sans MS"',
      'sans-serif',
      'cursive',
    ].join(','),
    htmlFontSize: 15,
  },
});
export default theme;
