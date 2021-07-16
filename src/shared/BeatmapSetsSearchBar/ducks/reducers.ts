import produce, { Draft } from 'immer';

import { Actions, ActionTypes } from './actions';
import { FilterState } from './types';

const initialState: FilterState = {
  searchString: '',
  filteredCount: 0,
  totalCount: 0,
};

export const reducer = produce((draft: Draft<FilterState>, action: Actions) => {
  switch (action.type) {
    case ActionTypes.SET_FILTER:
      draft.searchString = action.payload;
      break;

    case ActionTypes.SET_SEARCH_RESULTS:
      draft.filteredCount = action.payload.filteredCount;
      draft.totalCount = action.payload.totalCount;
      break;

    default:
      break;
  }
}, initialState);
