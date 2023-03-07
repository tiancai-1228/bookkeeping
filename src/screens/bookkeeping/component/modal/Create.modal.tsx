import React, { useState } from 'react';
import { Text, TextInput, View } from 'react-native';
import Modal from 'react-native-modal';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/rootSlices';
import { Button } from '@rneui/themed';
import { t } from 'i18next';

interface Props {
  submitTitle: string;
  Visible: boolean;
  onClose: () => void;
  initData?: string;
  onPress?: (value: string) => void;
}

const CreateModal = ({
  submitTitle,
  Visible,
  initData,
  onClose,
  onPress,
}: Props) => {
  const [inputData, setInputData] = useState(initData || '');

  const handelCreateBookkeeping = async (name: string) => {
    onPress?.(name);
    setInputData('');
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
          title={submitTitle}
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
