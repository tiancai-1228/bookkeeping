import { combineReducers } from '@reduxjs/toolkit';
import accountReducer, { AccountSlice } from './slices/accountSlice';
import bookkeepingReducer, {
  BookkeepingSlice,
} from './slices/bookkeepingSlice';

export interface RootState {
  account: AccountSlice;
  bookkeeping: BookkeepingSlice;
}

export const rootReducer = combineReducers({
  account: accountReducer,
  bookkeeping: bookkeepingReducer,
});
