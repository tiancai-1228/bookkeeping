import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Image,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/rootSlices';
import { logout } from '@/utils/auth';
import { Entypo } from '@expo/vector-icons';
import { Button } from '@rneui/themed';
import ExpandList from './component/ExpandList';

const AccountScreen = () => {
  const [expanded, setExpanded] = useState(false);
  const animatedHeight = useRef(new Animated.Value(0)).current;

  const { googleToken, me } = useSelector(
    (state: RootState) => state.account.value,
  );
  const { t } = useTranslation();

  const expandedAnimated = () => {
    Animated.timing(animatedHeight, {
      toValue: 100,
      duration: 200,
      useNativeDriver: false,
    }).start();
  };

  return (
    <View className={`w-[80%]  bg-[#404040]  rounded-lg  items-center`}>
      <View className="w-[80px] h-[80px] rounded-full mt-[-40px] mb-1 border-[4px] border-black">
        {me?.picture && (
          <Image
            source={{ uri: me!.picture }}
            className="w-[100%] h-[100%] rounded-full"
          />
        )}
      </View>
      <Text className="text-[#fff] text-2xl mb-1">{me?.name || '-'}</Text>
      <Text className="text-[#fff] text-lg mb-3">{me?.email || '-'}</Text>

      {expanded && (
        <Animated.View
          className={` mb-3 w-full justify-start items-center truncate`}
          style={{ height: animatedHeight }}
        >
          <ExpandList />
        </Animated.View>
      )}

      <Button
        title={`${t('logout')}`}
        style={{ width: 200, marginBottom: expanded ? 20 : 4 }}
        color={'#39C1B6'}
        onPress={() => {
          googleToken && logout(googleToken);
        }}
      />

      {!expanded && (
        <TouchableWithoutFeedback
          onPress={() => {
            setExpanded(!expanded);
            expandedAnimated();
          }}
        >
          <Entypo name="chevron-small-down" size={30} color="#fff" />
        </TouchableWithoutFeedback>
      )}
    </View>
  );
};

export default AccountScreen;
