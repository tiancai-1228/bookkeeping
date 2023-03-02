import React from 'react';
import { Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/rootSlices';
import { ScreenProp } from '@/navigator/main.stack';
import { useNavigation } from '@react-navigation/native';
import useCategories from '@/hook/useCategories.hook';
import { record } from '@/type/bookkeeping';
import { deleteExpenses } from '@/firebase/set/bookkeeping';
import { Button, ListItem } from '@rneui/themed';
import moment from 'moment';

interface Prop {
  item: record;
}

const ExpensesItem = ({ item }: Prop) => {
  const { t } = useTranslation();
  const { icons } = useCategories();
  const { me } = useSelector((state: RootState) => state.account.value);
  const navigation = useNavigation<ScreenProp>();
  return (
    <ListItem.Swipeable
      containerStyle={{
        backgroundColor: '#000',
        flexDirection: 'row',
        padding: 0,
        paddingTop: 6,
        paddingBottom: 6,
        justifyContent: 'space-between',
      }}
      onPress={() => {
        item.type === 'expenses' &&
          navigation.navigate('Bookkeeping', { expenses: item });
        item.type === 'income' &&
          navigation.navigate('Bookkeeping', { income: item });
      }}
      rightContent={() => (
        <Button
          title=""
          onPress={() => {
            const date = item.date.split('-');
            deleteExpenses(me!.id, me!.currentBookkeeping!.id, item.id, {
              year: date[0],
              month: date[1],
            });
          }}
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
