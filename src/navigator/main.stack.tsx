import React from 'react';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStack } from './rootNavigator';
import { AuthParamList } from './stack/auth.stack';
import {
  BookkeepingParamList,
  BookkeepingStack,
} from './stack/bookkeeping.stack';
import TabNavigator, { BottomTabParamList } from './tabNavigator';

export type RootStackParamList = BottomTabParamList &
  AuthParamList &
  BookkeepingParamList;

export type ScreenProp = NativeStackNavigationProp<RootStackParamList>;

const mainStack = () => {
  return (
    <>
      <RootStack.Screen
        name="BottomTab"
        component={TabNavigator}
        options={{
          headerShown: false,
          animation: 'fade',
        }}
      />

      {BookkeepingStack()}
    </>
  );
};

export default mainStack;
