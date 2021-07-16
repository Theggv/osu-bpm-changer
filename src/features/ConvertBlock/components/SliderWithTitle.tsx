import React from 'react';

import Slider from '@material-ui/core/Slider';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    alignItems: 'center',
    paddingTop: 5,
    paddingBottom: 5,
  },
  title: {
    fontWeight: 600,
    width: 30,
    marginRight: 15,
  },
  slider: {
    flex: 1,
  },
});

const StyledSlider = withStyles((theme) => ({
  root: {
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
    backgroundColor: '#fff',
  },
  rail: {
    height: 2,
    opacity: 0.5,
    backgroundColor: '#000',
  },
  mark: {
    backgroundColor: '#000',
    height: 6,
    width: 1,
    marginTop: -2,
  },
  markActive: {
    backgroundColor: '#fff',
  },
  markLabel: {
    color: '#fff8',
  },
  thumb: {
    color: '#fff',
  },
}))(Slider);

interface SliderWithTitleProps {
  title: string;
  min: number;
  max: number;
  value: number;
  onChange: (value: number) => void;
  defaultValue: number;
}

const SliderWithTitle: React.FC<SliderWithTitleProps> = ({
  title,
  min,
  max,
  value,
  onChange,
  defaultValue,
}) => {
  const classes = useStyles();

  const marks = React.useMemo(
    () =>
      Array.from({ length: max - min + 1 })
        .map((_, i) => i + min)
        .map((value) => ({
          value,
          label: `${value}`,
        })),
    [min, max]
  );

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

  return (
    <div className={classes.root}>
      <div className={classes.title}>{title}</div>
      <StyledSlider
        ValueLabelComponent={toolTip}
        className={classes.slider}
        defaultValue={defaultValue}
        value={value}
        step={0.1}
        marks={marks}
        valueLabelDisplay={'auto'}
        min={min}
        max={max}
        onChange={handleSliderChange}
      />
    </div>
  );
};

export default SliderWithTitle;
