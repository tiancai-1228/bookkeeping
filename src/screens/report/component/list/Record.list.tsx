import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { RecordData } from '@/type/report';
import RecordItem from '../item/Record.item';

interface Prop {
  data: RecordData[];
}

const RecordList = ({ data }: Prop) => {
  return (
    <View className="flex-1">
      <ScrollView className="mb-[100px]">
        {data.length !== 0 &&
          data.map((el, index) => {
            return <RecordItem item={el} key={el.name} index={index} />;
          })}
      </ScrollView>
    </View>
  );
};

export default RecordList;
