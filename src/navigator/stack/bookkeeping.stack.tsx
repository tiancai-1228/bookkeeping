import React from 'react';
import BookkeepingScreen from '@/screens/bookkeeping/BookkeepingScreen';
import { RootStack } from '../rootNavigator';

export type BookkeepingParamList = {
  Bookkeeping: undefined;
};

export const BookkeepingStack = () => {
  return (
    <RootStack.Screen
      name="Bookkeeping"
      component={BookkeepingScreen}
      options={{
        headerShown: true,
        title: '',
        headerStyle: {
          backgroundColor: '#404040',
        },
        animation: 'slide_from_bottom',
      }}
    />
  );
};
