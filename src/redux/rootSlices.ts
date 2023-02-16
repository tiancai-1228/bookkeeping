import { combineReducers } from '@reduxjs/toolkit';

import homeReducer, { HomeSlice } from './slices/homeSlice';

export interface RootState {
  home: HomeSlice;
}

export const rootReducer = combineReducers({
  home: homeReducer,
});
