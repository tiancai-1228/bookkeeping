import React from 'react';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ReportTabParamList } from '@/screens/report/component/tab/Report.tab';
import { RootStack } from './rootNavigator';
import { AuthParamList } from './stack/auth.stack';
import {
  BookkeepingParamList,
  BookkeepingStack,
} from './stack/bookkeeping.stack';
import { CommonParamList, CommonStack } from './stack/common.stack';
import TabNavigator, { BottomTabParamList } from './tabNavigator';

export type RootStackParamList = BottomTabParamList &
  CommonParamList &
  AuthParamList &
  BookkeepingParamList &
  ReportTabParamList;

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
      {CommonStack()}
      {BookkeepingStack()}
    </>
  );
};

export default mainStack;
