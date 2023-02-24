import React, { useState } from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { t } from 'i18next';
import ExpensesView from './containers/Expenses.view';
import IncomeView from './containers/Income.view';

export type BookkeepingTabParamList = {
  customer: {
    screen: 'Expenses' | 'Income';
  };
};

const BookkeepingScreen = () => {
  const Tab = createMaterialTopTabNavigator();
  return (
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
        {() => <ExpensesView />}
      </Tab.Screen>

      <Tab.Screen name="Income" options={{ title: `${t('income')}` }}>
        {() => <IncomeView />}
      </Tab.Screen>
    </Tab.Navigator>
  );
};

export default BookkeepingScreen;
