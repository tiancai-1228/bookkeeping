import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/rootSlices';
import { ScreenProp } from '@/navigator/main.stack';
import { useNavigation } from '@react-navigation/native';
import useCategories from '@/hook/useCategories.hook';
import { category } from '@/type/categories';
import { bookkeepingDate } from '@/type/common';
import { expenses } from '@/firebase/set/bookkeeping';
import Calculator from '../component/calculator/Calculator';
import ExpensesItem from '../component/item/Expenses.item';

interface Prop {
  Date: bookkeepingDate;
}

const ExpensesView = ({ Date }: Prop) => {
  const { me } = useSelector((state: RootState) => state.account.value);
  const [currentCategory, setCurrent] = useState<category>({
    name: 'breakfast',
    icon: 'food-apple',
    type: 'MaterialCommunity',
  });
  const { BaseExpenses } = useCategories();

  const navigation = useNavigation<ScreenProp>();
  return (
    <View className="flex-1 ">
      <View className="h-[350px] border mt-10 ">
        <ScrollView>
          <View className="flex-row flex-wrap justify-around py-2">
            {BaseExpenses.map((item) => (
              <ExpensesItem
                key={item.name}
                item={item}
                currentCategory={currentCategory}
                onClick={(val) => {
                  setCurrent(val);
                }}
              />
            ))}
          </View>
        </ScrollView>
      </View>

      <Calculator
        onPress={(count, memo) => {
          expenses(
            me!.id,
            me!.currentBookkeeping!.id,
            { year: Date.year, month: Date.month, date: Date.date },
            currentCategory,
            count,
            memo,
          );
          navigation.goBack();
        }}
      />
    </View>
  );
};

export default ExpensesView;
