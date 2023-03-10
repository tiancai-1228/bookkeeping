import React, { useEffect, useMemo, useState } from 'react';
import { Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/rootSlices';
import { numberSeparator } from '@/utils/number';
import { bookkeeping, record } from '@/type/bookkeeping';
import { bookkeepingDate } from '@/type/common';
import moment from 'moment';
import CustomerCalendar from '../component/calendar/CustomerCalendar';
import CalendarList from '../component/list/Calendar.list';

interface Prop {
  bookkeepingData: bookkeeping;
}

const CalendarView = ({ bookkeepingData }: Prop) => {
  const { t } = useTranslation();
  const { data } = bookkeepingData;
  const { calendar } = useSelector(
    (state: RootState) => state.bookkeeping.value,
  );

  const expensesList = useMemo(() => {
    if (!data) return [];
    const { year, month } = calendar;
    const expenses = data?.[`${year}`]?.[`${month}`]?.['expenses'];
    const expensesList: record[] = expenses ? Object.values(expenses) : [];
    return expensesList.reverse();
  }, [data, calendar.month, calendar.year]);

  const incomeList = useMemo(() => {
    if (!data) return [];
    const { year, month } = calendar;
    const income = data?.[`${year}`]?.[`${month}`]?.['income'];
    const incomeList: record[] = income ? Object.values(income) : [];
    return incomeList.reverse();
  }, [data, calendar.month, calendar.year]);

  const expenses = useMemo(() => {
    if (!calendar) return { list: [], total: 0 };
    const { year, month, date } = calendar;
    const day = `${year}-${month}-${date}`;
    const expenses = expensesList.filter((el) => el.date === day);
    const total = expenses.reduce((pre, curr) => {
      pre = pre + curr.count;
      return pre;
    }, 0);
    return {
      list: expenses,
      total: total,
    };
  }, [expensesList, calendar]);

  const income = useMemo(() => {
    if (!calendar) return { list: [], total: 0 };
    const { year, month, date } = calendar;
    const day = `${year}-${month}-${date}`;
    const income = incomeList.filter((el) => el.date === day);
    const total = income.reduce((pre, curr) => {
      pre = pre + curr.count;
      return pre;
    }, 0);
    return {
      list: income,
      total: total,
    };
  }, [incomeList, calendar]);

  return (
    <View className="w-full flex-1 mt-4">
      <CustomerCalendar
        data={[...expensesList, ...incomeList]}
        initDate={calendar}
      />
      <View className="w-full border-y-4 border-gray-500 py-2 flex-row justify-around">
        <View>
          <Text className=" text-sm font-bold text-white">
            {t('expenses')}:
          </Text>
          <Text className=" text-sm font-bold text-[#cf667a] ">
            $ {numberSeparator(expenses.total)}
          </Text>
        </View>
        <View>
          <Text className=" text-sm font-bold text-white">{t('income')}:</Text>
          <Text className=" text-sm font-bold text-[#00B0BF]" numberOfLines={1}>
            $ {numberSeparator(income.total)}
          </Text>
        </View>
        <View>
          <Text className=" text-sm font-bold text-white" numberOfLines={1}>
            {t('balance')}:
          </Text>
          <Text className=" text-sm font-bold text-[#dbb2ff]" numberOfLines={1}>
            $ {numberSeparator(income.total - expenses.total)}
          </Text>
        </View>
      </View>
      <CalendarList data={[...expenses.list, ...income.list]} />
    </View>
  );
};

export default CalendarView;
