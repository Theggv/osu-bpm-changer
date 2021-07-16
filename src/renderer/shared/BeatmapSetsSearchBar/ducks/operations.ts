import {
  ActionTypes,
  SetFilterAction,
  SetSearchResultsAction,
} from './actions';

export const setFilter = (
  payload: SetFilterAction['payload']
): SetFilterAction => ({
  type: ActionTypes.SET_FILTER,
  payload,
});

export const setSearchResults = (
  payload: SetSearchResultsAction['payload']
): SetSearchResultsAction => ({
  type: ActionTypes.SET_SEARCH_RESULTS,
  payload,
});
