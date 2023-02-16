import React, { useLayoutEffect } from 'react';

import { Provider } from 'react-redux';

import store from '@/redux/store';

import RootNavigator from '@/navigator/rootNavigator';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';

import './src/i18n.ts';

export default function App() {
  const MyTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: 'rgb(242, 242, 242)',
    },
  };

  return (
    <Provider store={store}>
      <NavigationContainer theme={MyTheme}>
        <RootNavigator />
      </NavigationContainer>
    </Provider>
  );
}
