import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Settings from '../screens/settings/Settings';
import Location from '../screens/location/Location';
import UserDetails from '../screens/userDetails/UserDetails';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {useSelector} from 'react-redux';
import {useTheme} from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';
import Login from '../screens/login/Login';

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
              lang == null
                ? 'Profile'
                : lang == 'en'
                ? 'Profile'
                : lang == 'fr'
                ? 'Profile'
                : 'الحساب',
            tabBarIcon: ({focused}) => (
              <Icon
                color={focused ? colors.text : 'grey'}
                name="user"
                size={22}
              />
            ),
          }}
          name="UserDetails"
          component={UserDetails}
        />
      ) : (
        <Tab.Screen
          options={{
            title:
              lang == null
                ? 'Login'
                : lang == 'en'
                ? 'Login'
                : lang == 'fr'
                ? 'identifier'
                : 'تسجيل دخول',
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
        name="Location"
        options={{
          title:
            lang == null
              ? 'Location'
              : lang == 'en'
              ? 'Location'
              : lang == 'fr'
              ? 'Emplacement'
              : 'موقعك',
          tabBarIcon: ({focused}) => (
            <Icon
              color={focused ? colors.text : 'grey'}
              name="map-marker-alt"
              size={22}
            />
          ),
        }}
        component={Location}
      />

      <Tab.Screen
        name="Settings"
        options={{
          title:
            lang == null
              ? 'Settings'
              : lang == 'en'
              ? 'Settings'
              : lang == 'fr'
              ? 'Réglages'
              : 'ضبط',
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
