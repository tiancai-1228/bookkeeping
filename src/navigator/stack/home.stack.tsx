import React from 'react';
import HeaderRightButton from '@/components/button/HeaderRight.button';
import HomeScreen from '@/screens/Home/HomeScreen';
import { RootStack } from '../rootNavigator';

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
        options={() => ({
          headerShown: true,
          title: '',
          headerStyle: {
            backgroundColor: '#000',
          },
          headerLeft: () => <HeaderRightButton />,
          animation: 'fade',
        })}
      />
    </>
  );
};
