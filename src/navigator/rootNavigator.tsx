import React from 'react';

import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';

import { HomeParamList, HomeStack } from './stack/home.stack';

export type RootStackParamList = HomeParamList;

export type ScreenProp = NativeStackNavigationProp<RootStackParamList>;
const RootStack = createNativeStackNavigator<RootStackParamList>();

const mainStack = () => {
  return <>{HomeStack()}</>;
};

const RootNavigator = () => {
  return (
    <RootStack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: '#406087' },
        headerTintColor: '#fff',
        headerShadowVisible: false,
      }}
    >
      {mainStack()}
    </RootStack.Navigator>
  );
};

export default RootNavigator;
