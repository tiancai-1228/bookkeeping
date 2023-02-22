import React, { useState } from 'react';
import { Image, TouchableOpacity, View } from 'react-native';
import Modal from 'react-native-modal';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/rootSlices';
import AccountScreen from '@/screens/account/AccountScreen';

const HeaderLeftButton = () => {
  const { me } = useSelector((state: RootState) => state.account.value);

  const [isModalVisible, setModalVisible] = useState(false);

  return (
    <View className="ml-4">
      <TouchableOpacity
        onPress={() => setModalVisible(true)}
        className="w-[40px] h-[40px]  rounded-full "
      >
        {me?.picture && (
          <Image
            source={{ uri: me!.picture }}
            className="w-[100%] h-[100%] rounded-full "
          />
        )}
      </TouchableOpacity>

      <Modal
        testID={'modal'}
        isVisible={isModalVisible}
        backdropColor=""
        backdropOpacity={0.8}
        animationIn="fadeInUp"
        animationOut="fadeOutDown"
        animationInTiming={400}
        animationOutTiming={400}
        onBackdropPress={() => setModalVisible(false)}
        style={{ margin: 0, alignItems: 'center', justifyContent: 'center' }}
      >
        <AccountScreen />
      </Modal>
    </View>
  );
};

export default HeaderLeftButton;
