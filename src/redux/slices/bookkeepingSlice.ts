import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface BookkeepingSlice {
  value: { currentBookkeeping?: string };
  error: string;
}

export const BookkeepingSlice = createSlice({
  name: 'account',
  initialState: {
    value: { currentBookkeeping: undefined },
    error: '',
  } as BookkeepingSlice,

  reducers: {
    setCurrentBookkeepingSlice: (
      state,
      _action: PayloadAction<{ currentBookkeeping: string }>,
    ) => {
      const { value } = state;
      return {
        ...state,
        value: {
          ...value,
          currentBookkeeping: _action.payload.currentBookkeeping,
        },
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

export const { setErrorSlice, setCurrentBookkeepingSlice } =
  BookkeepingSlice.actions;

export default BookkeepingSlice.reducer;
