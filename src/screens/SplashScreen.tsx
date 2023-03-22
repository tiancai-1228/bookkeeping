import React, { useLayoutEffect } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/rootSlices';
import { setGoogleTokenSlice, setLenSlice } from '@/redux/slices/accountSlice';
import { ScreenProp } from '@/navigator/main.stack';
import { useNavigation } from '@react-navigation/core';
import Configs from '@/configs';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SplashScreen = () => {
  const { i18n } = useTranslation();
  const dispatch = useDispatch();
  const navigation = useNavigation<ScreenProp>();

  const { googleToken, len } = useSelector(
    (state: RootState) => state.account.value,
  );

  const getLanguage = async () => {
    try {
      const CurrentLen = await AsyncStorage.getItem(Configs.AsyncStorage.len);
      if (CurrentLen) {
        !len && dispatch(setLenSlice({ len: CurrentLen }));
        !len && i18n.changeLanguage(len);
      }
    } catch (e) {
      console.log('error', e);
    }
  };

  const getAuth = async () => {
    const Token = await AsyncStorage.getItem(Configs.AsyncStorage.googleToken);
    if (Token) {
      !googleToken && dispatch(setGoogleTokenSlice({ googleToken: Token }));
    } else {
      setTimeout(() => {
        !googleToken && navigation.navigate('Login');
      }, 2000);
    }
  };

  useLayoutEffect(() => {
    getLanguage();
    getAuth();
  }, [googleToken]);

  return (
    <View className="flex-1 items-center justify-center bg-[#404040]">
      <ActivityIndicator size="large" />
    </View>
  );
};

export default SplashScreen;
