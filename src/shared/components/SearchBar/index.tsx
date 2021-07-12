import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import { makeStyles } from '@material-ui/core/styles';

import SearchIcon from '@material-ui/icons/Search';
import React from 'react';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: 10,
    borderColor: theme.palette.primary.light,

    '& fieldset': {
      borderColor: theme.palette.primary.light,
      transition: 'all 0.2s ease',
    },
    '& .MuiOutlinedInput-root:hover': {
      '& fieldset': {
        borderColor: '#fff',
      },
    },
    '& .MuiOutlinedInput-root:active': {
      '& fieldset': {
        borderColor: theme.palette.primary.light,
      },
    },
    '& .Mui-focused': {
      '& .MuiOutlinedInput-root:active': {
        '& fieldset': {
          borderColor: theme.palette.primary.light,
        },
      },
    },
    '& .MuiOutlinedInput-input': {
      color: theme.palette.text.secondary,
    },
  },
  icon: {
    color: theme.palette.primary.light,
  },
}));

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
    <TextField
      className={classes.root}
      id="input-with-icon-textfield"
      variant={'outlined'}
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
