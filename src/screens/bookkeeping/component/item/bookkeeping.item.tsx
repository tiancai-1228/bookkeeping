import React from 'react';
import { Alert, Animated, Text, View } from 'react-native';
import { bookkeeping } from '@/type/bookkeeping';
import { AntDesign } from '@expo/vector-icons';
import { t } from 'i18next';
import moment from 'moment';

interface Props {
  item: bookkeeping;
  list: bookkeeping[];
  OFFSET: number;
  ITEM_WIDTH: number;
  ITEM_HEIGHT: number;
  currentIndex: number;
  opacity: Animated.AnimatedInterpolation<string | number>;
  translate: Animated.AnimatedInterpolation<string | number>;
  handelDelete: () => void;
}

const BookkeepingItem = ({
  item,
  list,
  OFFSET,
  ITEM_WIDTH,
  ITEM_HEIGHT,
  currentIndex,
  opacity,
  translate,
  handelDelete,
}: Props) => {
  return (
    <Animated.View
      key={item.id}
      style={{
        width: ITEM_WIDTH,
        height: ITEM_HEIGHT,
        marginLeft: currentIndex === 0 ? OFFSET : undefined,
        marginRight: currentIndex === list.length - 1 ? OFFSET : undefined,
        opacity: opacity,
        transform: [{ scale: translate }],
      }}
    >
      <View className="w-full h-full bg-[#165457] rounded-lg items-center justify-between">
        <Text className="mt-10 text-4xl text-white">{item?.name || '-'}</Text>
        <View className="mb-16">
          <Text className="text-base text-white mb-2">{`${t(
            'account_book_code',
          )}:  ${item.id}`}</Text>
          <Text className="text-base text-white">
            {`${t('create_at')}: ${moment(item.createAt).format('yyyy-MM-DD')}`}
          </Text>
        </View>
      </View>
      {list.length > 1 && (
        <View className="bottom-2 absolute right-4">
          <AntDesign
            name="delete"
            size={30}
            color="red"
            className="top-0 absolute"
            onPress={() => {
              Alert.alert(`${t('warning')}`, `${t('delete_sure')}`, [
                {
                  text: `${t('cancel')}`,
                },
                {
                  text: `${t('confirm')}`,
                  onPress: () => {
                    handelDelete();
                  },
                },
              ]);
            }}
          />
        </View>
      )}
    </Animated.View>
  );
};

export default BookkeepingItem;
