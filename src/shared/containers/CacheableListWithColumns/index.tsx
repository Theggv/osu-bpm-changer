import React, { PropsWithChildren } from 'react';
import { AutoSizer, CellMeasurerCache, List } from 'react-virtualized';

import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((_theme) => ({
  root: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
  },
  row: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  container: {
    flex: '1 1 auto',
    backgroundColor: 'transparent',
    margin: 10,

    '& .ReactVirtualized__List': {
      '&::-webkit-scrollbar': {
        width: 12,
        height: 12,
      },
      '&::-webkit-scrollbar-track': {
        borderRadius: 20,
        backgroundColor: '#0004',
      },
      '&::-webkit-scrollbar-thumb': {
        borderRadius: 20,
        backgroundColor: '#fff',
      },
    },
  },
}));

interface CacheableListWithColumnsProps<T = any> {
  cache: CellMeasurerCache;
  items: T[];
  renderer: (item: T) => React.ReactNode;
}

const CacheableListWithColumns = <T,>({
  cache,
  items,
  renderer,
}: PropsWithChildren<CacheableListWithColumnsProps<T>>) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Paper className={classes.container} elevation={0}>
        <AutoSizer>
          {({ height, width }) => {
            const itemsPerRow = Math.floor(width / cache.defaultWidth);
            const rowCount = Math.ceil(items.length / itemsPerRow);

            return (
              <List
                width={width}
                height={height}
                rowCount={rowCount}
                rowHeight={cache.rowHeight}
                rowRenderer={({ index, key, style }) => {
                  const rowItems = [];
                  const fromIndex = index * itemsPerRow;
                  const toIndex = Math.min(
                    fromIndex + itemsPerRow,
                    items.length
                  );

                  for (let i = fromIndex; i < toIndex; i++) {
                    rowItems.push(renderer(items[i]));
                  }

                  return (
                    <div className={classes.row} key={key} style={style}>
                      {rowItems}
                    </div>
                  );
                }}
                overscanRowCount={30}
                containerStyle={{ margin: 3 }}
              />
            );
          }}
        </AutoSizer>
      </Paper>
    </div>
  );
};

export default CacheableListWithColumns;
