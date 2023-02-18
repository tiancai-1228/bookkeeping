import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '@/screens/Home/HomeScreen';
import { RootStackParamList } from '../main.stack';

const RootStack = createNativeStackNavigator<RootStackParamList>();

export type HomeParamList = {
  SplashScreen: undefined;
  Home: undefined;
};

export const HomeStack = () => {
  return (
    <>
      <RootStack.Screen
        name="Home"
        component={HomeScreen}
        options={() => ({ headerShown: false, animation: 'fade' })}
      />
    </>
  );
};
