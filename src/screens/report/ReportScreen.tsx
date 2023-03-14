import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/rootSlices';
import { setMonthSlice, setYearSlice } from '@/redux/slices/bookkeepingSlice';
import MonthPickerModal from '@/components/modal/MonthPicker.modal';
import { AntDesign } from '@expo/vector-icons';

const ReportScreen = () => {
  const [visible, setVisible] = useState(false);
  const { t } = useTranslation();

  const dispatch = useDispatch();
  const { year, month } = useSelector(
    (state: RootState) => state.bookkeeping.value,
  );
  return (
    <View>
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
