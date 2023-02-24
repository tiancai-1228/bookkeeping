import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/rootSlices';
import useCategories from '@/hook/useCategories.hook';
import { expenses } from '@/firebase/set/bookkeeping';
import { Button } from '@rneui/themed';
import ExpensesItem from '../component/item/Expenses.item';

const ExpensesView = () => {
  const { googleToken, me } = useSelector(
    (state: RootState) => state.account.value,
  );
  const [currentCategory, setCurrent] = useState('breakfast');
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
                onClick={(name) => {
                  setCurrent(name);
                }}
              />
            ))}
          </View>
        </ScrollView>
      </View>
      <View className="bg-[#404040] h-full">
        <Button
          title={`expenses `}
          style={{ width: 200, marginTop: 20 }}
          color={'#39C1B6'}
          onPress={() => {
            console.log(BaseExpenses);
            expenses(me!.id, me!.currentBookkeeping!.id, currentCategory, 300);
          }}
        />
      </View>
    </View>
  );
};

export default ExpensesView;

const styles = StyleSheet.create({});
