import React from 'react';
import { Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { LanguageDropdown } from '@/components/select/Language.select';

const SettingScreen = () => {
  const { t } = useTranslation();
  return (
    <View className="flex-1 p-4">
      <Text className="text-[#fff]">{t('language')}</Text>
      <LanguageDropdown />
    </View>
  );
};

export default SettingScreen;
