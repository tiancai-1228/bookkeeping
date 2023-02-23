import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface BookkeepingSlice {
  value: {};
  error: string;
}

export const BookkeepingSlice = createSlice({
  name: 'account',
  initialState: {
    value: {},
    error: '',
  } as BookkeepingSlice,

  reducers: {
    setErrorSlice: (state, _action: PayloadAction<string>) => {
      const { payload: errorMessage } = _action;
      return {
        ...state,
        error: errorMessage,
      };
    },
  },
});

export const { setErrorSlice } = BookkeepingSlice.actions;

export default BookkeepingSlice.reducer;
