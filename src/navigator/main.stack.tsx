import React from 'react';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthParamList } from './stack/auth.stack';
import { HomeParamList, HomeStack } from './stack/home.stack';

export type RootStackParamList = HomeParamList & AuthParamList;

export type ScreenProp = NativeStackNavigationProp<RootStackParamList>;

const mainStack = () => {
  return <>{HomeStack()}</>;
};

export default mainStack;
