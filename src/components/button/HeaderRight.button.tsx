import React, { useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/rootSlices';
import { Feather } from '@expo/vector-icons';

const HeaderRightButton = () => {
  const { me } = useSelector((state: RootState) => state.account.value);

  return (
    <View className="mr-2">
      <TouchableOpacity className="w-[40px] h-[40px]  rounded-full ">
        <Feather name="calendar" size={30} color="white" />
      </TouchableOpacity>
    </View>
  );
};

export default HeaderRightButton;
