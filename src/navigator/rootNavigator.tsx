import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { onAuthStateChanged, User } from 'firebase/auth';
import { RootState } from '@/redux/rootSlices';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { getUserinfo } from '@/utils/auth';
import { auth } from '@/firebase/firebase';
import mainStack, { RootStackParamList } from './main.stack';
import { AuthStack } from './stack/auth.stack';

export const RootStack = createNativeStackNavigator<RootStackParamList>();

const RootNavigator = () => {
  const [userInfo, setUserInfo] = useState<User | null>(null);
  const { googleToken, me } = useSelector(
    (state: RootState) => state.account.value,
  );

  useEffect(() => {
    if (!googleToken) return;
    getUserinfo(googleToken);
  }, [googleToken]);

  onAuthStateChanged(auth, (user) => {
    if (user) {
      userInfo == null && setUserInfo(user);
    } else {
      setUserInfo(null);
    }
  });

  return (
    <RootStack.Navigator
      screenOptions={{
        headerTintColor: '#fff',
        headerShadowVisible: false,
      }}
    >
      {userInfo && me ? mainStack() : AuthStack()}
    </RootStack.Navigator>
  );
};

export default RootNavigator;
