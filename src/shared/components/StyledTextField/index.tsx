import { createStyles, Theme, withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const styles = (theme: Theme) =>
  createStyles({
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
  });

const StyledTextField = withStyles(styles)(TextField);

export default StyledTextField;
