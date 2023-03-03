import React from 'react';
import { category, iconType } from '@/type/categories';
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';

const icons = (type: iconType, name: any, size: number, color: string) => {
  if (type === 'MaterialCommunity') {
    return <MaterialCommunityIcons name={name} size={size} color={color} />;
  }
  if (type === 'Material') {
    return <MaterialIcons name={name} size={size} color={color} />;
  }
  if (type === 'FontAwesome') {
    return <FontAwesome name={name} size={size} color={color} />;
  }
  if (type === 'Ionicons') {
    return <Ionicons name={name} size={size} color={color} />;
  }
  if (type === 'FontAwesome5') {
    return <FontAwesome5 name={name} size={size} color={color} />;
  }
};

const BaseExpenses: category[] = [
  { name: 'breakfast', icon: 'food-apple', type: 'MaterialCommunity' },
  { name: 'lunch', icon: 'food', type: 'MaterialCommunity' },
  { name: 'dinner', icon: 'food-fork-drink', type: 'MaterialCommunity' },
  {
    name: 'daily_necessities',
    icon: 'cart-variant',
    type: 'MaterialCommunity',
  },
  { name: 'drink', icon: 'coffee', type: 'MaterialCommunity' },
  { name: 'entertainment', icon: 'gamepad-variant', type: 'MaterialCommunity' },
  { name: 'gas_station', icon: 'gas-station', type: 'MaterialCommunity' },
  { name: 'liquor', icon: 'liquor', type: 'MaterialCommunity' },
  { name: 'medical', icon: 'medical-bag', type: 'MaterialCommunity' },
  { name: 'rent', icon: 'warehouse', type: 'MaterialCommunity' },
  { name: 'shopping', icon: 'shopping-outline', type: 'MaterialCommunity' },
  { name: 'social', icon: 'account-supervisor', type: 'MaterialCommunity' },
  { name: 'transportation', icon: 'train', type: 'MaterialCommunity' },
  { name: 'dim_sum', icon: 'cupcake', type: 'MaterialCommunity' },
  { name: 'digit', icon: 'cellphone', type: 'MaterialCommunity' },
  { name: 'other', icon: 'view-grid-outline', type: 'MaterialCommunity' },
];

const BaseIncome: category[] = [
  {
    name: 'salary',
    icon: 'account-cash',
    type: 'MaterialCommunity',
  },
  {
    name: 'bonus',
    icon: 'attach-money',
    type: 'Material',
  },
  {
    name: 'trade',
    icon: 'handshake-outline',
    type: 'MaterialCommunity',
  },
  {
    name: 'stock',
    icon: 'bar-chart-outline',
    type: 'Ionicons',
  },
  {
    name: 'investment',
    icon: 'piggy-bank',
    type: 'FontAwesome5',
  },
  { name: 'rent', icon: 'warehouse', type: 'MaterialCommunity' },
  {
    name: 'picked_up_money',
    icon: 'hand-scissors-o',
    type: 'FontAwesome',
  },
  { name: 'other', icon: 'view-grid-outline', type: 'MaterialCommunity' },
];

const useCategories = () => {
  return { BaseIncome, BaseExpenses, icons };
};

export default useCategories;
