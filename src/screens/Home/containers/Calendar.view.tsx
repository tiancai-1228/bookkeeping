import React from 'react';
import { Text, View } from 'react-native';
import { bookkeeping } from '@/type/bookkeeping';

interface Prop {
  data: bookkeeping;
}

const CalendarView = ({ data }: Prop) => {
  return (
    <View>
      <Text>CalendarView</Text>
    </View>
  );
};

export default CalendarView;
