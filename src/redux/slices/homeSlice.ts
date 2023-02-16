import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface HomeSlice {
  value: {
    len?: string;
  };
  error: string;
}

export const HomeSlice = createSlice({
  name: 'home',
  initialState: {
    value: {
      len: undefined,
    },
    error: '',
  } as HomeSlice,

  reducers: {
    setValueSlice: (state, _action: PayloadAction<HomeSlice['value']>) => {
      const { value } = state;
      return {
        ...state,
        value: { ...value, ..._action.payload },
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

export const { setErrorSlice, setValueSlice } = HomeSlice.actions;

export default HomeSlice.reducer;
