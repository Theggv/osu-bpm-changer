import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import React from 'react';

const useStyles = makeStyles({
  root: {
    flex: 1,
    position: 'relative',
    display: 'flex',
  },
  transition: {
    flex: 1,
    display: 'flex',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    transition: 'all 0.25s ease',

    zIndex: 1,
  },
});

const useCollapse = (expandBy: number) => {
  const [isCollapse, setCollapse] = React.useState(false);

  const classes = useStyles();

  const onMouseEnter = (_e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    setCollapse(true);
  };

  const onMouseLeave = (_e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    setCollapse(false);
  };

  return {
    isCollapse,
    bind: {
      className: classes.transition,
      style: {
        top: isCollapse ? -expandBy : 0,
      } as React.CSSProperties,
      onMouseEnter,
      onMouseLeave,
    },
  };
};

type Props = {
  className?: string;
  expandBy: number;
  onCollapseChange?: (isCollapse: boolean) => void;
};

export const ExpandableContainer: React.FC<Props> = ({
  children,
  className,
  onCollapseChange,
  expandBy,
}) => {
  const classes = useStyles();
  const collapse = useCollapse(expandBy);

  React.useEffect(() => {
    if (onCollapseChange) onCollapseChange(collapse.isCollapse);
  }, [collapse.isCollapse]);

  return (
    <div className={clsx(classes.root, className)}>
      <div {...collapse.bind}>{children}</div>
    </div>
  );
};
