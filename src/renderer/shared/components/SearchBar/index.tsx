import React from 'react';

import InputAdornment from '@material-ui/core/InputAdornment';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: 10,
    borderColor: theme.palette.primary.light,
  },
  icon: {
    color: theme.palette.primary.light,
  },
}));

const StyledTextField = withStyles((theme) => ({
  root: {
    '& fieldset': {
      borderColor: theme.palette.primary.light,
      transition: 'all 0.2s ease',
    },
    '&:hover': {
      '& fieldset': {
        borderColor: '#fff',
      },
      '& ::before': {
        borderBottom: `1px solid ${theme.palette.primary.light}`,
      },
    },
    '&:active': {
      '& fieldset': {
        borderColor: theme.palette.primary.light,
      },
    },
    '& .Mui-focused': {
      '&:active': {
        '& fieldset': {
          borderColor: theme.palette.primary.light,
        },
      },
    },
    '& .MuiInput-underline': {
      color: theme.palette.text.secondary,
    },
    '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
      borderBottom: `2px solid ${theme.palette.primary.light}`,
    },
    '& ::before': {
      borderBottom: `1px solid ${theme.palette.text.secondary}`,
    },
  },
}))(TextField);

interface SearchBarProps {
  placeholder?: string;
  onQueryChanged: (searchString: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  onQueryChanged,
  placeholder,
}) => {
  const classes = useStyles();

  const onChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    onQueryChanged(e.target.value);
  };

  return (
    <StyledTextField
      className={classes.root}
      id="input-with-icon-textfield"
      placeholder={placeholder}
      onChange={onChange}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon className={classes.icon} />
          </InputAdornment>
        ),
      }}
    />
  );
};

export default SearchBar;
