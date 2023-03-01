import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import { record } from '@/type/bookkeeping';
import moment from 'moment';
import ExpensesItem from '../item/Expenses.item';

interface Prop {
  expensesList: record[];
}

const ExpensesScrollView = ({ expensesList }: Prop) => {
  const date: string[] = [];
  return (
    <View className="flex-1  px-4 pt-2 mb-20 ">
      <ScrollView>
        {expensesList.length !== 0 &&
          expensesList.map((el) => {
            if (!date.includes(moment(el.createAt).format('yyyy-MM-DD'))) {
              date.push(moment(el.createAt).format('yyyy-MM-DD'));
              return (
                <View key={el.id}>
                  <View className="bg-[#404040] px-1 rounded-md my-1">
                    <Text className="text-white  text-base font-bold">
                      {moment(el.createAt).format('yyyy-MM-DD')}
                    </Text>
                  </View>
                  <ExpensesItem item={el} key={el.id} />
                </View>
              );
            } else {
              return <ExpensesItem item={el} key={el.id} />;
            }
          })}
      </ScrollView>
    </View>
  );
};

export default ExpensesScrollView;
