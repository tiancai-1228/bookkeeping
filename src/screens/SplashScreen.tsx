import React, { useLayoutEffect } from 'react';
import { ActivityIndicator, View } from 'react-native';

import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';

import { setValueSlice } from '@/redux/slices/homeSlice';

import { ScreenProp } from '@/navigator/rootNavigator';
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
        dispatch(setValueSlice({ len }));
        i18n.changeLanguage(len);
      }

      navigation.replace('Home');
    } catch (e) {
      console.log('error', e);
    }
  };

  useLayoutEffect(() => {
    getLanguage();
  }, []);

  return (
    <View className="flex-1 items-center justify-center bg-primary">
      <ActivityIndicator size="large" />
    </View>
  );
};

export default SplashScreen;
