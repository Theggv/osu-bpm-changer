import LinearProgress from '@material-ui/core/LinearProgress';
import { withStyles } from '@material-ui/core/styles';

const StyledLinearProgress = withStyles((_theme) => ({
  colorSecondary: {
    backgroundColor: '#fff',
  },
  barColorSecondary: {
    backgroundColor: '#26ada7',
  },
}))(LinearProgress);

export default StyledLinearProgress;
