import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { serverTimestamp } from 'firebase/database';
import * as AuthSession from 'expo-auth-session';
import {
  logoutSlice,
  setGoogleTokenSlice,
  setMeSlice,
} from '@/redux/slices/accountSlice';
import Configs from '@/configs';
import { auth } from '@/firebase/firebase';
import { getUser } from '@/firebase/get/account';
import { createUser, updateUser } from '@/firebase/set/account';
import { createBookkeeping } from '@/firebase/set/bookkeeping';
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
  signOut(auth);
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

      const user = id && (await getUser(id));
      await signInWithEmailAndPassword(auth, data.email, data.email);

      //create new user
      if (!user) {
        await createUser({ ...data, id, createAt: serverTimestamp() });
        const newUser = id && (await getUser(id));
        store.dispatch(setMeSlice({ me: newUser }));
        return;
      }

      //update user data
      user && updateUser({ ...data, id, createAt: user.createAt });
      store.dispatch(setMeSlice({ me: user }));
    });
  } catch (error) {
    console.log(error);
    logout(googleToken);
  }
};

export { login, logout, getUserinfo };
