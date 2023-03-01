import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import moment from 'moment';

export interface BookkeepingSlice {
  value: { year: string; month: string };
  error: string;
}

export const BookkeepingSlice = createSlice({
  name: 'account',
  initialState: {
    value: { year: moment().format('YYYY'), month: moment().format('M') },
    error: '',
  } as BookkeepingSlice,

  reducers: {
    setYearSlice: (state, _action: PayloadAction<{ year: string }>) => {
      const { value } = state;
      return {
        ...state,
        value: { ...value, year: _action.payload.year },
      };
    },

    setMonthSlice: (state, _action: PayloadAction<{ month: string }>) => {
      const { value } = state;
      return {
        ...state,
        value: { ...value, month: _action.payload.month },
      };
    },
    setErrorSlice: (state, _action: PayloadAction<string>) => {
      const { payload: errorMessage } = _action;
      return {
        ...state,
        error: errorMessage,
      };
    },
  },
});

export const { setErrorSlice, setYearSlice, setMonthSlice } =
  BookkeepingSlice.actions;

export default BookkeepingSlice.reducer;
