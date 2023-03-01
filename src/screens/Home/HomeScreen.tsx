import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { useSelector } from 'react-redux';
import { onValue, ref } from 'firebase/database';
import { limit, orderBy, query } from 'firebase/firestore';
import { RootState } from '@/redux/rootSlices';
import { bookkeeping } from '@/type/bookkeeping';
import { db } from '@/firebase/firebase';
import MonthView from './containers/Month.view';

const HomeScreen = () => {
  const [bookkeepingData, setBookkeepingData] = useState<bookkeeping>();
  const { me } = useSelector((state: RootState) => state.account.value);

  const connect = (bookkeepingId: string) => {
    const dbRef = ref(db, `/users/${me!.id}/bookkeeping/${bookkeepingId}`);
    onValue(dbRef, (snapshot) => {
      setBookkeepingData(snapshot.val());
    });
  };

  useEffect(() => {
    connect(me!.currentBookkeeping!.id);
  }, [me?.currentBookkeeping]);

  return (
    <View className="flex-1  items-center">
      {bookkeepingData && <MonthView bookkeepingData={bookkeepingData} />}
    </View>
  );
};

export default HomeScreen;
