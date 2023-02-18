import * as AuthSession from 'expo-auth-session';
import {
  logoutSlice,
  setGoogleTokenSlice,
  setMeSlice,
} from '@/redux/slices/accountSlice';
import Configs from '@/configs';
import AsyncStorage from '@react-native-async-storage/async-storage';
import store from '../redux/store';

// login
const login = async (googleToken: string) => {
  if (!googleToken) return;
  store.dispatch(setGoogleTokenSlice({ googleToken: googleToken }));
  await AsyncStorage.setItem(Configs.AsyncStorage.googleToken, googleToken);
};

// logout
const logout = async (googleToken: string) => {
  if (!googleToken) return;
  await AuthSession.revokeAsync(
    {
      token: googleToken,
    },
    {
      revocationEndpoint: Configs.google.revocationEndpoint,
    },
  );

  await AsyncStorage.removeItem(Configs.AsyncStorage.googleToken);
  store.dispatch(logoutSlice());
};

// getUserinfo
const getUserinfo = async (googleToken: string) => {
  let userInfoResponse = await fetch(Configs.google.userinfoEndpoint, {
    headers: { Authorization: `Bearer ${googleToken}` },
  });

  userInfoResponse.json().then((data) => {
    store.dispatch(setMeSlice({ me: data }));
  });
};

export { login, logout, getUserinfo };
