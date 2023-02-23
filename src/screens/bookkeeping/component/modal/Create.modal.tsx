import React, { useState } from 'react';
import { Text, TextInput, View } from 'react-native';
import Modal from 'react-native-modal';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/rootSlices';
import { bookkeeping } from '@/type/bookkeeping';
import { createBookkeeping } from '@/firebase/set/bookkeeping';
import { Button } from '@rneui/themed';
import { t } from 'i18next';

interface Props {
  Visible: boolean;
  onClose: () => void;
  onCreated?: (value: bookkeeping | null) => void;
}

const CreateModal = ({ Visible, onClose, onCreated }: Props) => {
  const { me } = useSelector((state: RootState) => state.account.value);
  const [inputData, setInputData] = useState('');

  const handelCreateBookkeeping = async (name: string) => {
    const res = await createBookkeeping(me!.id, name);
    setInputData('');
    onCreated?.(res);
    onClose();
  };

  return (
    <Modal
      testID={'modal'}
      isVisible={Visible}
      backdropColor=""
      backdropOpacity={0.8}
      animationIn="fadeInUp"
      animationOut="fadeOutDown"
      animationInTiming={400}
      animationOutTiming={400}
      onBackdropPress={onClose}
      style={{ margin: 0, alignItems: 'center', justifyContent: 'center' }}
    >
      <View className={`w-[80%]  bg-[#404040]  rounded-lg  items-center py-4`}>
        <View className="w-full">
          <Text className="text-white mb-2 ml-2 text-base text-left">
            {t('account_book_name')}
          </Text>
        </View>
        <TextInput
          editable
          numberOfLines={4}
          maxLength={40}
          onChangeText={(text) => setInputData(text)}
          value={inputData}
          style={{
            width: '90%',
            borderWidth: 1,
            borderColor: 'white',
            marginBottom: 12,
            height: 40,
            padding: 6,
            color: 'white',
            fontSize: 18,
          }}
        />
        <Button
          title={`${t('add')}`}
          style={{ width: 200 }}
          color={'#39C1B6'}
          onPress={() => {
            handelCreateBookkeeping(inputData);
          }}
        />
      </View>
    </Modal>
  );
};

export default CreateModal;
