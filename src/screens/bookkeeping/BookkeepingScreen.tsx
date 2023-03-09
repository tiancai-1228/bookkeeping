import React, { useEffect, useLayoutEffect, useState } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { RootStackParamList, ScreenProp } from '@/navigator/main.stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { bookkeepingDate } from '@/type/common';
import CalendarModal from '@/components/modal/Calendar.modal';
import { t } from 'i18next';
import moment from 'moment';
import ExpensesView from './containers/Expenses.view';
import IncomeView from './containers/Income.view';

export type BookkeepingTabParamList = {
  customer: {
    screen: 'expenses' | 'income';
  };
};

export type BookkeepingRouterProp = RouteProp<
  RootStackParamList,
  'Bookkeeping'
>;

const BookkeepingScreen = () => {
  const [visible, setVisible] = useState(false);
  const [Date, setDate] = useState<bookkeepingDate>({
    year: moment().format('yyyy'),
    month: moment().format('MM'),
    date: moment().format('DD'),
  });
  const Tab = createMaterialTopTabNavigator();
  const navigation = useNavigation<ScreenProp>();

  const {
    params: { type, income, expenses },
  } = useRoute<BookkeepingRouterProp>();

  const handleInitDate = (date: string[]) => {
    const initDate = {
      year: date[0],
      month: date[1],
      date: date[2],
    };
    setDate(initDate);
  };

  useEffect(() => {
    if (expenses) {
      const date = expenses.date.split('-');
      handleInitDate(date);
    }
    if (income) {
      const date = income.date.split('-');
      handleInitDate(date);
    }
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <TouchableOpacity
          onPress={() => {
            setVisible(true);
          }}
        >
          <Text className="text-white font-bold text-xl">
            {`${Date.year} / ${Date.month} / ${Date.date}`}
          </Text>
        </TouchableOpacity>
      ),
    });
  }, [Date]);
  return (
    <>
      <Tab.Navigator
        initialRouteName={type}
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
              width: 120,
              height: 40,
              paddingTop: 0,
            },

            tabBarStyle: {
              backgroundColor: '#252525',
              width: '100%',
              height: 40,
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 10,
            },

            tabBarContentContainerStyle: {
              borderWidth: 2,
              borderColor: '#fff',
              backgroundColor: '#404040',
              borderRadius: 10,
              height: 40,
            },
          };
        }}
      >
        <Tab.Screen name="expenses" options={{ title: `${t('expenses')}` }}>
          {() => <ExpensesView Date={Date} initDate={expenses} />}
        </Tab.Screen>

        <Tab.Screen name="income" options={{ title: `${t('income')}` }}>
          {() => <IncomeView Date={Date} initDate={income} />}
        </Tab.Screen>
      </Tab.Navigator>

      <CalendarModal
        Visible={visible}
        initDate={moment().format('yyyy-MM-DD')}
        onClose={() => {
          setVisible(false);
        }}
        onPress={(date) => {
          date && setDate(date);
        }}
      />
    </>
  );
};

export default BookkeepingScreen;
