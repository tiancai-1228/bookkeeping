import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Calendar } from 'react-native-calendars';
import Modal from 'react-native-modal';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Button } from '@rneui/themed';
import { t } from 'i18next';
import moment from 'moment';

interface Prop {
  Visible: boolean;
  onClose: () => void;
  onPress: (year: string, month: string) => void;
}

const CalendarModal = ({ Visible, onClose, onPress }: Prop) => {
  const [currDate, setNewYear] = useState(new Date());
  return (
    <Modal
      testID={'modal'}
      isVisible={Visible}
      backdropColor=""
      backdropOpacity={0.8}
      animationIn="fadeInDown"
      animationOut="fadeOutUp"
      animationInTiming={400}
      animationOutTiming={400}
      onBackdropPress={onClose}
      style={{ margin: 0, alignItems: 'center' }}
    >
      <View className="bg-[#404040] border-2 border-[#fff] p-1  w-[80%] absolute top-[20%] rounded-lg">
        <Calendar
          monthFormat={'yyyy-MM'}
          onDayPress={(day) => {
            console.log(moment().format('yyyy-MM-DD'));
            // setNewYear(`${day.year}-${day.month}-${day.day}`);
          }}
          theme={{
            backgroundColor: '#404040',
            calendarBackground: '#404040',
            textSectionTitleColor: '#d9e1e8',
            textSectionTitleDisabledColor: '#d9e1e8',
            selectedDayBackgroundColor: '#00adf5',
            selectedDayTextColor: '#2d4150',
            todayTextColor: '#00adf5',
            dayTextColor: '#fff',
            textDisabledColor: '#404040',
            dotColor: '#00adf5',
            selectedDotColor: '#ffffff',
            arrowColor: 'orange',
            disabledArrowColor: '#d9e1e8',
            monthTextColor: '#ffffff',
            indicatorColor: 'blue',
          }}
          markedDates={{
            currDate: {
              selected: true,
              marked: true,
              selectedColor: 'blue',
            },
          }}
        />

        <View className="flex-row flex-wrap mt-1  justify-around mb-4">
          <Button
            containerStyle={{ marginTop: 10 }}
            title={`${t('confirm')}`}
            style={{ width: 200 }}
            color={'#39C1B6'}
            onPress={() => {
              // onPress(newYear.toString(), newMonth.toString());
              onClose();
            }}
          />
        </View>
      </View>
    </Modal>
  );
};

export default CalendarModal;
