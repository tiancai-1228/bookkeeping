import React from 'react';
import { Image, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/rootSlices';

const HeaderRightButton = () => {
  const { me } = useSelector((state: RootState) => state.account.value);

  return (
    <TouchableOpacity
      onPress={() => alert('This is a button!')}
      className="w-[40px] h-[40px]  rounded-full"
    >
      {me?.picture && (
        <Image
          source={{ uri: me!.picture }}
          className="w-[100%] h-[100%] rounded-full"
        />
      )}
    </TouchableOpacity>
  );
};

export default HeaderRightButton;
