import React, { useEffect, useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/rootSlices';
import { ScreenProp } from '@/navigator/main.stack';
import { useNavigation } from '@react-navigation/native';
import useCategories from '@/hook/useCategories.hook';
import { record } from '@/type/bookkeeping';
import { category } from '@/type/categories';
import { bookkeepingDate } from '@/type/common';
import { income, updateIncome } from '@/firebase/set/bookkeeping';
import Calculator from '../component/calculator/Calculator';
import CategoryItem from '../component/item/Category.item';

interface Prop {
  Date: bookkeepingDate;
  initDate?: record;
}

const IncomeView = ({ Date, initDate }: Prop) => {
  const { me } = useSelector((state: RootState) => state.account.value);
  const [currentCategory, setCurrentCategory] = useState<category>({
    name: 'salary',
    icon: 'account-cash',
    type: 'MaterialCommunity',
  });
  const { BaseIncome } = useCategories();
  const navigation = useNavigation<ScreenProp>();

  const handelSubmit = (count: number, memo: string) => {
    if (initDate) {
      updateIncome(
        me!.id,
        me!.currentBookkeeping!.id,
        initDate.id,
        { year: Date.year, month: Date.month, date: Date.date },
        currentCategory,
        count,
        memo,
      );
    } else {
      income(
        me!.id,
        me!.currentBookkeeping!.id,
        { year: Date.year, month: Date.month, date: Date.date },
        currentCategory,
        count,
        memo,
      );
    }
    navigation.pop();
  };

  useEffect(() => {
    if (!initDate) return;
    setCurrentCategory(initDate.category);
  }, []);
  return (
    <View className="flex-1 ">
      <View className="h-[350px] border mt-10 ">
        <ScrollView>
          <View className="flex-row flex-wrap justify-around py-2">
            {BaseIncome.map((item) => (
              <CategoryItem
                key={item.name}
                item={item}
                currentCategory={currentCategory}
                onClick={(val) => {
                  setCurrentCategory(val);
                }}
              />
            ))}
          </View>
        </ScrollView>
      </View>

      <Calculator
        initDate={initDate}
        onPress={(count, memo) => {
          handelSubmit(count, memo);
        }}
      />
    </View>
  );
};

export default IncomeView;
