import { Action } from 'redux';
import { FilterState } from './types';

// Action Types enum

export enum ActionTypes {
  SET_FILTER = 'BeatmapSetsSearchBar/SET_FILTER',
  SET_SEARCH_RESULTS = 'BeatmapSetsSearchBar/SET_SEARCH_RESULTS',
}

// Action interfaces

export interface SetFilterAction extends Action<ActionTypes> {
  type: ActionTypes.SET_FILTER;
  payload: FilterState['searchString'];
}

export interface SetSearchResultsAction extends Action<ActionTypes> {
  type: ActionTypes.SET_SEARCH_RESULTS;
  payload: {
    filteredCount: FilterState['filteredCount'];
    totalCount: FilterState['totalCount'];
  };
}

// Action type

export type Actions = SetFilterAction | SetSearchResultsAction;
