import React from 'react';
import { Text, View } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { Button } from '@rneui/themed';

interface Prop {
  title: string;
  icon: React.ReactElement;
  disabled?: boolean;
  onPress?: () => void;
}

const ExpandButton = ({ icon, title, disabled = false, onPress }: Prop) => {
  return (
    <Button
      title={
        <View className="flex-row justify-center items-center">
          {icon}
          <Text className="text-lg font-bold ml-2">{title}</Text>
        </View>
      }
      disabled={disabled}
      color={'#f4f4f4'}
      buttonStyle={{
        borderColor: 'transparent',
        borderWidth: 0,
        borderRadius: 5,
        display: 'flex',
        justifyContent: 'space-between',
      }}
      icon={<AntDesign name="right" size={24} color="black" />}
      iconRight
      iconContainerStyle={{ marginRight: 2 }}
      onPress={onPress}
    />
  );
};

export default ExpandButton;
