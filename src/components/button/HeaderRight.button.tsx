import React from 'react';
import { Text, View } from 'react-native';
import { Button } from '@rneui/themed';

const HeaderRightButton = () => {
  return (
    <Button
      onPress={() => alert('This is a button!')}
      title="Info"
      color="#000"
    />
  );
};

export default HeaderRightButton;
