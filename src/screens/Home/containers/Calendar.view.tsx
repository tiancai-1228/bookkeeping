import React, { useEffect, useMemo, useState } from 'react';
import { Text, View } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/rootSlices';
import { bookkeeping, record } from '@/type/bookkeeping';
import CustomerCalendar from '../component/calendar/CustomerCalendar';

interface Prop {
  bookkeepingData: bookkeeping;
}

const CalendarView = ({ bookkeepingData }: Prop) => {
  const { data } = bookkeepingData;
  const { calendar } = useSelector(
    (state: RootState) => state.bookkeeping.value,
  );

  const list = useMemo(() => {
    if (!data) return [];
    const { year, month } = calendar;
    const income = data?.[`${year}`]?.[`${month}`]?.['income'];
    const incomeList: record[] = income ? Object.values(income) : [];
    console.log(incomeList);
    return [];
  }, [data, calendar.month, calendar.year]);

  return (
    <View className="w-full mt-4">
      <CustomerCalendar data={data} initDate={calendar} onDayPress={() => {}} />
    </View>
  );
};

export default CalendarView;
