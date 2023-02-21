import React from 'react';
import { Text, View } from 'react-native';
import ExpandButton from './ExpandButton';

const ExpandList = () => {
  return (
    <View className="w-[90%]">
      <View className="mb-2">
        <ExpandButton title="test1" />
      </View>
      <View className="mb-2">
        <ExpandButton title="test2" />
      </View>
    </View>
  );
};

export default ExpandList;
