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
    screen: 'Expenses' | 'Income';
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
    month: moment().format('M'),
    date: moment().format('D'),
  });
  const Tab = createMaterialTopTabNavigator();
  const navigation = useNavigation<ScreenProp>();

  const {
    params: { income, expenses },
  } = useRoute<BookkeepingRouterProp>();

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
          {() => <ExpensesView Date={Date} initDate={expenses} />}
        </Tab.Screen>

        <Tab.Screen name="Income" options={{ title: `${t('income')}` }}>
          {() => <IncomeView />}
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
