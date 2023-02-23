import React from 'react';
import BookkeepingScreen from '@/screens/bookkeeping/BookkeepingScreen';
import DetailScreen from '@/screens/bookkeeping/DetailScreen';
import { t } from 'i18next';
import { RootStack } from '../rootNavigator';

export type BookkeepingParamList = {
  Bookkeeping: undefined;
  BookkeepingDetail: undefined;
};

export const BookkeepingStack = () => {
  return (
    <>
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
      <RootStack.Screen
        name="BookkeepingDetail"
        component={DetailScreen}
        options={{
          headerShown: true,
          title: `${t('account_book')}`,
          headerStyle: {
            backgroundColor: '#404040',
          },
          animation: 'slide_from_bottom',
        }}
      />
    </>
  );
};
