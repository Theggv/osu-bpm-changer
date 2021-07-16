import produce, { Draft } from 'immer';
import { Actions, ActionTypes } from './actions';
import { OsuFolderState } from './types';

const initialState: OsuFolderState = {
  folder: '',
  isLoading: false,
  isValid: false,
};

export const reducer = produce(
  (draft: Draft<OsuFolderState>, action: Actions) => {
    switch (action.type) {
      case ActionTypes.SET_FOLDER:
        draft.folder = action.payload;
        break;

      case ActionTypes.SET_LOADING:
        draft.isLoading = action.payload;
        break;

      case ActionTypes.SET_VALID:
        draft.isValid = action.payload;
        break;

      default:
        break;
    }
  },
  initialState
);
