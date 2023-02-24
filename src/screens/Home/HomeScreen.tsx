import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/rootSlices';
import { useIsFocused } from '@react-navigation/native';
import { bookkeeping } from '@/type/bookkeeping';
import { getBookkeeping } from '@/firebase/get/bookkeeping';
import MonthView from './containers/Month.view';

const HomeScreen = () => {
  const [bookkeepingData, setBookkeepingData] = useState<bookkeeping>();

  const { me } = useSelector((state: RootState) => state.account.value);
  const isFocused = useIsFocused();

  const fetchListData = async () => {
    const { id, currentBookkeeping } = me!;
    try {
      const res = await getBookkeeping(id, currentBookkeeping!.id);
      res && setBookkeepingData(res);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!isFocused) return;
    fetchListData();
  }, [isFocused]);

  return (
    <View className="flex-1  items-center">
      {bookkeepingData && <MonthView bookkeepingData={bookkeepingData} />}
    </View>
  );
};

export default HomeScreen;
