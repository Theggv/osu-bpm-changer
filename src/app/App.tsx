import './App.global.css';

import clsx from 'clsx';
import { ipcRenderer } from 'electron';
import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

import { Grid, makeStyles, Paper, ThemeProvider } from '@material-ui/core';

import ImportBlock from '../features/ImportBlock';
import RightBlock from '../features/RightBlock';
import { store } from './store';
import theme from './themes/themeBlue';
import MainPage from '../pages/MainPage';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flex: 1,
  },
  displayFlex: {
    display: 'flex',
  },
  paper: {
    flex: 1,
    overflow: 'hidden',
  },
  h100: {
    height: '100%',
  },
  importBlock: {
    minWidth: '375px',
  },

  gridItem: {
    '&.MuiGrid-item': {
      padding: '0',
    },
  },

  leftBlockContainer: {
    margin: '16px 0 0 16px',
    borderRadius: '4px 0 0 0',
    backgroundColor: theme.palette.primary.light,
  },

  rightBlockContainer: {
    margin: '16px 0 0 0',
    borderRadius: '0',
    backgroundColor: theme.palette.primary.main,
  },
}));

const Hello = () => {
  const classes = useStyles(theme);

  React.useEffect(() => {
    window.addEventListener('message', (evt) => {
      if (evt.data.type === 'select-dirs') {
        ipcRenderer.send('select-dirs');
      }
    });
  }, []);

  return (
    <div className={clsx(classes.root, classes.displayFlex)}>
      <Grid
        className={clsx(classes.displayFlex, classes.paper)}
        container
        spacing={1}
        direction={'row'}
      >
        {/* Left Block */}
        <Grid item className={clsx(classes.displayFlex, classes.gridItem)}>
          <Paper
            className={clsx(
              classes.importBlock,
              classes.paper,
              classes.displayFlex,
              classes.leftBlockContainer
            )}
            elevation={1}
          >
            <ImportBlock />
          </Paper>
        </Grid>
        {/* Right Block */}
        <Grid item xs className={clsx(classes.displayFlex, classes.gridItem)}>
          <Paper
            className={clsx(
              classes.paper,
              classes.displayFlex,
              classes.rightBlockContainer
            )}
            elevation={1}
          >
            <RightBlock />
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          {/* <Hello /> */}
          <MainPage />
        </ThemeProvider>
      </Provider>
    </Router>
  );
};

export default App;
