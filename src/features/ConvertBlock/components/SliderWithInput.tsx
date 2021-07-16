import React from 'react';

import Slider from '@material-ui/core/Slider';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import Input from '@material-ui/core/Input';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    alignItems: 'center',
    paddingTop: 5,
    paddingBottom: 5,
  },
  title: {
    fontWeight: 600,
    width: 70,
    marginRight: 10,
  },
  slider: {
    flex: 1,
  },
  input: {
    marginLeft: 10,
    width: 52,
  },
});

const StyledSlider = withStyles((theme) => ({
  root: {
    color: '#3880ff',
    height: 2,
    padding: '15px 0',
  },
  valueLabel: {
    left: 'calc(-50% + 12px)',
    top: -22,
    '& *': {
      background: 'transparent',
      color: '#000',
    },
  },
  track: {
    height: 2,
  },
  rail: {
    height: 2,
    opacity: 0.5,
    backgroundColor: `${theme.palette.secondary.main}`,
  },
  mark: {
    backgroundColor: `${theme.palette.secondary.main}`,
    height: 6,
    width: 1,
    marginTop: -2,
  },
  markActive: {
    backgroundColor: `currentColor`,
  },
  markLabel: {
    color: `${theme.palette.secondary.main}c0`,
  },
}))(Slider);

const StyledInput = withStyles((_theme) => ({
  input: {
    textAlign: 'center',
  },
}))(Input);

interface SliderWithTitleProps {
  title: string;
  min: number;
  max: number;
  value: number;
  defaultValue: number;
  onChange: (value: number) => void;
  step: number;
}

const SliderWithTitle: React.FC<SliderWithTitleProps> = ({
  title,
  min,
  max,
  value,
  defaultValue,
  onChange,
  step,
}) => {
  const classes = useStyles();

  const toolTip = (props: any) => {
    const { children, open, value } = props;

    return (
      <Tooltip open={open} enterTouchDelay={0} placement="top" title={value}>
        {children}
      </Tooltip>
    );
  };

  const handleSliderChange = (_event: any, newValue: number | number[]) => {
    onChange(newValue as number);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(
      event.target.value === '' ? defaultValue : Number(event.target.value)
    );
  };

  const handleBlur = () => {
    if (value < min) {
      onChange(min);
    } else if (value > max) {
      onChange(max);
    }
  };

  return (
    <div className={classes.root}>
      <div className={classes.title}>{title}</div>
      <StyledSlider
        ValueLabelComponent={toolTip}
        className={classes.slider}
        defaultValue={defaultValue}
        value={value}
        step={step}
        valueLabelDisplay={'auto'}
        min={min}
        max={max}
        onChange={handleSliderChange}
      />
      <StyledInput
        className={classes.input}
        value={value}
        margin="dense"
        onChange={handleInputChange}
        onBlur={handleBlur}
        inputProps={{
          step,
          min,
          max,
          type: 'number',
          'aria-labelledby': 'input-slider',
        }}
      />
    </div>
  );
};

export default SliderWithTitle;
