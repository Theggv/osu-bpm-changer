import clsx from 'clsx';
import React from 'react';

import { makeStyles } from '@material-ui/core/styles';

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

    zIndex: 1,
  },
});

const useCollapse = (expandBy: number, animationTimeMS: number) => {
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
        transition: `all ${animationTimeMS}ms ease`,
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
  const collapse = useCollapse(expandBy, 250);

  React.useEffect(() => {
    if (onCollapseChange) onCollapseChange(collapse.isCollapse);
  }, [collapse.isCollapse]);

  return (
    <div className={clsx(classes.root, className)}>
      <div {...collapse.bind}>{children}</div>
    </div>
  );
};
