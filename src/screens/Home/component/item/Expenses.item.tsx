import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import useCategories from '@/hook/useCategories.hook';
import { record } from '@/type/bookkeeping';
import { Button, ListItem } from '@rneui/themed';
import moment from 'moment';

interface Prop {
  item: record;
}

const ExpensesItem = ({ item }: Prop) => {
  const { t } = useTranslation();
  const { icons } = useCategories();
  return (
    <ListItem.Swipeable
      containerStyle={{
        backgroundColor: '#000',
        // borderWidth: 1,
        flexDirection: 'row',
        padding: 0,
        justifyContent: 'space-between',
      }}
      rightContent={(reset) => (
        <Button
          title=""
          onPress={() => reset()}
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
  );
};

export default ExpensesItem;
