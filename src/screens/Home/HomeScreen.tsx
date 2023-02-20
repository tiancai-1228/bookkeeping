import React from 'react';
import { View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/rootSlices';
import { logout } from '@/utils/auth';
import { getBookkeeping } from '@/firebase/get/bookkeeping';
import {
  createBookkeeping,
  expenses,
  income,
} from '@/firebase/set/bookkeeping';
import { Button } from '@rneui/themed';

const HomeScreen = () => {
  const { t } = useTranslation();

  const { googleToken, me } = useSelector(
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

      <Button
        title={`create `}
        style={{ width: 200, marginTop: 20 }}
        color={'#39C1B6'}
        onPress={() => {
          createBookkeeping(me!.id, 'test');
        }}
      />

      <Button
        title={`income `}
        style={{ width: 200, marginTop: 20 }}
        color={'#39C1B6'}
        onPress={() => {
          income(me!.id, '-NOhmbm3QkkOh77PFsRS', 200);
        }}
      />

      <Button
        title={`expenses `}
        style={{ width: 200, marginTop: 20 }}
        color={'#39C1B6'}
        onPress={() => {
          expenses(me!.id, '-NOhmbm3QkkOh77PFsRS', 300);
        }}
      />
      <Button
        title={`getdata `}
        style={{ width: 200, marginTop: 20 }}
        color={'#39C1B6'}
        onPress={async () => {
          const res = await getBookkeeping(me!.id, '-NOhKdcAqzxtwHitj6Z4');
          console.log(res);
        }}
      />
    </View>
  );
};

export default HomeScreen;
