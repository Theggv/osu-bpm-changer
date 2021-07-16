import clsx from 'clsx';
import React, { useEffect } from 'react';

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
  const [onCollapse, setOnCollapse] = React.useState<{
    onStart: boolean;
    onEnd: boolean;
    onExpand: boolean;
  }>({ onStart: false, onEnd: false, onExpand: false });

  const classes = useStyles();

  const onMouseEnter = (_e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    setOnCollapse((_prev) => ({
      onExpand: false,
      onStart: true,
      onEnd: false,
    }));
  };

  const onMouseLeave = (_e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    setOnCollapse((_prev) => ({
      onExpand: false,
      onStart: false,
      onEnd: true,
    }));
  };

  useEffect(() => {
    console.log(onCollapse);
    if (!onCollapse.onStart && !onCollapse.onEnd) return;

    setTimeout(() => {
      setOnCollapse((prev) => ({
        onStart: false,
        onEnd: false,
        onExpand: prev.onStart,
      }));
    }, 250);
  }, [onCollapse]);

  return {
    onCollapseStart: onCollapse.onStart,
    onCollapseEnd: onCollapse.onEnd,
    isCollapse: onCollapse.onExpand,
    bind: {
      className: classes.transition,
      style: {
        top: onCollapse.onExpand || onCollapse.onStart ? -expandBy : 0,
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
  onCollapseChange?: (
    state: 'default' | 'onstart' | 'expanded' | 'onend'
  ) => void;
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
    if (onCollapseChange)
      onCollapseChange(
        collapse.onCollapseStart
          ? 'onstart'
          : collapse.onCollapseEnd
          ? 'onend'
          : collapse.isCollapse
          ? 'expanded'
          : 'default'
      );
  }, [collapse.isCollapse, collapse.onCollapseStart, collapse.onCollapseEnd]);

  return (
    <div className={clsx(classes.root, className)}>
      <div {...collapse.bind}>{children}</div>
    </div>
  );
};
