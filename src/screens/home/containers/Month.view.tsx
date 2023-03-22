import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { ScreenProp } from '@/navigator/main.stack';
import { useNavigation } from '@react-navigation/native';
import useBookkeepingFormat from '@/hook/useBookkeepingFormat.hook';
import { numberSeparator } from '@/utils/number';
import { bookkeeping } from '@/type/bookkeeping';
import HeaderDateButton from '@/components/button/HeaderDate.button';
import { t } from 'i18next';
import HomeTab from '../component/tab/Home.tab';

interface Prop {
  bookkeepingData: bookkeeping;
}

const MonthView = ({ bookkeepingData }: Prop) => {
  const { data } = bookkeepingData;

  const navigation = useNavigation<ScreenProp>();

  const { expenses, income } = useBookkeepingFormat(data);

  return (
    <View className="flex-1 w-full items-center py-4 ">
      {/* date */}
      <HeaderDateButton />

      {/* card */}
      <TouchableOpacity
        className="w-[90%] h-[140px] bg-[#31a299] rounded-xl p-3 shadow shadow-gray-400"
        onPress={() => {
          navigation.navigate('Report');
        }}
      >
        <View className="w-full justify-between flex-row">
          <View className="w-full h-[120px] justify-between ">
            <Text className="text-base font-bold" numberOfLines={1}>
              {t('monthly_balance')}:
            </Text>
            <Text className="text-4xl mt-2 font-bold text-w" numberOfLines={1}>
              $ {numberSeparator(income.total - expenses.total)}
            </Text>

            <View className="w-full  flex-row justify-between ">
              <View className=" justify-around  ">
                <Text className=" text-sm font-bold " numberOfLines={1}>
                  {t('monthly_expenses')}:
                </Text>
                <Text
                  className=" text-base font-bold text-[#b00420] "
                  numberOfLines={1}
                >
                  $ {numberSeparator(expenses.total)}
                </Text>
              </View>

              <View className="justify-around ">
                <Text className=" text-sm font-bold" numberOfLines={1}>
                  {t('monthly_income')}:
                </Text>
                <Text
                  className=" text-base font-bold text-[#3700b3]"
                  numberOfLines={1}
                >
                  $ {numberSeparator(income.total)}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>

      {/* list */}
      <HomeTab expensesList={expenses.list} incomeList={income.list} />
    </View>
  );
};

export default MonthView;
