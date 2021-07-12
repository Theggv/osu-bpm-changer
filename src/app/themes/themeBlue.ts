import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#9be7ff',
      main: '#64b5f6',
      dark: '#2286c3',
      contrastText: '#111',
    },
    secondary: {
      light: '#534bae',
      main: '#1a237e',
      dark: '#000051',
      contrastText: '#eee',
    },
    text: {
      primary: '#111',
      secondary: '#eee',
    },
  },
});

export default theme;
