import clsx from 'clsx';
import React from 'react';

import { makeStyles } from '@material-ui/core/styles';

import ConvertBlock from '../../features/ConvertBlock';
import DifficultiesList from '../../features/DifficultiesList';
import OsuFolder from '../../features/OsuFolder';
import BeatmapSetsSearchBar from '../../shared/BeatmapSetsSearchBar';
import BeatmapSetsFilterResults from '../../shared/components/BeatmapSetsFilterResults';
import TaskManager from '../../shared/TaskManager';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '16px 0 0 16px',

    flexDirection: 'column',
    overflow: 'hidden',
    backgroundColor: theme.palette.primary.light,
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
    maxHeight: 50,
  },
  aside: {
    minWidth: '375px',
  },
  bglight: {
    backgroundColor: theme.palette.primary.light,
  },
  bgMain: {
    backgroundColor: theme.palette.primary.main,
  },
  bgDark: {
    backgroundColor: theme.palette.primary.dark,
  },
  osuFolderBlock: {
    alignItems: 'center',
  },
  searchBlock: {
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  divider: {
    borderBottom: `${theme.palette.secondary.dark}40 1px solid`,
  },
}));

const MainPage = () => {
  const classes = useStyles();

  return (
    <div className={clsx(classes.root, classes.flex, classes.fullSize)}>
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
            classes.osuFolderBlock,
            classes.divider
          )}
        >
          <OsuFolder />
        </aside>
        <section
          className={clsx(
            classes.flex,
            classes.fullSize,
            classes.searchBlock,
            classes.divider
          )}
        >
          <BeatmapSetsSearchBar />
          <BeatmapSetsFilterResults />
        </section>
      </header>
      {/* Main */}
      <main className={clsx(classes.flex, classes.fullSize, classes.bgMain)}>
        <aside className={clsx(classes.aside, classes.flex, classes.bglight)}>
          <ConvertBlock />
        </aside>
        <section className={clsx(classes.flex, classes.fullSize)}>
          <DifficultiesList />
        </section>
      </main>
      {/* Footer */}
      <footer
        className={clsx(
          classes.footer,
          classes.flex,
          classes.fullSize,
          classes.bgDark
        )}
      >
        <aside
          className={clsx(
            classes.aside,
            classes.flex,
            classes.osuFolderBlock,
            classes.divider
          )}
        ></aside>
        <section className={clsx(classes.flex, classes.fullSize)}>
          <TaskManager />
        </section>
      </footer>
    </div>
  );
};

export default MainPage;
