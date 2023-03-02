import React, { useState } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Ionicons } from '@expo/vector-icons';
import CalculatorButton from './Calculator.Button';

interface Prop {
  onPress: (count: number, memo: string) => void;
}

const Calculator = ({ onPress }: Prop) => {
  const [count, setCount] = useState<string>('0');
  const [memo, setMemo] = React.useState('');
  const { t } = useTranslation();

  const pluse = (count: string) => {
    setCount((pre) => pre + count);
  };
  return (
    <View className="bg-[#404040] h-full">
      <View className="flex-row items-center mt-2">
        <Text className="text-xl text-white w-[20%] pl-2">{t('amount')} :</Text>

        <Text className="text-2xl text-white w-[80%] pr-2 text-right">
          $ {count}
        </Text>
      </View>
      <View className="flex-row items-center mt-1">
        <Text className="text-xl text-white w-[20%] pl-2">{t('memo')} :</Text>

        <View className="text-xl text-white w-[80%] pr-2 text-right border-b border-gray-600 ">
          <TextInput
            className=" w-full h-10 text-right text-white text-xl"
            onChangeText={(s) => {
              setMemo(s);
            }}
            value={memo}
          />
        </View>
      </View>

      <View className="flex-row justify-around">
        <View className="justify-around mt-1">
          <CalculatorButton
            title="7"
            onPress={() => {
              pluse('7');
            }}
          />
          <CalculatorButton
            title="4"
            onPress={() => {
              pluse('4');
            }}
          />
          <CalculatorButton
            title="1"
            onPress={() => {
              pluse('1');
            }}
          />
          <CalculatorButton
            title="00"
            onPress={() => {
              pluse('00');
            }}
          />
        </View>
        <View className="justify-around mt-2">
          <CalculatorButton
            title="8"
            onPress={() => {
              pluse('8');
            }}
          />
          <CalculatorButton
            title="5"
            onPress={() => {
              pluse('5');
            }}
          />
          <CalculatorButton
            title="2"
            onPress={() => {
              pluse('2');
            }}
          />
          <CalculatorButton
            title="0"
            onPress={() => {
              pluse('0');
            }}
          />
        </View>
        <View className="justify-around mt-2">
          <CalculatorButton
            title="9"
            onPress={() => {
              pluse('9');
            }}
          />
          <CalculatorButton
            title="6"
            onPress={() => {
              pluse('6');
            }}
          />
          <CalculatorButton
            title="3"
            onPress={() => {
              pluse('3');
            }}
          />
          <CalculatorButton
            title="."
            onPress={() => {
              pluse('.');
            }}
          />
        </View>

        <View className="mt-2  items-center">
          <CalculatorButton
            title="AC"
            color="#3dc4b4"
            onPress={() => {
              setCount('0');
            }}
          />
          <CalculatorButton
            title=""
            color="#3dc4b4"
            icon={<Ionicons name="arrow-back" size={24} color="black" />}
            onPress={() => {
              setCount((pre) => pre.slice(0, -1));
            }}
          />
          <TouchableOpacity
            onPress={() => {
              const s = count || '0';
              onPress(parseFloat(s), memo);
            }}
            className="w-16 h-[88px] mt-2 bg-[#39C1B6] rounded-md justify-center items-center"
          >
            <Text className="font-bold"> {t('submit')}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Calculator;
