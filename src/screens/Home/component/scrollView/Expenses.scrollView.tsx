import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/rootSlices';
import { ScreenProp } from '@/navigator/main.stack';
import { useNavigation } from '@react-navigation/native';
import { record } from '@/type/bookkeeping';
import { deleteExpenses } from '@/firebase/set/bookkeeping';
import BookkeepingItem from '../item/Bookkeeping.item';

interface Prop {
  expensesList: record[];
}

const ExpensesScrollView = ({ expensesList }: Prop) => {
  const date: string[] = [];
  const { me } = useSelector((state: RootState) => state.account.value);
  const navigation = useNavigation<ScreenProp>();

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
          expensesList.map((el) => {
            if (!date.includes(el.date)) {
              date.push(el.date);
              return (
                <View key={el.id}>
                  <View className="bg-[#404040] px-1 rounded-md my-1">
                    <Text className="text-white  text-base font-bold">
                      {el.date}
                    </Text>
                  </View>
                  <BookkeepingItem
                    item={el}
                    key={el.id}
                    onDelete={() => {
                      handelDelete(el);
                    }}
                  />
                </View>
              );
            } else {
              return (
                <BookkeepingItem
                  item={el}
                  key={el.id}
                  onDelete={() => {
                    handelDelete(el);
                  }}
                />
              );
            }
          })}
      </ScrollView>
    </View>
  );
};

export default ExpensesScrollView;
