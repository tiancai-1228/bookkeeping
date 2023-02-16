import React from 'react';
import { Text, View } from 'react-native';

import { useTranslation } from 'react-i18next';

import { LanguageDropdown } from '@/components/select/Language.select';

const HomeScreen = () => {
  const { t } = useTranslation();

  return (
    <View className="flex-1 justify-center items-center">
      <Text className="mb-6">{t('hollow')}</Text>
      <View className="w-20 h-10 border">
        <LanguageDropdown />
      </View>
    </View>
  );
};

export default HomeScreen;
