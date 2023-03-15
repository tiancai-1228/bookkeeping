import React, { useEffect, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/rootSlices';
import { setMonthSlice, setYearSlice } from '@/redux/slices/bookkeepingSlice';
import useBookkeepingFormat from '@/hook/useBookkeepingFormat.hook';
import useConnectBookkeeping from '@/hook/useConnectBookkeeping.hook';
import MonthPickerModal from '@/components/modal/MonthPicker.modal';
import { AntDesign } from '@expo/vector-icons';
import ReportTab from './component/tab/Report.tab';

const ReportScreen = () => {
  const [visible, setVisible] = useState(false);
  const { t } = useTranslation();
  const { connect, bookkeepingData } = useConnectBookkeeping();
  const dispatch = useDispatch();
  const { me } = useSelector((state: RootState) => state.account.value);
  const { year, month } = useSelector(
    (state: RootState) => state.bookkeeping.value,
  );

  const { expenses, income } = useBookkeepingFormat(bookkeepingData?.data);

  useEffect(() => {
    connect(me!.currentBookkeeping!.id);
  }, [me?.currentBookkeeping]);

  return (
    <View className="flex-1 w-full items-center py-4 ">
      {/* date */}
      <TouchableOpacity
        className="w-full h-8  mb-2 justify-center items-center flex-row"
        onPress={() => {
          setVisible(true);
        }}
      >
        <Text className="text-2xl font-bold text-white mr-2" numberOfLines={1}>
          {`${year} ${t('year')} ${month} ${t('month')}`}
        </Text>
        <AntDesign name="caretdown" size={20} color="white" />
      </TouchableOpacity>

      <ReportTab income={income} expenses={expenses} />

      <MonthPickerModal
        Visible={visible}
        year={year}
        month={month}
        onClose={() => {
          setVisible(false);
        }}
        onPress={(y, m) => {
          dispatch(setYearSlice({ year: y }));
          dispatch(setMonthSlice({ month: m }));
        }}
      />
    </View>
  );
};

export default ReportScreen;
