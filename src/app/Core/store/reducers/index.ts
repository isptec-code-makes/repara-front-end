import { isDevMode } from '@angular/core';
import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { authReducer } from './auth-reducer';
import { Token } from '../../types/auth';

export const authFeatureName = 'auth';

export interface State {
  auth: AuthState;
}

export interface AuthState {
  token: Token;
}

export const reducers: ActionReducerMap<State> = {
  auth: authReducer,
};

export const metaReducers: MetaReducer<State>[] = isDevMode() ? [] : [];
