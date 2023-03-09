import { bookkeepingDate } from '@/type/common';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import moment from 'moment';

export interface BookkeepingSlice {
  value: {
    year: string;
    month: string;
    calendar: bookkeepingDate;
  };
  error: string;
}

export const BookkeepingSlice = createSlice({
  name: 'Bookkeeping',
  initialState: {
    value: {
      year: moment().format('YYYY'),
      month: moment().format('MM'),
      calendar: {
        year: moment().format('YYYY'),
        month: moment().format('MM'),
        date: moment().format('DD'),
      },
    },
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
    setCalendarSlice: (
      state,
      _action: PayloadAction<{ date: bookkeepingDate }>,
    ) => {
      const { value } = state;
      return {
        ...state,
        value: { ...value, calendar: _action.payload.date },
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

export const { setErrorSlice, setYearSlice, setMonthSlice, setCalendarSlice } =
  BookkeepingSlice.actions;

export default BookkeepingSlice.reducer;
