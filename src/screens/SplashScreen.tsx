import React, { useLayoutEffect } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { setGoogleTokenSlice, setLenSlice } from '@/redux/slices/accountSlice';
import { ScreenProp } from '@/navigator/main.stack';
import { useNavigation } from '@react-navigation/core';
import Configs from '@/configs';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SplashScreen = () => {
  const { i18n } = useTranslation();
  const dispatch = useDispatch();
  const navigation = useNavigation<ScreenProp>();

  const getLanguage = async () => {
    try {
      const len = await AsyncStorage.getItem(Configs.AsyncStorage.len);
      if (len) {
        dispatch(setLenSlice({ len }));
        i18n.changeLanguage(len);
      }
    } catch (e) {
      console.log('error', e);
    }
  };

  const getAuth = async () => {
    const googleToken = await AsyncStorage.getItem(
      Configs.AsyncStorage.googleToken,
    );
    if (googleToken) {
      dispatch(setGoogleTokenSlice({ googleToken: googleToken }));
    } else {
      setTimeout(() => {
        !googleToken && navigation.navigate('Login');
      }, 2000);
    }
  };

  useLayoutEffect(() => {
    getLanguage();
    getAuth();
  }, []);

  return (
    <View className="flex-1 items-center justify-center bg-[#404040]">
      <ActivityIndicator size="large" />
    </View>
  );
};

export default SplashScreen;
