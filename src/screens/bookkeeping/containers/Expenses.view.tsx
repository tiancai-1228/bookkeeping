import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/rootSlices';
import { expenses } from '@/firebase/set/bookkeeping';
import { Button } from '@rneui/themed';

const ExpensesView = () => {
  const { googleToken, me } = useSelector(
    (state: RootState) => state.account.value,
  );
  return (
    <View>
      <Text>ExpensesView</Text>
      <Button
        title={`expenses `}
        style={{ width: 200, marginTop: 20 }}
        color={'#39C1B6'}
        onPress={() => {
          expenses(me!.id, '-NOhmbm3QkkOh77PFsRS', 300);
        }}
      />
    </View>
  );
};

export default ExpensesView;

const styles = StyleSheet.create({});
