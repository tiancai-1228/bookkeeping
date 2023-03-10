import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Calendar, DateData } from 'react-native-calendars';
import { useDispatch } from 'react-redux';
import { setCalendarSlice } from '@/redux/slices/bookkeepingSlice';
import { record } from '@/type/bookkeeping';
import { bookkeepingDate, MarkedDates } from '@/type/common';
import moment from 'moment';

interface Prop {
  data: record[];
  initDate: bookkeepingDate;
}

const CustomerCalendar = ({ data, initDate }: Prop) => {
  const [markedDates, setMarkedDates] = useState<MarkedDates>({});
  const [baseMarked, setBaseMarked] = useState<MarkedDates>({});

  const { t } = useTranslation();
  const dispatch = useDispatch();
  const date = `${initDate.year}-${initDate.month}-${initDate.date}`;

  const getInitData = (data: record[]) => {
    let markedDates: MarkedDates = {};
    data.forEach((el) => {
      markedDates[el.date] = { marked: true };
    });
    setBaseMarked(markedDates);
    getSelectedDayEvents(date, markedDates);
  };

  const getSelectedDayEvents = (date: string, baseMarked: MarkedDates) => {
    let marked: MarkedDates = { ...baseMarked };
    marked[date] = {
      selected: true,
      selectedColor: '#00B0BF',
      marked: !!marked[date],
    };
    setMarkedDates(marked);
  };

  const handelDayPress = (day: DateData, baseMarked: MarkedDates) => {
    const dateString = day.dateString;
    const date = {
      year: moment(dateString).format('yyyy'),
      month: moment(dateString).format('MM'),
      date: moment(dateString).format('DD'),
    };

    getSelectedDayEvents(dateString, baseMarked);
    dispatch(
      setCalendarSlice({
        date: date,
      }),
    );
  };

  useEffect(() => {
    getInitData(data);
  }, [data]);

  return (
    <View>
      <Calendar
        initialDate={date}
        monthFormat={`yyyy '${t('year')}' MM '${t('month')}' `}
        onDayPress={(d) => {
          handelDayPress(d, baseMarked);
        }}
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
