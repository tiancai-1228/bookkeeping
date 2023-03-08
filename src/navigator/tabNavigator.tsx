import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/rootSlices';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';
import HeaderLeftButton from '@/components/button/HeaderLeft.button';
import BookkeepingBaseScreen from '@/screens/bookkeeping/BookkeepingBaseScreen';
import HomeScreen from '@/screens/Home/HomeScreen';
import ReportScreen from '@/screens/report/ReportScreen';
import { AntDesign } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { ScreenProp } from './main.stack';

export type BottomTabParamList = {
  BottomTab: { screen: 'Home' | 'create' | 'Report' };
  create: { Id: string; title: string };
};

const Tab = createBottomTabNavigator();

const tabOptions = (title?: string, onClick?: () => void) => {
  return {
    headerShown: true,
    headerTitle: () => (
      <TouchableOpacity onPress={onClick}>
        <Text className="text-white font-bold text-xl">{title}</Text>
      </TouchableOpacity>
    ),
    headerTintColor: '#fff',
    headerStyle: {
      backgroundColor: '#252525',
      shadowColor: 'transparent',
      elevation: 0,
    },
  };
};

const TabNavigator = () => {
  const { t } = useTranslation();

  const { me } = useSelector((state: RootState) => state.account.value);

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
            ...tabOptions(`${me?.currentBookkeeping?.name || '-'}`, () => {
              navigation.navigate('BookkeepingDetail');
            }),
            headerLeft: () => <HeaderLeftButton />,
            tabBarIcon: ({ focused }: { focused: boolean }) => (
              <View className={`${focused ? 'mb-2' : ''}`}>
                <Entypo
                  name="pencil"
                  size={24}
                  color={focused ? '#39C1B6' : '#fff'}
                />
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
              navigation.navigate('Bookkeeping', {
                type: 'expenses',
              });
            },
          })}
          options={() => ({
            ...tabOptions(),
            tabBarItemStyle: {
              backgroundColor: '#39C1B6',
              borderRadius: 50,
              marginTop: -20,
              marginBottom: 4,
              borderWidth: 4,
              borderColor: '#252525',
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
                <FontAwesome
                  name="bar-chart-o"
                  size={24}
                  color={focused ? '#39C1B6' : '#fff'}
                />
              </View>
            ),
          })}
        />
      </Tab.Navigator>
    </>
  );
};

export default TabNavigator;
