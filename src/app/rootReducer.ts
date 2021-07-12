import { combineReducers } from 'redux';

import { OsuFolderReducer } from '../features/OsuFolder';
import { RootState } from './rootState';

export const rootReducer = combineReducers<RootState>({
  osuFolder: OsuFolderReducer,
});
