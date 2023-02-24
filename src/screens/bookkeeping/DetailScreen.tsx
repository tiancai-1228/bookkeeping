import React, { useEffect, useLayoutEffect, useState } from 'react';
import { Alert, Animated, Dimensions, ScrollView, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/rootSlices';
import { setMeSlice } from '@/redux/slices/accountSlice';
import { ScreenProp } from '@/navigator/main.stack';
import { useNavigation } from '@react-navigation/native';
import { bookkeeping } from '@/type/bookkeeping';
import { getBookkeepingList } from '@/firebase/get/bookkeeping';
import { setCurrentBookkeeping } from '@/firebase/set/account';
import { deleteBookkeeping } from '@/firebase/set/bookkeeping';
import { AntDesign } from '@expo/vector-icons';
import { t } from 'i18next';
import BookkeepingItem from './component/item/bookkeeping.item';
import CreateModal from './component/modal/Create.modal';

const DetailScreen = () => {
  const navigation = useNavigation<ScreenProp>();
  const [modalVisible, setModalVisible] = useState(false);
  const [list, setList] = useState<bookkeeping[]>([]);
  const { me } = useSelector((state: RootState) => state.account.value);
  const dispatch = useDispatch();
  const scrollX = React.useRef(new Animated.Value(0)).current;

  const OFFSET = 40;
  const ITEM_WIDTH = Dimensions.get('window').width - OFFSET * 2;
  const ITEM_HEIGHT = 450;

  const fetchBookkeepingList = async () => {
    const BookkeepingList = await getBookkeepingList(me!.id);
    setList(BookkeepingList);
  };

  const handelDeleteBookkeeping = async (id: string, bookkeepingId: string) => {
    try {
      const res = await deleteBookkeeping(me!.id, bookkeepingId);
      res && setList((pre) => pre.filter((el) => el.id != bookkeepingId));

      Alert.alert(t('delete_success'));
    } catch (error) {
      Alert.alert(t('delete_fail'));
    }
  };

  const handelChangeBookkeeping = async (
    id: string,
    bookkeepingId: string,
    bookkeepingName: string,
  ) => {
    try {
      setCurrentBookkeeping(me!.id, bookkeepingId, bookkeepingName);
      dispatch(
        setMeSlice({
          me: {
            ...me!,
            currentBookkeeping: { id: bookkeepingId, name: bookkeepingName },
          },
        }),
      );
      Alert.alert(t('switch_success'));
    } catch (error) {
      Alert.alert(t('switch_fail'));
    }
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <AntDesign
          name="plus"
          size={25}
          color="white"
          onPress={() => {
            setModalVisible(true);
          }}
        />
      ),
    });
  }, []);

  useEffect(() => {
    fetchBookkeepingList();
  }, []);

  return (
    <View className="flex-1 justify-center">
      <View className="">
        <ScrollView
          horizontal={true}
          decelerationRate={'normal'}
          snapToInterval={ITEM_WIDTH}
          bounces={false}
          showsHorizontalScrollIndicator={false}
          scrollEventThrottle={12}
          disableIntervalMomentum
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            { useNativeDriver: false },
          )}
          style={{ paddingTop: 80, paddingBottom: 20 }}
        >
          {list.map((item, idx) => {
            const inputRange = [
              (idx - 1) * ITEM_WIDTH,
              idx * ITEM_WIDTH,
              (idx + 1) * ITEM_WIDTH,
            ];

            const translate = scrollX.interpolate({
              inputRange,
              outputRange: [0.85, 1, 0.85],
            });

            const opacity = scrollX.interpolate({
              inputRange,
              outputRange: [0.5, 1, 0.5],
            });

            return (
              <BookkeepingItem
                key={item.id}
                item={item}
                list={list}
                OFFSET={OFFSET}
                ITEM_WIDTH={ITEM_WIDTH}
                ITEM_HEIGHT={ITEM_HEIGHT}
                currentIndex={idx}
                opacity={opacity}
                translate={translate}
                onDelete={() => {
                  handelDeleteBookkeeping(me!.id, item.id);
                }}
                onChange={(id, name) => {
                  handelChangeBookkeeping(me!.id, id, name);
                }}
              />
            );
          })}
        </ScrollView>
      </View>

      <CreateModal
        Visible={modalVisible}
        onClose={() => {
          setModalVisible(false);
        }}
        onCreated={(val) => {
          val && setList((pre) => [...pre, val]);
        }}
      />
    </View>
  );
};

export default DetailScreen;
