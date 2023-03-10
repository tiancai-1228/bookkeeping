import React from 'react';
import { Animated, Dimensions, ScrollView, Text, View } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/rootSlices';
import { record } from '@/type/bookkeeping';
import { deleteExpenses } from '@/firebase/set/bookkeeping';
import BookkeepingItem from '../item/Bookkeeping.item';

interface Prop {
  expensesList: record[];
}

const ExpensesScrollView = ({ expensesList }: Prop) => {
  const { me } = useSelector((state: RootState) => state.account.value);

  const handelDelete = (item: record) => {
    const date = item.date.split('-');
    deleteExpenses(me!.id, me!.currentBookkeeping!.id, item.id, {
      year: date[0],
      month: date[1],
    });
  };

  return (
    <View className="flex-1  px-4 pt-2 mb-20 ">
      <ScrollView>
        {expensesList.length !== 0 &&
          expensesList.map((el, index) => {
            const firstItem = index === 0;
            let isHeader = false;
            if (!firstItem) {
              isHeader = el.date !== expensesList[index - 1].date;
            }
            return (
              <BookkeepingItem
                item={el}
                key={el.id}
                index={index}
                isHeader={firstItem || isHeader}
                onDelete={() => {
                  handelDelete(el);
                }}
              />
            );
          })}
      </ScrollView>
    </View>
  );
};

export default ExpensesScrollView;
