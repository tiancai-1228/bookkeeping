import React from 'react';
import { Text, View } from 'react-native';
import { record, recordType } from '@/type/bookkeeping';

interface Prop {
  data: { list: record[]; total: number };
  type: recordType;
}

const RecordView = ({ data, type }: Prop) => {
  return (
    <View>
      <Text>IncomeChart</Text>
    </View>
  );
};

export default RecordView;
