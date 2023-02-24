import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import Modal from 'react-native-modal';
import { AntDesign } from '@expo/vector-icons';
import { Button } from '@rneui/themed';
import { t } from 'i18next';

interface Prop {
  Visible: boolean;
  year: string;
  month: string;
  onClose: () => void;
  onPress: (year: string, month: string) => void;
}

const MonthPickerModal = ({ Visible, year, month, onClose, onPress }: Prop) => {
  const [newYear, setNewYear] = useState(parseInt(year));
  const [newMonth, setNewMonth] = useState(parseInt(month));

  const monthNames = [
    t('jan'),
    t('feb'),
    t('mar'),
    t('apr'),
    t('may'),
    t('jun'),
    t('jul'),
    t('aug'),
    t('sept'),
    t('oct'),
    t('nov'),
    t('dec'),
  ];

  return (
    <Modal
      testID={'modal'}
      isVisible={Visible}
      backdropColor="#121212"
      backdropOpacity={0.8}
      animationIn="fadeInDown"
      animationOut="fadeOutUp"
      animationInTiming={400}
      animationOutTiming={400}
      onBackdropPress={onClose}
      style={{ margin: 0, alignItems: 'center' }}
    >
      <View className="bg-[#404040]  h-[340px] w-[80%] absolute top-[16%] rounded-lg">
        <View className="w-full justify-center items-center py-4 flex-row">
          <AntDesign
            name="caretleft"
            size={24}
            color="white"
            onPress={() => {
              setNewYear((pre) => pre - 1);
            }}
          />
          <Text className="text-white text-2xl mx-8">{`${newYear} ${t(
            'year',
          )}`}</Text>
          <AntDesign
            name="caretright"
            size={24}
            color="white"
            onPress={() => {
              setNewYear((pre) => pre + 1);
            }}
          />
        </View>

        <View className="flex-row flex-wrap mt-1  justify-around">
          {monthNames.map((el, index) => (
            <TouchableOpacity
              key={index}
              className={`w-[30%] rounded-lg p-2 justify-center items-center mb-3 bg-slate-400  border-2  ${
                index == newMonth - 1 ? 'border-[#45dac5]' : 'border-white'
              } `}
              onPress={() => {
                setNewMonth(index + 1);
              }}
            >
              <Text
                className={`font-bold  ${
                  index == newMonth - 1 && 'text-[#45dac5]'
                }`}
              >
                {el}
              </Text>
            </TouchableOpacity>
          ))}

          <Button
            containerStyle={{ marginTop: 10 }}
            title={`${t('confirm')}`}
            style={{ width: 200 }}
            color={'#39C1B6'}
            onPress={() => {
              onPress(newYear.toString(), newMonth.toString());
              onClose();
            }}
          />
        </View>
      </View>
    </Modal>
  );
};

export default MonthPickerModal;
