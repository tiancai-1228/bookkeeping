import React, { useEffect } from 'react';
import { Animated, Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { ScreenProp } from '@/navigator/main.stack';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import useItemAnimated from '@/hook/useItemAnimated.hook';
import { numberSeparator } from '@/utils/number';
import { record } from '@/type/bookkeeping';
import { Balance } from '@/type/report';
import moment from 'moment';

interface Prop {
  item: Balance;
  index: number;
}
const BalanceItem = ({ item, index }: Prop) => {
  const { t } = useTranslation();

  const { start, close, rightValue, fadeAnim } = useItemAnimated(index);
  const isFocused = useIsFocused();
  const color = item.count < 0 ? '#cf667a' : '#39C1B6';

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
        <Text className=" text-lg font-bold" style={{ color: color }}>
          {`${moment(item.date).format(`M`)} ${t('month')} ${moment(
            item.date,
          ).format('D')}  ${t('day')}`}
        </Text>
        <Text className=" text-lg font-bold" style={{ color: color }}>
          $ {numberSeparator(item.count)}
        </Text>
      </Animated.View>
    </View>
  );
};

export default BalanceItem;
