import React from 'react';
import { Provider } from 'react-redux';
import store from '@/redux/store';
import RootNavigator from '@/navigator/rootNavigator';
import { DarkTheme, NavigationContainer } from '@react-navigation/native';
import './src/i18n.ts';

export default function App() {
  const MyTheme = {
    ...DarkTheme,
    colors: {
      ...DarkTheme.colors,
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
