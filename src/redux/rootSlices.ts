import { combineReducers } from '@reduxjs/toolkit';
import accountReducer, { AccountSlice } from './slices/accountSlice';

export interface RootState {
  account: AccountSlice;
}

export const rootReducer = combineReducers({
  account: accountReducer,
});
