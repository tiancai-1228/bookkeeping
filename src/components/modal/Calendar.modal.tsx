import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { Calendar } from 'react-native-calendars';
import Modal from 'react-native-modal';
import { bookkeepingDate } from '@/type/common';
import { Button } from '@rneui/themed';
import { t } from 'i18next';
import moment from 'moment';

interface Prop {
  Visible: boolean;
  initDate: string;
  onClose: () => void;
  onPress: (date: bookkeepingDate | null) => void;
}

const CalendarModal = ({ Visible, initDate, onClose, onPress }: Prop) => {
  const [markedDates, setMarkedDates] = useState<any>({});
  const [selectedDate, setSelectedDate] = useState<bookkeepingDate | null>(
    null,
  );

  const getSelectedDayEvents = (date: string) => {
    let markedDates: any = {};
    markedDates[date] = {
      selected: true,
      color: '#00B0BF',
      textColor: '#FFFFFF',
    };
    const selectDate = {
      year: moment(date).format('yyyy'),
      month: moment(date).format('MM'),
      date: moment(date).format('DD'),
    };
    setSelectedDate(selectDate);
    setMarkedDates(markedDates);
  };

  useEffect(() => {
    getSelectedDayEvents(initDate);
  }, []);

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
      <View className="bg-[#404040] border-2 border-[#fff] p-1  w-[80%] absolute top-[30%] rounded-lg">
        <Calendar
          monthFormat={'yyyy-MM'}
          onDayPress={(day) => {
            getSelectedDayEvents(day.dateString);
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
            textDisabledColor: 'gray',
            dotColor: '#00adf5',
            selectedDotColor: '#ffffff',
            arrowColor: 'orange',
            disabledArrowColor: '#d9e1e8',
            monthTextColor: '#ffffff',
          }}
          markedDates={markedDates}
        />

        <View className="flex-row flex-wrap mt-1  justify-around mb-4">
          <Button
            containerStyle={{ marginTop: 10 }}
            title={`${t('confirm')}`}
            style={{ width: 200 }}
            color={'#39C1B6'}
            onPress={() => {
              onPress(selectedDate);
              onClose();
            }}
          />
        </View>
      </View>
    </Modal>
  );
};

export default CalendarModal;
