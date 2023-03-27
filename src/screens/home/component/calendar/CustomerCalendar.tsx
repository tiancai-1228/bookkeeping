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
  calendarDate: bookkeepingDate;
}

const CustomerCalendar = ({ data, calendarDate }: Prop) => {
  const { selectDate } = calendarDate;
  const [markedDates, setMarkedDates] = useState<MarkedDates>({});
  const [baseMarked, setBaseMarked] = useState<MarkedDates>({});

  const { t } = useTranslation();
  const dispatch = useDispatch();

  const getInitData = (data: record[], selectDate: string) => {
    let markedDates: MarkedDates = {};
    data.forEach((el) => {
      markedDates[el.date] = { marked: true };
    });
    setBaseMarked(markedDates);
    getSelectedDayEvents(selectDate, markedDates);
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
      year: moment(dateString).format('YYYY'),
      month: moment(dateString).format('MM'),
      date: moment(dateString).format('DD'),
      selectDate: moment(dateString).format('YYYY-MM-DD'),
    };

    getSelectedDayEvents(dateString, baseMarked);
    dispatch(
      setCalendarSlice({
        date: date,
      }),
    );
  };

  const handelMonthChange = (month: DateData, selectDate: string) => {
    const dateString = month.dateString;
    const date = {
      year: moment(dateString).format('YYYY'),
      month: moment(dateString).format('MM'),
      date: moment(dateString).format('DD'),
      selectDate: selectDate,
    };
    dispatch(
      setCalendarSlice({
        date: date,
      }),
    );
  };

  useEffect(() => {
    getInitData(data, selectDate);
  }, [data]);

  return (
    <Calendar
      initialDate={selectDate}
      monthFormat={`yyyy '${t('year')}' MM '${t('month')}' `}
      onDayPress={(d) => {
        handelDayPress(d, baseMarked);
      }}
      onMonthChange={(m) => {
        handelMonthChange(m, selectDate);
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
  );
};

export default CustomerCalendar;
