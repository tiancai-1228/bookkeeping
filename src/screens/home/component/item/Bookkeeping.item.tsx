import React, { useRef } from 'react';
import { Animated, Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { ScreenProp } from '@/navigator/main.stack';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import useCategories from '@/hook/useCategories.hook';
import { record } from '@/type/bookkeeping';
import { Button, ListItem } from '@rneui/themed';

interface Prop {
  item: record;
  onDelete: () => void;
  isHeader?: boolean;
  index: number;
}

const BookkeepingItem = ({ item, isHeader, index, onDelete }: Prop) => {
  const { t } = useTranslation();
  const { icons } = useCategories();
  const navigation = useNavigation<ScreenProp>();
  const isFocused = useIsFocused();
  const rightValue = useRef(new Animated.Value(1000)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const close = () => {
    Animated.timing(rightValue, {
      toValue: 1000,
      duration: 100,
      useNativeDriver: true,
    }).start();
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 100,
      useNativeDriver: true,
    }).start();
  };

  const start = () => {
    Animated.timing(rightValue, {
      toValue: 0,
      duration: index * 200 + 500,
      useNativeDriver: true,
    }).start();
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  };

  React.useEffect(() => {
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
      {isHeader && (
        <View className="bg-[#404040] px-1 rounded-md my-1">
          <Text className="text-white  text-base font-bold">{item.date}</Text>
        </View>
      )}
      <ListItem.Swipeable
        containerStyle={{
          backgroundColor: '#252525',
          flexDirection: 'row',
          padding: 0,
          paddingTop: 6,
          paddingBottom: 6,
          justifyContent: 'space-between',
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
            onPress={onDelete}
            icon={{ name: 'delete', color: 'white' }}
            buttonStyle={{ height: '100%', backgroundColor: 'red' }}
          />
        )}
      >
        <View className="flex-row">
          {icons(item.category.type, item.category.icon, 40, '#39C1B6')}

          <View className="ml-6">
            <Text className="text-white text-lg font-bold">
              {t(`${item.category.name}`)}
            </Text>
            {item.memo && (
              <Text className="text-gray-400 text-base ">{item.memo}</Text>
            )}
          </View>
        </View>

        <Text className="text-white text-xl mr-2">$ {item.count}</Text>
      </ListItem.Swipeable>
    </Animated.View>
  );
};

export default BookkeepingItem;
