import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { numberSeparator } from '@/utils/number';
import { bookkeeping } from '@/type/bookkeeping';
import MonthPickerModal from '@/components/modal/MonthPicker.modal';
import { AntDesign } from '@expo/vector-icons';
import { t } from 'i18next';
import moment from 'moment';
import ExpensesScrollView from '../component/scrollView/Expenses.scrollView';
import IncomeScrollView from '../component/scrollView/Income.scrollView';

interface Prop {
  bookkeepingData: bookkeeping;
}

const MonthView = ({ bookkeepingData }: Prop) => {
  const [visible, setVisible] = useState(false);
  const [year, setYear] = useState(moment().format('YYYY'));
  const [month, setMonth] = useState(moment().format('MM'));

  const { name, id, createAt, data } = bookkeepingData;
  const Tab = createMaterialTopTabNavigator();

  return (
    <View className="flex-1 w-full items-center py-4 ">
      <View className="w-full h-8  mb-2 justify-center items-center flex-row">
        <Text className="text-2xl font-bold text-white mr-2" numberOfLines={1}>
          {`${year} ${t('year')} ${month} ${t('month')}`}
        </Text>
        <AntDesign
          name="caretdown"
          size={20}
          color="white"
          onPress={() => {
            setVisible(true);
          }}
        />
      </View>

      <View className="w-[90%] h-[150px] bg-[#31a299] rounded-xl p-3 shadow shadow-gray-400">
        <View className="w-full justify-between flex-row">
          <View className="w-[80%] justify-around ">
            <Text className="text-base font-bold" numberOfLines={1}>
              {t('monthly_balance')}:
            </Text>
            <Text className="text-4xl mt-2 font-bold text-w" numberOfLines={1}>
              $ {numberSeparator(98764531)}
            </Text>

            <View className="w-full  mb-2 flex-row justify-between mt-2">
              <View className=" justify-around  ">
                <Text className=" text-sm font-bold" numberOfLines={1}>
                  {t('monthly_expenses')}:
                </Text>
                <Text className=" text-base font-bold" numberOfLines={1}>
                  $ {numberSeparator(98764531)}
                </Text>
              </View>

              <View className="justify-around ">
                <Text className=" text-sm font-bold" numberOfLines={1}>
                  {t('monthly_income')}:
                </Text>
                <Text className=" text-base font-bold" numberOfLines={1}>
                  $ {numberSeparator(98764531)}
                </Text>
              </View>
            </View>
          </View>

          <View className="w-[20%] justify-center items-center">
            <View className="w-14 h-14 bg-white" />
          </View>
        </View>
      </View>

      <View className="w-full mt-3 flex-1">
        <Tab.Navigator
          screenOptions={({ route }) => {
            return {
              tabBarScrollEnabled: true,
              tabBarActiveTintColor: '#39C1B6',
              tabBarInactiveTintColor: '#fff',
              tabBarPressColor: '#39C1B6',
              tabBarLabelStyle: {
                fontSize: 16,
                fontWeight: 'bold',
              },

              tabBarIndicatorStyle: {
                height: 0,
              },

              tabBarItemStyle: {
                width: 80,
                height: 40,
                paddingTop: 0,
              },

              tabBarStyle: {
                backgroundColor: '#000',
                width: '100%',
                height: 40,
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 10,
              },

              tabBarContentContainerStyle: {
                borderWidth: 2,
                borderColor: 'gray',
                backgroundColor: '#404040',
                borderRadius: 10,
                height: 40,
              },
            };
          }}
        >
          <Tab.Screen name="Expenses" options={{ title: `${t('expenses')}` }}>
            {() => <ExpensesScrollView bookkeepingData={bookkeepingData} />}
          </Tab.Screen>

          <Tab.Screen name="Income" options={{ title: `${t('income')}` }}>
            {() => <IncomeScrollView />}
          </Tab.Screen>
        </Tab.Navigator>
      </View>

      <MonthPickerModal
        Visible={visible}
        year={year}
        month={month}
        onClose={() => {
          setVisible(false);
        }}
        onPress={(y, m) => {
          setYear(y);
          setMonth(m);
        }}
      />
    </View>
  );
};

export default MonthView;
