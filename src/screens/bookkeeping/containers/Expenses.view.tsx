import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/rootSlices';
import useCategories from '@/hook/useCategories.hook';
import { category } from '@/type/categories';
import { expenses } from '@/firebase/set/bookkeeping';
import Calculator from '../component/calculator/Calculator';
import ExpensesItem from '../component/item/Expenses.item';

const ExpensesView = () => {
  const { me } = useSelector((state: RootState) => state.account.value);
  const [currentCategory, setCurrent] = useState<category>({
    name: 'breakfast',
    icon: 'food-apple',
    type: 'MaterialCommunity',
  });
  const [count, setCount] = useState('');
  const { BaseExpenses } = useCategories();

  return (
    <View className="flex-1 ">
      <View className="h-[300px] border mt-10 ">
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
        onPress={() => {
          expenses(
            me!.id,
            me!.currentBookkeeping!.id,
            { year: '', month: '', date: '' },
            currentCategory,
            parseFloat(count),
            'test',
          );
        }}
      />
    </View>
  );
};

export default ExpensesView;
