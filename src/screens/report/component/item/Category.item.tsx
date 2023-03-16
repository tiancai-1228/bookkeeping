import React from 'react';
import { Text, View } from 'react-native';
import useCategories from '@/hook/useCategories.hook';
import { RecordData } from '@/type/report';

interface Prop {
  item: RecordData;
  index: number;
  total: number;
}

const CategoryItem = ({ index, item, total }: Prop) => {
  const { icons } = useCategories();

  return (
    <View className="mb-2 flex-row  justify-center">
      <Text className=" text-lg font-bold mr-4" style={{ color: item.color }}>
        {icons(item.category.type, item.category.icon, 30, item.color)}
      </Text>

      <Text className=" text-lg font-bold" style={{ color: item.color }}>
        {(item.count / total).toFixed(1) === '0.0'
          ? 0
          : (item.count / total).toFixed(1)}
        %
      </Text>
    </View>
  );
};

export default CategoryItem;
