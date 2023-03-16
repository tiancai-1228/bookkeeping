import React, { useEffect } from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useIsFocused } from '@react-navigation/native';
import useCategories from '@/hook/useCategories.hook';
import useItemAnimated from '@/hook/useItemAnimated.hook';
import { numberSeparator } from '@/utils/number';
import { RecordData } from '@/type/report';

interface Prop {
  item: RecordData;
  index: number;
}
const RecordItem = ({ item, index }: Prop) => {
  const { icons } = useCategories();
  const { start, close, rightValue, fadeAnim } = useItemAnimated(index);
  const isFocused = useIsFocused();

  useEffect(() => {
    if (!isFocused) {
      close();
      return;
    }
    start();
  }, [isFocused]);
  return (
    <View className="px-4">
      <Animated.View
        style={{ opacity: fadeAnim, transform: [{ translateX: rightValue }] }}
        className="mb-2 flex-row  justify-between"
      >
        <View className="flex-row">
          <Text
            className=" text-lg font-bold mr-2"
            style={{ color: item.color }}
          >
            {icons(item.category.type, item.category.icon, 30, item.color)}
          </Text>
          <Text className=" text-lg font-bold" style={{ color: item.color }}>
            {item.name}
          </Text>
        </View>

        <Text className=" text-lg font-bold" style={{ color: item.color }}>
          $ {numberSeparator(item.count)}
        </Text>
      </Animated.View>
    </View>
  );
};

export default RecordItem;
