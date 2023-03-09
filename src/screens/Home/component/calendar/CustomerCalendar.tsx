import React, { useEffect, useMemo, useState } from 'react';
import { Text, View } from 'react-native';
import { Calendar, DateData } from 'react-native-calendars';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/rootSlices';
import {
  setCalendarSlice,
  setMonthSlice,
} from '@/redux/slices/bookkeepingSlice';
import { bookkeeping, record } from '@/type/bookkeeping';
import { bookkeepingDate } from '@/type/common';
import moment from 'moment';

interface Prop {
  data: bookkeeping['data'];
  initDate: bookkeepingDate;
  onDayPress: (date: bookkeepingDate | null) => void;
}

const CustomerCalendar = ({ data, initDate, onDayPress }: Prop) => {
  const [markedDates, setMarkedDates] = useState<any>({});
  const dispatch = useDispatch();
  const date = `${initDate.year}-${initDate.month}-${initDate.date}`;

  const getSelectedDayEvents = (date: string) => {
    let markedDates: any = {};
    markedDates[date] = {
      selected: true,
      color: '#00B0BF',
      textColor: '#FFFFFF',
    };
    setMarkedDates(markedDates);
  };

  const handelDayPress = (day: DateData) => {
    const dateString = day.dateString;
    const date = {
      year: moment(dateString).format('yyyy'),
      month: moment(dateString).format('MM'),
      date: moment(dateString).format('DD'),
    };

    getSelectedDayEvents(dateString);
    dispatch(
      setCalendarSlice({
        date: date,
      }),
    );
    onDayPress(date);
  };

  useEffect(() => {
    getSelectedDayEvents(date);
  }, []);

  return (
    <View>
      <Calendar
        initialDate={date}
        monthFormat={'yyyy-MM'}
        onDayPress={handelDayPress}
        markedDates={markedDates}
        theme={{
          backgroundColor: '#404040',
          calendarBackground: '#404040',
          textSectionTitleColor: '#d9e1e8',
          textSectionTitleDisabledColor: '#d9e1e8',
          selectedDayBackgroundColor: '#00adf5',
          selectedDayTextColor: '#2d4150',
          todayTextColor: '#00adf5',
          dayTextColor: '#fff',
          textDisabledColor: 'gray',
          dotColor: '#00adf5',
          selectedDotColor: '#ffffff',
          arrowColor: 'orange',
          disabledArrowColor: '#d9e1e8',
          monthTextColor: '#ffffff',
        }}
      />
    </View>
  );
};

export default CustomerCalendar;
