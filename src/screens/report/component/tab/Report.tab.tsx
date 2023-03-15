import React from 'react';
import { View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { record } from '@/type/bookkeeping';
import BalanceView from '../view/Balance.View';
import RecordView from '../view/Record.View';

const Tab = createMaterialTopTabNavigator();

interface Prop {
  expenses: { list: record[]; total: number };
  income: { list: record[]; total: number };
}
const ReportTab = ({ expenses, income }: Prop) => {
  const { t } = useTranslation();
  return (
    <View className="w-full  flex-1 ">
      <Tab.Navigator
        initialRouteName="ReportBalance"
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
              borderColor: 'gray',
              backgroundColor: '#404040',
              borderRadius: 10,
              height: 40,
            },
          };
        }}
      >
        <Tab.Screen
          name="ReportExpenses"
          options={{ title: `${t('expenses')}` }}
        >
          {() => <RecordView data={expenses} type="expenses" />}
        </Tab.Screen>

        <Tab.Screen name="ReportIncome" options={{ title: `${t('income')}` }}>
          {() => <RecordView data={income} type="income" />}
        </Tab.Screen>

        <Tab.Screen name="ReportBalance" options={{ title: `${t('balance')}` }}>
          {() => <BalanceView income={income} expenses={expenses} />}
        </Tab.Screen>
      </Tab.Navigator>
    </View>
  );
};

export default ReportTab;
