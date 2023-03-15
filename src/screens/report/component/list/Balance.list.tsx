import React, { useMemo, useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { Balance } from '@/type/report';
import { Octicons } from '@expo/vector-icons';
import { t } from 'i18next';
import BalanceItem from '../item/Balance.item';

interface Prop {
  data: Balance[];
}

const BalanceList = ({ data }: Prop) => {
  const [sortType, setSortType] = useState<'asc' | 'desc'>('desc');

  const item: Balance[] = useMemo(() => {
    const list = data.sort(function (a, b) {
      if (sortType === 'asc') {
        return a.date - b.date;
      } else {
        return b.date - a.date;
      }
    });
    return list;
  }, [data, sortType]);

  return (
    <View className="flex-1">
      <View className="px-3 mb-2 flex-row justify-between">
        <Text className="text-white text-xl font-bold">
          {t('date_details')}
        </Text>

        <Octicons
          name="arrow-switch"
          size={24}
          color="white"
          onPress={() => {
            setSortType((pre) => (pre === 'asc' ? 'desc' : 'asc'));
          }}
          style={{ transform: [{ rotateZ: '90deg' }] }}
        />
      </View>

      <ScrollView className="mb-[100px]">
        {item.length !== 0 &&
          item.map((el, index) => {
            return <BalanceItem item={el} key={el.date} index={index} />;
          })}
      </ScrollView>
    </View>
  );
};

export default BalanceList;
