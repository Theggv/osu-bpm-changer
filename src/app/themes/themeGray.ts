import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#efefef',
      main: '#bdbdbd',
      dark: '#8d8d8d',
      contrastText: '#000',
    },
    secondary: {
      light: '#ffffa8',
      main: '#fff176',
      dark: '#cabf45',
      contrastText: '#000',
    },
    text: {
      primary: '#000',
      secondary: '#fff',
    },
  },
});

export default theme;
