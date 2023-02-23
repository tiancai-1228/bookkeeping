import React from 'react';
import SettingScreen from '@/screens/account/SettingScreen';
import { t } from 'i18next';
import { RootStack } from '../rootNavigator';

export type CommonParamList = {
  Setting: undefined;
};

export const CommonStack = () => {
  return (
    <RootStack.Screen
      name="Setting"
      component={SettingScreen}
      options={{
        headerShown: true,
        title: `${t('setting')}`,
        headerStyle: {
          backgroundColor: '#404040',
        },
        animation: 'slide_from_bottom',
      }}
    />
  );
};
