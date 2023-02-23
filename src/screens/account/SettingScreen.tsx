import React from 'react';
import { Text, View } from 'react-native';
import { LanguageDropdown } from '@/components/select/Language.select';
import { t } from 'i18next';

const SettingScreen = () => {
  return (
    <View className="flex-1 p-4">
      <Text className="text-[#fff]">{t('language')}</Text>
      <LanguageDropdown />
    </View>
  );
};

export default SettingScreen;
