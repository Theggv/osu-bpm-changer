import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#ffeeff',
      main: '#f8bbd0',
      dark: '#c48b9f',
      contrastText: '#000',
    },
    secondary: {
      light: '#ffc1e3',
      main: '#f48fb1',
      dark: '#bf5f82',
      contrastText: '#000',
    },
  },
});

export default theme;
