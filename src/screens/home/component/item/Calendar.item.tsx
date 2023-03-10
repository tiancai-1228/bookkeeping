import React, { useEffect } from 'react';
import { Animated, Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { ScreenProp } from '@/navigator/main.stack';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import useCategories from '@/hook/useCategories.hook';
import useItemAnimated from '@/hook/useItemAnimated.hook';
import { numberSeparator } from '@/utils/number';
import { record } from '@/type/bookkeeping';
import { Button, ListItem } from '@rneui/themed';

interface Prop {
  item: record;
  onDelete: (item: record) => void;
  index: number;
}

const CalendarItem = ({ item, index, onDelete }: Prop) => {
  const { t } = useTranslation();
  const { icons } = useCategories();
  const { start, close, rightValue, fadeAnim } = useItemAnimated(index);
  const navigation = useNavigation<ScreenProp>();
  const isFocused = useIsFocused();
  const color = item.type === 'expenses' ? '#cf667a' : '#39C1B6';

  useEffect(() => {
    if (!isFocused) {
      close();
      return;
    }
    start();
  }, [isFocused]);

  return (
    <Animated.View
      style={{ opacity: fadeAnim, transform: [{ translateX: rightValue }] }}
    >
      <View className="w-[95%] m-auto">
        <ListItem.Swipeable
          containerStyle={{
            backgroundColor: '#252525',
            flexDirection: 'row',
            padding: 0,
            paddingVertical: 4,
            paddingHorizontal: 20,
            justifyContent: 'space-between',
            borderBottomWidth: 1,
          }}
          onPress={() => {
            item.type === 'expenses' &&
              navigation.navigate('Bookkeeping', {
                type: item.type,
                expenses: item,
              });
            item.type === 'income' &&
              navigation.navigate('Bookkeeping', {
                type: item.type,
                income: item,
              });
          }}
          rightContent={() => (
            <Button
              title=""
              onPress={() => {
                onDelete(item);
              }}
              icon={{ name: 'delete', color: 'white' }}
              buttonStyle={{ height: '100%', backgroundColor: 'red' }}
            />
          )}
        >
          <View className="flex-row">
            {icons(item.category.type, item.category.icon, 40, color)}
            <View className="ml-6 justify-center">
              <Text className=" text-lg font-bold" style={{ color: color }}>
                {t(`${item.category.name}`)}
              </Text>
              {item.memo && (
                <Text className="text-gray-400 text-base ">{item.memo}</Text>
              )}
            </View>
          </View>
          <View>
            <Text className=" text-lg font-bold" style={{ color: color }}>
              $ {numberSeparator(item.count)}
            </Text>
          </View>
        </ListItem.Swipeable>
      </View>
    </Animated.View>
  );
};

export default CalendarItem;
