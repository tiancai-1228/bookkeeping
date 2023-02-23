import React from 'react';
import { View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';
import HeaderLeftButton from '@/components/button/HeaderLeft.button';
import HeaderRightButton from '@/components/button/HeaderRight.button';
import BookkeepingBaseScreen from '@/screens/bookkeeping/BookkeepingBaseScreen';
import HomeScreen from '@/screens/Home/HomeScreen';
import ReportScreen from '@/screens/report/ReportScreen';
import { AntDesign } from '@expo/vector-icons';
import { Icon } from '@rneui/themed';
import { ScreenProp } from './main.stack';

export type BottomTabParamList = {
  BottomTab: { screen: 'Home' | 'create' | 'Report' };
};

const Tab = createBottomTabNavigator();

const tabOptions = () => {
  return {
    headerShown: true,
    title: '',
    headerStyle: {
      backgroundColor: '#000',
      shadowColor: 'transparent',
      elevation: 0,
    },
  };
};

const TabNavigator = () => {
  const { t } = useTranslation();

  const navigation = useNavigation<ScreenProp>();
  return (
    <>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarActiveTintColor: '#39C1B6',
          tabBarInactiveTintColor: '#fff',
          tabBarStyle: {
            backgroundColor: '#404040',
            zIndex: 8,
            position: 'absolute',
            bottom: 40,
            paddingBottom: 0,
            height: 40,
            width: '80%',
            borderRadius: 50,
            left: '10%',
          },
          sceneContainerStyle: {
            position: 'relative',
            left: 10,
          },
          tabBarContentContainerStyle: {
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center',
            borderColor: 'red',
            borderWidth: 1,
          },
          tabBarShowLabel: false,
          animationEnabled: true,
        })}
      >
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={() => ({
            ...tabOptions(),
            headerLeft: () => <HeaderLeftButton />,
            headerRight: () => <HeaderRightButton />,
            tabBarIcon: ({ focused }: { focused: boolean }) => (
              <View className={`${focused ? 'mb-2' : ''}`}>
                <Icon name="home" color={focused ? '#39C1B6' : '#fff'} />
              </View>
            ),
          })}
        />
        <Tab.Screen
          name="create"
          component={BookkeepingBaseScreen}
          listeners={() => ({
            tabPress: (e) => {
              e.preventDefault();
              navigation.navigate('Bookkeeping');
            },
          })}
          options={() => ({
            ...tabOptions(),
            tabBarItemStyle: {
              backgroundColor: '#39C1B6',
              width: 50,
              height: 50,
              borderRadius: 50,
              marginTop: -15,
              borderWidth: 4,
              borderColor: 'black',
            },
            tabBarIcon: () => <AntDesign name="plus" size={24} color="#fff" />,
          })}
        />
        <Tab.Screen
          name="Report"
          component={ReportScreen}
          options={() => ({
            ...tabOptions(),
            headerLeft: () => <HeaderLeftButton />,
            tabBarIcon: ({ focused }: { focused: boolean }) => (
              <View className={`${focused ? 'mb-2' : ''}`}>
                <Icon name="home" color={focused ? '#39C1B6' : '#fff'} />
              </View>
            ),
          })}
        />
      </Tab.Navigator>
    </>
  );
};

export default TabNavigator;