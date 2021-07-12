import { RootState } from '../../../app/rootState';
import { OsuFolderState } from './types';

const select = (state: RootState): OsuFolderState => state.osuFolder;

export const selectFolder = (state: RootState) => select(state).folder;

export const selectIsLoading = (state: RootState) => select(state).isLoading;

export const selectIsValid = (state: RootState) => select(state).isValid;
