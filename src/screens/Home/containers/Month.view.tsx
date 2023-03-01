import React, { useEffect, useMemo, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/rootSlices';
import { setMonthSlice, setYearSlice } from '@/redux/slices/bookkeepingSlice';
import { numberSeparator } from '@/utils/number';
import { bookkeeping, record } from '@/type/bookkeeping';
import MonthPickerModal from '@/components/modal/MonthPicker.modal';
import { AntDesign } from '@expo/vector-icons';
import { t } from 'i18next';
import HomeTab from '../component/tab/Home.tab';

interface Prop {
  bookkeepingData: bookkeeping;
}

const MonthView = ({ bookkeepingData }: Prop) => {
  const [visible, setVisible] = useState(false);

  const dispatch = useDispatch();
  const { year, month } = useSelector(
    (state: RootState) => state.bookkeeping.value,
  );

  const { data } = bookkeepingData;

  const expenses = useMemo(() => {
    if (!data) return { list: [], total: 0 };
    const expenses = data?.[`${year}`]?.[`${month}`]?.['expenses'];
    const expensesList: record[] = expenses ? Object.values(expenses) : [];

    const total = expensesList.reduce((pre, curr) => {
      pre = pre + curr.count;
      return pre;
    }, 0);
    return { list: expensesList.reverse(), total: total };
  }, [data, year, month]);

  const incomeList = useMemo(() => {
    if (!data) return [];
    const income = data?.[`${year}`]?.[`${month}`]?.['income'];
    const incomeList: record[] = income ? Object.values(income) : [];
    return incomeList;
  }, [data, year, month]);

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

      {/* card */}
      <View className="w-[90%] h-[150px] bg-[#31a299] rounded-xl p-3 shadow shadow-gray-400">
        <View className="w-full justify-between flex-row">
          <View className="w-full justify-around ">
            <Text className="text-base font-bold" numberOfLines={1}>
              {t('monthly_balance')}:
            </Text>
            <Text className="text-4xl mt-2 font-bold text-w" numberOfLines={1}>
              $ {numberSeparator(98764531)}
            </Text>

            <View className="w-full  mb-2 flex-row justify-between mt-2">
              <View className=" justify-around  ">
                <Text className=" text-sm font-bold" numberOfLines={1}>
                  {t('monthly_expenses')}:
                </Text>
                <Text className=" text-base font-bold" numberOfLines={1}>
                  $ {numberSeparator(expenses.total)}
                </Text>
              </View>

              <View className="justify-around ">
                <Text className=" text-sm font-bold" numberOfLines={1}>
                  {t('monthly_income')}:
                </Text>
                <Text className=" text-base font-bold" numberOfLines={1}>
                  $ {numberSeparator(98764531)}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>

      {/* list */}
      <HomeTab expensesList={expenses.list} />

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

export default MonthView;
