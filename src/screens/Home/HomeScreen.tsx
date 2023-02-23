import React from 'react';
import { View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/rootSlices';
import { Button } from '@rneui/themed';

const HomeScreen = () => {
  const { me } = useSelector((state: RootState) => state.account.value);

  return (
    <View className="flex-1 justify-center items-center">
      <Button
        title={`getdata `}
        style={{ width: 200, marginTop: 20 }}
        color={'#39C1B6'}
        onPress={async () => {
          console.log(me);
          // const res = await getBookkeepingList(me!.id);
          // console.log(res);
        }}
      />
    </View>
  );
};

export default HomeScreen;
