import clsx from 'clsx';
import React from 'react';

import { makeStyles } from '@material-ui/core/styles';

import ConvertBlock from '../../features/ConvertBlock';
import DifficultiesList from '../../features/DifficultiesList';
import OsuFolder from '../../features/OsuFolder';
import BeatmapSetsSearchBar from '../../shared/BeatmapSetsSearchBar';
import BeatmapSetsFilterResults from '../../shared/components/BeatmapSetsFilterResults';
import BackgroundContainer from '../../shared/containers/BackgroundContainer';
import TaskManager from '../../features/TaskManager';

const useStyles = makeStyles((_theme) => ({
  root: {
    overflow: 'hidden',
  },
  fullSize: {
    flex: 1,
  },
  flex: {
    display: 'flex',
  },
  header: {
    borderRadius: '4px 0 0 0',
    maxHeight: 60,
  },
  footer: {
    minHeight: 50,
    marginLeft: 32,
  },
  aside: {
    minWidth: '400px',
  },
  bglight: {
    backgroundColor: 'transparent',
  },
  bgMain: {
    backgroundColor: 'transparent',
  },
  bgDark: {
    backgroundColor: '#0004',
  },
  osuFolderBlock: {
    alignItems: 'center',
  },
  searchBlock: {
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  column: {
    flexDirection: 'column',
  },
}));

const MainPage = () => {
  const classes = useStyles();

  return (
    <BackgroundContainer>
      <div
        className={clsx(
          classes.root,
          classes.flex,
          classes.fullSize,
          classes.column
        )}
      >
        {/* Header */}
        <header
          className={clsx(
            classes.header,
            classes.flex,
            classes.fullSize,
            classes.bgDark
          )}
        >
          <aside
            className={clsx(
              classes.aside,
              classes.flex,
              classes.osuFolderBlock
            )}
          >
            <OsuFolder />
          </aside>
          <section
            className={clsx(
              classes.flex,
              classes.fullSize,
              classes.searchBlock
            )}
          >
            <BeatmapSetsSearchBar />
            <BeatmapSetsFilterResults />
          </section>
        </header>
        <div className={clsx(classes.flex, classes.fullSize, classes.bgMain)}>
          {/* Aside */}
          <aside className={clsx(classes.aside, classes.flex, classes.bglight)}>
            <ConvertBlock />
          </aside>
          {/* Main */}
          <main
            className={clsx(classes.flex, classes.fullSize, classes.column)}
          >
            <section className={clsx(classes.flex, classes.fullSize)}>
              <DifficultiesList />
            </section>
            {/* Footer */}
            <footer className={clsx(classes.footer, classes.flex)}>
              <TaskManager />
            </footer>
          </main>
        </div>
      </div>
    </BackgroundContainer>
  );
};

export default MainPage;
