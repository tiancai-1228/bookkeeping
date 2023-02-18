import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '@/screens/Login/LoginScreen';
import SplashScreen from '@/screens/SplashScreen';
import { RootStackParamList } from '../main.stack';

const RootStack = createNativeStackNavigator<RootStackParamList>();

export type AuthParamList = {
  SplashScreen: undefined;
  Login: undefined;
};

export const AuthStack = () => {
  return (
    <>
      <RootStack.Screen
        name="SplashScreen"
        component={SplashScreen}
        options={{ headerShown: false, animation: 'fade' }}
      />
      <RootStack.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerShown: false, animation: 'fade' }}
      />
    </>
  );
};