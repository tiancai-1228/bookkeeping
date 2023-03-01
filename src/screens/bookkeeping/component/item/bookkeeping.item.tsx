import React from 'react';
import { Alert, Animated, Text, TouchableOpacity, View } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/rootSlices';
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
  onDelete: () => void;
  onChange: (id: string, name: string) => void;
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
  onDelete,
  onChange,
}: Props) => {
  const { me } = useSelector((state: RootState) => state.account.value);
  const isCurrentBookkeeping = me?.currentBookkeeping?.id === item.id;

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
      {isCurrentBookkeeping && (
        <View className=" absolute top-[-40] w-full justify-center items-center">
          <Text className="text-xl text-[#fff]">{t('now_account_book')}</Text>
        </View>
      )}

      <View className="w-full h-full bg-[#288786] rounded-lg items-center justify-between ">
        <Text numberOfLines={1} className="mt-10 text-4xl text-white">
          {item?.name || '-'}
        </Text>
        <View className="mb-14">
          <Text className="text-base text-white mb-2">{`${t(
            'account_book_code',
          )}:  ${item.id}`}</Text>
          <Text className="text-base text-white">
            {`${t('create_at')}: ${moment(item.createAt).format('yyyy-MM-DD')}`}
          </Text>
        </View>
      </View>
      {list.length > 1 && !isCurrentBookkeeping && (
        <View className=" absolute top-[-40] w-full justify-center items-center">
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
                  onPress: onDelete,
                },
              ]);
            }}
          />
        </View>
      )}

      {!isCurrentBookkeeping && (
        <TouchableOpacity
          onPress={() => {
            onChange(item.id, item.name);
          }}
          className=" absolute bottom-[0] bg-[#31a299] h-10 z-10 w-full rounded-b-lg  justify-center items-center"
        >
          <Text className="text-xl text-[#fff]">{t('choose')}</Text>
        </TouchableOpacity>
      )}
    </Animated.View>
  );
};

export default BookkeepingItem;
