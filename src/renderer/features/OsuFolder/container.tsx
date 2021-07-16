import clsx from 'clsx';
import { remote } from 'electron';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import CircularProgress from '@material-ui/core/CircularProgress';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import CheckIcon from '@material-ui/icons/Check';
import CreateNewFolderIcon from '@material-ui/icons/CreateNewFolder';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import RefreshIcon from '@material-ui/icons/Refresh';

import { isOsuFolder, tryFindOsuFolder } from '../../shared/Osu/OsuUtils';
import {
  selectIsLoading,
  selectIsValid,
  selectOsuFolder,
  setFolder,
  setLoading,
  setValid,
} from './ducks';

const useStyles = makeStyles((theme) => ({
  root: {
    flex: 1,
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

const useOpenFileDialog = () => {
  const dispatch = useDispatch();

  const isLoading = useSelector(selectIsLoading);
  const isValid = useSelector(selectIsValid);
  const path = useSelector(selectOsuFolder);

  React.useEffect(() => {
    tryFindPath();
  }, []);

  const tryFindPath = async () => {
    dispatch(setLoading(true));
    dispatch(setValid(false));

    const folder = await tryFindOsuFolder();

    dispatch(setLoading(false));

    if (folder) {
      try {
        dispatch(setFolder(folder));
        dispatch(setValid(await isOsuFolder(folder)));
      } catch (err) {
        dispatch(setValid(false));
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
        dispatch(setLoading(false));

        if (!result.filePaths.length) return;

        dispatch(setValid(false));
        dispatch(setFolder(result.filePaths[0]));

        isOsuFolder(result.filePaths[0])
          .then((value) => dispatch(setValid(value)))
          .catch((err) => console.error(err));
      })
      .catch((err) => console.error(err));
  };

  return {
    isLoading,
    isValid,
    path,
    tryFindPath,
    bind: {
      onClick: clickFileDialog,
    },
  };
};

const OsuFolder: React.FC = () => {
  const classes = useStyles();
  const dialog = useOpenFileDialog();

  return (
    <div className={classes.root}>
      {dialog.isLoading ? (
        <CircularProgress
          size={20}
          className={classes.loader}
          color={'secondary'}
        />
      ) : dialog.isValid ? (
        <CheckIcon className={clsx(classes.valid)} color={'secondary'} />
      ) : (
        <ErrorOutlineIcon
          className={clsx(classes.invalid)}
          color={'secondary'}
        />
      )}
      <div className={classes.rightBlock}>
        {dialog.isLoading ? null : (
          <Typography className={classes.textColor} variant={'body2'}>
            {dialog.isValid
              ? dialog.path
              : dialog.path
              ? `${dialog.path} is not osu! folder`
              : 'osu! folder was not found'}
          </Typography>
        )}
      </div>
      {!dialog.isLoading && (
        <div className={classes.buttonsBlock}>
          {!dialog.isValid && (
            <IconButton size={'small'} onClick={dialog.tryFindPath}>
              <RefreshIcon className={classes.textColor} />
            </IconButton>
          )}
          <IconButton size={'small'} component={'label'} {...dialog.bind}>
            <CreateNewFolderIcon className={classes.textColor} />
          </IconButton>
        </div>
      )}
    </div>
  );
};

export default OsuFolder;
