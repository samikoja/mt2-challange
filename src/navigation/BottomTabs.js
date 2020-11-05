import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useSelector} from 'react-redux';
import {useTheme} from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';
import Settings from '../screens/settings/Settings';
import Location from '../screens/location/Location';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Login from '../screens/login/Login';
import UserTab from './UserTab';

const BottomTabs = () => {
  const {colors} = useTheme();
  const Tab = createBottomTabNavigator();
  const userInfo = useSelector((state) => state.entities.auth);
  const [lang, setLang] = useState('');

  const language = async () => {
    const value = await AsyncStorage.getItem('language');
    setLang(value);
  };

  useEffect(() => {
    language();
  }, []);

  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: colors.text,
        inactiveTintColor: 'gray',
      }}>
      {userInfo.token != '' ? (
        <Tab.Screen
          options={{
            title:
              lang == null ? 'Profile' : lang == 'en' ? 'Profile' : 'الحساب',
            tabBarIcon: ({focused}) => (
              <Icon
                color={focused ? colors.text : 'grey'}
                name="user"
                size={22}
              />
            ),
          }}
          name="UserTab"
          component={UserTab}
        />
      ) : (
        <Tab.Screen
          options={{
            title:
              lang == null ? 'Login' : lang == 'en' ? 'Login' : 'تسجيل دخول',
            tabBarIcon: ({focused}) => (
              <Icon
                color={focused ? colors.text : 'grey'}
                name="user"
                size={22}
              />
            ),
          }}
          name="Login"
          component={Login}
        />
      )}

      <Tab.Screen
        name="Settings"
        options={{
          title: lang == null ? 'Settings' : lang == 'en' ? 'Settings' : 'ضبط',
          tabBarIcon: ({focused}) => (
            <Icon color={focused ? colors.text : 'grey'} name="cog" size={22} />
          ),
        }}
        component={Settings}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({});

export default BottomTabs;
