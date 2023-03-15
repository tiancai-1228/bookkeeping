import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { onValue, ref } from 'firebase/database';
import { RootState } from '@/redux/rootSlices';
import { bookkeeping } from '@/type/bookkeeping';
import { db } from '@/firebase/firebase';

function useConnectBookkeeping() {
  const [bookkeepingData, setBookkeepingData] = useState<bookkeeping>();

  const { me } = useSelector((state: RootState) => state.account.value);

  const connect = (bookkeepingId: string) => {
    const dbRef = ref(db, `/users/${me!.id}/bookkeeping/${bookkeepingId}`);
    onValue(dbRef, (snapshot) => {
      setBookkeepingData(snapshot.val());
    });
  };
  return { bookkeepingData, connect };
}

export default useConnectBookkeeping;
