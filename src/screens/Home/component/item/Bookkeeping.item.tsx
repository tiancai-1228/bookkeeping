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

interface Prop {
  item: record;
  onDelete: () => void;
}

const BookkeepingItem = ({ item, onDelete }: Prop) => {
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
          navigation.navigate('Bookkeeping', {
            type: item.type,
            expenses: item,
          });
        item.type === 'income' &&
          navigation.navigate('Bookkeeping', { type: item.type, income: item });
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
  );
};

export default BookkeepingItem;
