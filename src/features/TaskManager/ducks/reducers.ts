import produce, { Draft } from 'immer';
import { AuthActions, AuthActionsType } from './actions';
import { AuthState, LoadingState } from './types';

const initialState: AuthState = {
	user: undefined,
	authState: LoadingState.NEVER,
	error: undefined,
};

const reducer = produce((draft: Draft<AuthState>, action: AuthActions) => {
	switch (action.type) {
		case AuthActionsType.CHECK_AUTH:
			draft.user = undefined;
			break;

		case AuthActionsType.REQUEST_AUTH:
			draft.user = action.payload;
			draft.authState = LoadingState.REQUESTED;
			break;

		case AuthActionsType.SUCCESS_AUTH:
			draft.authState = LoadingState.SUCCESS;
			draft.error = undefined;
			break;

		case AuthActionsType.FAILED_AUTH:
			draft.authState = LoadingState.FAILED;
			draft.error = action.payload;
			break;

		case AuthActionsType.LOGOUT_AUTH:
			draft.user = undefined;
			draft.authState = LoadingState.NEVER;
			draft.error = undefined;
			break;

		default:
			break;
	}
}, initialState);

export const authReducer = reducer;
