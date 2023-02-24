import React from 'react';
import { category } from '@/type/categories';
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const iconType = 'MaterialCommunity';

const icons = (
  type: typeof iconType,
  name: any,
  size: number,
  color: string,
) => {
  if (type === 'MaterialCommunity') {
    return <MaterialCommunityIcons name={name} size={size} color={color} />;
  }
};

const BaseExpenses: category[] = [
  { name: 'breakfast', icon: 'food-apple', type: 'MaterialCommunity' },
  { name: 'dinner', icon: 'food-fork-drink', type: 'MaterialCommunity' },
  { name: 'lunch', icon: 'food', type: 'MaterialCommunity' },
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

const useCategories = () => {
  const BaseIncome = [''];

  return { BaseIncome, BaseExpenses, icons };
};

export default useCategories;
