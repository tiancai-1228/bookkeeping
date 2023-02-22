import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/rootSlices';
import { income } from '@/firebase/set/bookkeeping';
import { Button } from '@rneui/themed';

const IncomeView = () => {
  const { googleToken, me } = useSelector(
    (state: RootState) => state.account.value,
  );
  return (
    <View>
      <Text>IncomeView</Text>
      <Button
        title={`income `}
        style={{ width: 200, marginTop: 20 }}
        color={'#39C1B6'}
        onPress={() => {
          income(me!.id, '-NOhmbm3QkkOh77PFsRS', 200);
        }}
      />
    </View>
  );
};

export default IncomeView;

const styles = StyleSheet.create({});
