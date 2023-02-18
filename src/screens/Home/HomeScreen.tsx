import React from 'react';
import { Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/rootSlices';
import { logout } from '@/utils/auth';
import { Button } from '@rneui/themed';

const HomeScreen = () => {
  const { t } = useTranslation();

  const { googleToken } = useSelector(
    (state: RootState) => state.account.value,
  );

  return (
    <View className="flex-1 justify-center items-center">
      <Button
        title={`${t('logout')}`}
        style={{ width: 200 }}
        color={'#39C1B6'}
        onPress={() => {
          googleToken && logout(googleToken);
        }}
      />
    </View>
  );
};

export default HomeScreen;
