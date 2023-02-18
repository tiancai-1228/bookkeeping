import React, { useEffect } from 'react';
import { SafeAreaView, Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import * as Google from 'expo-auth-session/providers/google';
import { login } from '@/utils/auth';
import Configs from '@/configs';
import { Button } from '@rneui/themed';

const LoginScreen = () => {
  const { t } = useTranslation();

  const [_, response, promptAsync] = Google.useAuthRequest({
    expoClientId: Configs.ClientId.expo,
    iosClientId: Configs.ClientId.ios,
  });

  const getAuth = async () => {
    if (response?.type === 'success') {
      const { authentication } = response;
      if (!authentication) return;
      login(authentication.accessToken);
    }
  };

  useEffect(() => {
    getAuth();
  }, [response]);

  return (
    <SafeAreaView className="flex-1 h-full items-center relative">
      <View className=" absolute top-[20%]">
        <Text className="text-[#fff]  mb-4 text-4xl font-bold">
          {t('login')}
        </Text>
      </View>

      <View className=" absolute bottom-[20%]">
        <Button
          title={`${t('login')}`}
          style={{ width: 200 }}
          color={'#39C1B6'}
          onPress={() => {
            promptAsync();
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;
