import React, { useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { enumViewType } from '@/type/common';
import { Feather } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface Prop {
  type: enumViewType;
  onPress: () => void;
}

const HeaderRightButton = ({ type, onPress }: Prop) => {
  return (
    <View className="mr-2">
      <TouchableOpacity
        className="w-[40px] h-[40px]  rounded-full "
        onPress={onPress}
      >
        {type === enumViewType.Month && (
          <Feather name="calendar" size={30} color="white" />
        )}
        {type === enumViewType.Calendar && (
          <MaterialCommunityIcons
            name="playlist-edit"
            size={40}
            color="white"
          />
        )}
      </TouchableOpacity>
    </View>
  );
};

export default HeaderRightButton;
