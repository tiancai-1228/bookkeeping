import React from 'react';
import { AntDesign } from '@expo/vector-icons';
import { Button } from '@rneui/themed';

interface Prop {
  title: string;
  disabled?: boolean;
  onPress?: () => void;
}

const ExpandButton = ({ title, disabled = false, onPress }: Prop) => {
  return (
    <Button
      title={title}
      disabled={disabled}
      titleStyle={{ fontWeight: '700', color: 'black' }}
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
