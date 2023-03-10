import React, { useEffect, useState } from 'react';
import { FlatList, Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/rootSlices';
import { ScreenProp } from '@/navigator/main.stack';
import { useNavigation } from '@react-navigation/native';
import useCategories from '@/hook/useCategories.hook';
import { numberSeparator } from '@/utils/number';
import { record } from '@/type/bookkeeping';
import { deleteIncome } from '@/firebase/set/bookkeeping';
import { Button, ListItem } from '@rneui/themed';

interface Prop {
  data: record[];
}

const CalendarList = ({ data }: Prop) => {
  const [item, setItem] = useState<record[]>([]);

  const { me } = useSelector((state: RootState) => state.account.value);
  const navigation = useNavigation<ScreenProp>();
  const { t } = useTranslation();
  const { icons } = useCategories();

  const sortItem = (data: record[]) => {
    const list = data.sort(function (a, b) {
      return b.createAt - a.createAt;
    });
    setItem(list);
  };

  const handelDelete = (item: record) => {
    const date = item.date.split('-');
    deleteIncome(me!.id, me!.currentBookkeeping!.id, item.id, {
      year: date[0],
      month: date[1],
    });
  };

  const renderItem = ({ item }: { item: record }) => {
    const color = item.type === 'expenses' ? '#cf667a' : '#39C1B6';
    return (
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
                handelDelete(item);
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
    );
  };

  useEffect(() => {
    sortItem(data);
  }, [data]);
  return (
    <FlatList
      data={item}
      className=" h-[280px] "
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
    />
  );
};

export default CalendarList;
