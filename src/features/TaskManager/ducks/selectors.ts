import { RootState } from '../../store';
import { AuthState } from './types';

export const selectAuth = (state: RootState): AuthState => state.auth;

export const selectAuthState = (state: RootState) =>
	selectAuth(state).authState;

export const selectAuthError = (state: RootState) => selectAuth(state).error;
