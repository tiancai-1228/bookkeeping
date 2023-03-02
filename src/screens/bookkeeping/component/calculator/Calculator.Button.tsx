import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

interface Prop {
  title: string;
  icon?: JSX.Element;
  color?: string;
  onPress: () => void;
}

const CalculatorButton = ({ title, color, icon, onPress }: Prop) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{ backgroundColor: color ? color : 'gray' }}
      className={` w-11 h-11 m-1 rounded-full justify-center items-center border border-white `}
    >
      {icon || <Text className="font-bold text-xl">{title}</Text>}
    </TouchableOpacity>
  );
};

export default CalculatorButton;
