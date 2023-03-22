import React, { useEffect } from 'react';
import { View } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/rootSlices';
import useBookkeepingFormat from '@/hook/useBookkeepingFormat.hook';
import useConnectBookkeeping from '@/hook/useConnectBookkeeping.hook';
import HeaderDateButton from '@/components/button/HeaderDate.button';
import ReportTab from './component/tab/Report.tab';

const ReportScreen = () => {
  const { connect, bookkeepingData } = useConnectBookkeeping();
  const { me } = useSelector((state: RootState) => state.account.value);

  const { expenses, income } = useBookkeepingFormat(bookkeepingData?.data);

  useEffect(() => {
    connect(me!.currentBookkeeping!.id);
  }, [me?.currentBookkeeping]);

  return (
    <View className="flex-1 w-full items-center py-4 ">
      <HeaderDateButton />
      <ReportTab income={income} expenses={expenses} />
    </View>
  );
};

export default ReportScreen;
