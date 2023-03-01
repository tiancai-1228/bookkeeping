import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import useCategories from '@/hook/useCategories.hook';
import { category } from '@/type/categories';
import { t } from 'i18next';

interface Props {
  item: category;
  currentCategory: category;
  onClick: (category: category) => void;
}

const ExpensesItem = ({ item, currentCategory, onClick }: Props) => {
  const { icons } = useCategories();
  const iconColor = item.name === currentCategory.name;
  return (
    <TouchableOpacity
      onPress={() => {
        onClick(item);
      }}
      className="w-[24%] h-10  mb-10 justify-center items-center"
    >
      {icons(item.type, item.icon, 40, iconColor ? '#39C1B6' : '#fff')}
      <Text
        numberOfLines={1}
        className={`${
          iconColor ? 'text-[#39C1B6]' : 'text-[#fff]'
        }  w-[100px] h-4 text-center`}
      >
        {t(`${item.name}`)}
      </Text>
    </TouchableOpacity>
  );
};

export default ExpensesItem;
