import React, { useEffect, useLayoutEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { useSelector } from 'react-redux';
import { onValue, ref } from 'firebase/database';
import { RootState } from '@/redux/rootSlices';
import { ScreenProp } from '@/navigator/main.stack';
import { useNavigation } from '@react-navigation/native';
import { bookkeeping } from '@/type/bookkeeping';
import { enumViewType } from '@/type/common';
import HeaderRightButton from '@/components/button/HeaderRight.button';
import { db } from '@/firebase/firebase';
import CalendarView from './containers/Calendar.view';
import MonthView from './containers/Month.view';

const HomeScreen = () => {
  const [bookkeepingData, setBookkeepingData] = useState<bookkeeping>();

  const [viewType, setViewType] = useState<enumViewType>(enumViewType.Month);
  const { me } = useSelector((state: RootState) => state.account.value);
  const navigation = useNavigation<ScreenProp>();

  const connect = (bookkeepingId: string) => {
    const dbRef = ref(db, `/users/${me!.id}/bookkeeping/${bookkeepingId}`);
    onValue(dbRef, (snapshot) => {
      setBookkeepingData(snapshot.val());
    });
  };

  useEffect(() => {
    connect(me!.currentBookkeeping!.id);
  }, [me?.currentBookkeeping]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <HeaderRightButton
          onPress={() => {
            viewType === enumViewType.Month &&
              setViewType(enumViewType.Calendar);
            viewType === enumViewType.Calendar &&
              setViewType(enumViewType.Month);
          }}
          type={viewType}
        />
      ),
    });
  }, [viewType]);

  return (
    <View className="flex-1  items-center">
      {viewType === enumViewType.Month && bookkeepingData && (
        <MonthView bookkeepingData={bookkeepingData} />
      )}
      {viewType === enumViewType.Calendar && bookkeepingData && (
        <CalendarView bookkeepingData={bookkeepingData} />
      )}
    </View>
  );
};

export default HomeScreen;
