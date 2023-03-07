import React, { useState } from 'react';
import { Alert, Animated, Text, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/rootSlices';
import { setMeSlice } from '@/redux/slices/accountSlice';
import { bookkeeping } from '@/type/bookkeeping';
import { setCurrentBookkeeping } from '@/firebase/set/account';
import { updateBookkeeping } from '@/firebase/set/bookkeeping';
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { t } from 'i18next';
import moment from 'moment';
import CreateModal from '../modal/Create.modal';

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
  const [modalVisible, setModalVisible] = useState(false);
  const [newName, setNewName] = useState('');

  const dispatch = useDispatch();
  const { me } = useSelector((state: RootState) => state.account.value);
  const isCurrentBookkeeping = me?.currentBookkeeping?.id === item.id;

  const handelUpdateBookkeeping = async (name: string) => {
    const isCurrent = me?.currentBookkeeping?.id === item.id;

    try {
      await updateBookkeeping(me!.id, item.id, name);
      if (isCurrent) {
        setCurrentBookkeeping(me!.id, item.id, name);
        dispatch(
          setMeSlice({
            me: {
              ...me!,
              currentBookkeeping: {
                id: item.id,
                name: name,
              },
            },
          }),
        );
      }
      Alert.alert(t('edit_success'));
    } catch (error) {
      Alert.alert(t('edit_fail'));
    }
  };

  return (
    <>
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
          <View className=" absolute top-[10] right-4  ">
            <Ionicons
              name="settings"
              size={24}
              color="white"
              onPress={() => {
                setModalVisible(true);
              }}
            />
          </View>
          <Text numberOfLines={1} className="mt-10 text-4xl text-white">
            {newName || item?.name || '-'}
          </Text>
          <View className="mb-14">
            <Text className="text-base text-white mb-2">{`${t(
              'account_book_code',
            )}:  ${item.id}`}</Text>
            <Text className="text-base text-white">
              {`${t('create_at')}: ${moment(item.createAt).format(
                'yyyy-MM-DD',
              )}`}
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
      {modalVisible && (
        <CreateModal
          submitTitle={`${t('edit')}`}
          Visible={modalVisible}
          onClose={() => {
            setModalVisible(false);
          }}
          initData={item?.name}
          onPress={(val) => {
            handelUpdateBookkeeping(val);
            setNewName(val);
          }}
        />
      )}
    </>
  );
};

export default BookkeepingItem;
