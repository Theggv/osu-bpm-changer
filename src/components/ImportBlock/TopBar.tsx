import React from 'react';
import clsx from 'clsx';

import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';

import { isOsuFolder, tryFindOsuFolder } from '../../models/OsuUtils';

import RefreshIcon from '@material-ui/icons/Refresh';
import CheckIcon from '@material-ui/icons/Check';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import CreateNewFolderIcon from '@material-ui/icons/CreateNewFolder';
import { remote } from 'electron';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    minHeight: 30,
  },
  valid: {
    color: '#e8f5e9',
    marginTop: 3,
    marginLeft: 3,
  },
  invalid: {
    color: '#ff867c',
    marginTop: 3,
    marginLeft: 3,
  },
  loader: {
    marginTop: 5,
    marginLeft: 5,
  },
  rightBlock: {
    marginTop: 5,
    marginLeft: 10,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flex: 1,
  },
  buttonsBlock: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  textColor: {
    color: theme.palette.text.secondary,
  },
}));

interface SongsPathProps {
  onPathFound: (path: string) => void;
}

const TopBar: React.FC<SongsPathProps> = ({ onPathFound }) => {
  const classes = useStyles();

  const [isLoading, setIsLoading] = React.useState(false);
  const [isValid, setIsValid] = React.useState(false);
  const [path, setPath] = React.useState('');

  React.useEffect(() => {
    tryFindPath();
  }, []);

  React.useEffect(() => {
    if (path) onPathFound(path);
  }, [path]);

  const tryFindPath = async () => {
    setIsLoading(true);
    setIsValid(false);

    const folder = await tryFindOsuFolder();

    setIsLoading(false);

    if (folder) {
      try {
        setIsValid(await isOsuFolder(folder));
        setPath(folder);
      } catch (err) {
        // console.error(err);
        setIsValid(false);
      }
    }
  };

  const clickFileDialog = (
    event: React.MouseEvent<HTMLLabelElement, MouseEvent>
  ) => {
    event.preventDefault();

    remote.dialog
      .showOpenDialog({
        properties: ['openDirectory'],
      })
      .then(async (result) => {
        setIsLoading(false);

        if (!result.filePaths.length) return;

        setIsValid(false);
        setPath(result.filePaths[0]);

        isOsuFolder(result.filePaths[0])
          .then((value) => setIsValid(value))
          .catch(() => {
            // console.error(err);
          });
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className={classes.root}>
      {isLoading ? (
        <CircularProgress
          size={20}
          className={classes.loader}
          color={'secondary'}
        />
      ) : isValid ? (
        <CheckIcon className={clsx(classes.valid)} color={'secondary'} />
      ) : (
        <ErrorOutlineIcon
          className={clsx(classes.invalid)}
          color={'secondary'}
        />
      )}
      <div className={classes.rightBlock}>
        {isLoading ? null : (
          <Typography className={classes.textColor} variant={'body2'}>
            {isValid
              ? path
              : path
              ? `${path} is not osu! folder`
              : 'osu! folder was not found'}
          </Typography>
        )}
      </div>
      {!isLoading && (
        <div className={classes.buttonsBlock}>
          {!isValid && (
            <IconButton size={'small'} onClick={tryFindPath}>
              <RefreshIcon className={classes.textColor} />
            </IconButton>
          )}
          <IconButton
            size={'small'}
            component={'label'}
            onClick={clickFileDialog}
          >
            <CreateNewFolderIcon className={classes.textColor} />
          </IconButton>
        </div>
      )}
    </div>
  );
};

export default TopBar;
