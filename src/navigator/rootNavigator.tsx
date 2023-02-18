import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/rootSlices';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { getUserinfo } from '@/utils/auth';
import mainStack, { RootStackParamList } from './main.stack';
import { AuthStack } from './stack/auth.stack';

const RootStack = createNativeStackNavigator<RootStackParamList>();

const RootNavigator = () => {
  const { googleToken, me } = useSelector(
    (state: RootState) => state.account.value,
  );

  useEffect(() => {
    if (!googleToken) return;
    getUserinfo(googleToken);
  }, [googleToken]);

  return (
    <RootStack.Navigator
      screenOptions={{
        headerTintColor: '#fff',
        headerShadowVisible: false,
      }}
    >
      {me ? mainStack() : AuthStack()}
    </RootStack.Navigator>
  );
};

export default RootNavigator;
