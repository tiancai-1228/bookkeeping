import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import { bookkeeping } from '@/type/bookkeeping';

interface Prop {
  bookkeepingData: bookkeeping;
}

const ExpensesScrollView = ({ bookkeepingData }: Prop) => {
  return (
    <View className="flex-1  p-4">
      <ScrollView>
        <Text className="text-white">ExpensesScrollView</Text>
      </ScrollView>
    </View>
  );
};

export default ExpensesScrollView;
