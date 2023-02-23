import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { setAccountModalSlice } from '@/redux/slices/accountSlice';
import { ScreenProp } from '@/navigator/main.stack';
import { useNavigation } from '@react-navigation/native';
import { Foundation } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { t } from 'i18next';
import ExpandButton from './ExpandButton';

const ExpandList = () => {
  const navigation = useNavigation<ScreenProp>();
  const dispatch = useDispatch();
  return (
    <ScrollView className="w-[90%]">
      <View className="mb-2">
        <ExpandButton
          title={t('account_book')}
          icon={<Foundation name="book-bookmark" size={24} color="black" />}
          onPress={() => {
            dispatch(setAccountModalSlice({ accountModal: false }));
            navigation.navigate('BookkeepingDetail');
          }}
        />
      </View>
      <View className="mb-2">
        <ExpandButton
          title={t('setting')}
          icon={<Ionicons name="settings" size={24} color="black" />}
          onPress={() => {
            dispatch(setAccountModalSlice({ accountModal: false }));
            navigation.navigate('Setting');
          }}
        />
      </View>
    </ScrollView>
  );
};

export default ExpandList;
