import { Grid, makeStyles, Paper, ThemeProvider } from '@material-ui/core';
import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.global.css';
import ImportBlock from './components/ImportBlock';
import clsx from 'clsx';
import theme from './themes/themeBlue';
import { ipcRenderer } from 'electron';
import RightBlock from './components/RightBlock';
import { BeatmapSetFolder } from './models/BeatmapSet';

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

  const [selectedFolder, setSelectedFolder] = React.useState<
    BeatmapSetFolder | undefined
  >(undefined);

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
            <ImportBlock onFolderSelected={setSelectedFolder} />
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
            <RightBlock selectedBeatmapSet={selectedFolder} />
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Switch>
          <Route path="/" component={Hello} />
        </Switch>
      </Router>
    </ThemeProvider>
  );
}
