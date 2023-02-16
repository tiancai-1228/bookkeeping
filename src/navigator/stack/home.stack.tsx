import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from '@/screens/Home/HomeScreen';
import SplashScreen from '@/screens/SplashScreen';

import { RootStackParamList } from '../rootNavigator';

const RootStack = createNativeStackNavigator<RootStackParamList>();

export type HomeParamList = {
  SplashScreen: undefined;
  Home: undefined;
};

export const HomeStack = () => {
  return (
    <>
      <RootStack.Screen
        name="SplashScreen"
        component={SplashScreen}
        options={{ headerShown: false, animation: 'fade' }}
      />
      <RootStack.Screen
        name="Home"
        component={HomeScreen}
        options={() => ({ title: `home` })}
      />
    </>
  );
};
