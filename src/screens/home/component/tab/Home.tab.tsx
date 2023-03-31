import React from 'react';
import { View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { record } from '@/type/bookkeeping';
import ExpensesScrollView from '../scrollView/Expenses.scrollView';
import IncomeScrollView from '../scrollView/Income.scrollView';

const Tab = createMaterialTopTabNavigator();

interface Prop {
  expensesList: record[];
  incomeList: record[];
}

const HomeTab = ({ expensesList, incomeList }: Prop) => {
  const { t } = useTranslation();
  return (
    <View className="w-full mt-3 flex-1">
      <Tab.Navigator
        screenOptions={({ route }) => {
          return {
            swipeEnabled: false,
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
              borderColor: 'gray',
              backgroundColor: '#404040',
              borderRadius: 10,
              height: 40,
            },
          };
        }}
      >
        <Tab.Screen name="Expenses" options={{ title: `${t('expenses')}` }}>
          {() => <ExpensesScrollView expensesList={expensesList} />}
        </Tab.Screen>

        <Tab.Screen name="Income" options={{ title: `${t('income')}` }}>
          {() => <IncomeScrollView incomeList={incomeList} />}
        </Tab.Screen>
      </Tab.Navigator>
    </View>
  );
};

export default HomeTab;
