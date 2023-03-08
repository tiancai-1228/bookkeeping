import React from 'react';
import { Text, View } from 'react-native';
import { bookkeeping } from '@/type/bookkeeping';

interface Prop {
  bookkeepingData: bookkeeping;
}

const CalendarView = ({ bookkeepingData }: Prop) => {
  return (
    <View>
      <Text>CalendarView</Text>
    </View>
  );
};

export default CalendarView;
