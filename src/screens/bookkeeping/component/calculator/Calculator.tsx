import React, { useState } from 'react';
import { Text, TextInput, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import CalendarModal from '@/components/modal/Calendar.modal';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import { Button } from '@rneui/themed';

interface Prop {
  onPress: () => void;
}

const Calculator = ({ onPress }: Prop) => {
  const [visible, setVisible] = useState(false);
  const { t } = useTranslation();
  return (
    <View className="bg-[#404040] h-full">
      <View className="items-center justify-center mt-2">
        <RNDateTimePicker
          textColor="#fff"
          value={new Date()}
          themeVariant="dark"
          style={{
            width: 130,
          }}
        />
      </View>
      <View className="flex-row items-center">
        <Text className="text-2xl text-white w-[20%] pl-2">
          {t('amount')} :
        </Text>
      </View>

      <Button
        title={`expenses `}
        style={{ width: 200, marginTop: 20 }}
        color={'#39C1B6'}
        onPress={() => {
          setVisible(true);
        }}
      />
      <CalendarModal
        Visible={visible}
        onClose={() => {
          setVisible(false);
        }}
        onPress={() => {}}
      />
    </View>
  );
};

export default Calculator;
