import { userinfo } from '@/type/account';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface AccountSlice {
  value: {
    len?: string;
    googleToken?: string;
    me?: userinfo;
  };
  error: string;
}

export const AccountSlice = createSlice({
  name: 'account',
  initialState: {
    value: {
      len: undefined,
      googleToken: undefined,
      me: undefined,
    },
    error: '',
  } as AccountSlice,

  reducers: {
    setGoogleTokenSlice: (
      state,
      _action: PayloadAction<{ googleToken: string }>,
    ) => {
      const { value } = state;
      return {
        ...state,
        value: { ...value, googleToken: _action.payload.googleToken },
      };
    },

    setLenSlice: (state, _action: PayloadAction<{ len: string }>) => {
      const { value } = state;
      return {
        ...state,
        value: { ...value, len: _action.payload.len },
      };
    },

    setMeSlice: (state, _action: PayloadAction<{ me: userinfo }>) => {
      const { value } = state;
      return {
        ...state,
        value: { ...value, me: _action.payload.me },
      };
    },

    logoutSlice: (state) => {
      const { value } = state;
      return {
        ...state,
        value: { ...value, me: undefined, googleToken: undefined },
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

export const {
  setErrorSlice,
  setLenSlice,
  setGoogleTokenSlice,
  setMeSlice,
  logoutSlice,
} = AccountSlice.actions;

export default AccountSlice.reducer;
