import { serverTimestamp } from 'firebase/database';
import * as AuthSession from 'expo-auth-session';
import {
  logoutSlice,
  setGoogleTokenSlice,
  setMeSlice,
} from '@/redux/slices/accountSlice';
import Configs from '@/configs';
import { getUser } from '@/firebase/get/account';
import { createUser, updateUser } from '@/firebase/set/account';
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
  try {
    let userInfoResponse = await fetch(Configs.google.userinfoEndpoint, {
      headers: { Authorization: `Bearer ${googleToken}` },
    });
    await userInfoResponse.json().then(async (data) => {
      if (data.error) {
        throw Error;
      }

      const id = data.email.split('@')[0];
      store.dispatch(setMeSlice({ me: { ...data, id } }));

      //update user data
      const user = id && (await getUser(id));
      user && updateUser({ ...data, id, createAt: user.createAt });
      !user && createUser({ ...data, id, createAt: serverTimestamp() });
    });
  } catch (error) {
    logout(googleToken);
  }
};

export { login, logout, getUserinfo };
