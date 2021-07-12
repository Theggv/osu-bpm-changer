import { RootState } from '../../../app/rootState';
import { OsuFolderState } from './types';

const select = (state: RootState): OsuFolderState => state.osuFolderState;

export const selectOsuFolder = (state: RootState) => select(state).folder;

export const selectIsLoading = (state: RootState) => select(state).isLoading;

export const selectIsValid = (state: RootState) => select(state).isValid;
