import React, {useEffect} from 'react';
import {StyleSheet, Platform, StatusBar} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';
import {useSelector, useDispatch} from 'react-redux';
import {initReactI18next} from 'react-i18next';

import BottomTabs from './BottomTabs';
import Auth from './Auth';
import ChangeTheme from '../screens/changeTheme/ChangeTheme';
import ChangeLanguage from '../screens/changeLanguage/ChangeLanguage';
import DeepLogin from '../screens/deepLogin/DeepLogin';
import SplashScreen from '../screens/splashScreen/SplashScreen';

import {useTheme} from '../utils/Theme';
import Signup from '../screens/signUp/SignUp';
import i18n from 'i18next';
import {BaseSetting} from '../utils/Settings';

export default function Main() {
  const {theme, colors} = useTheme();
  const userInfo = useSelector((state) => state.entities.auth);
  const storeLanguage = useSelector(
    (state) => state.entities.application.storeLanguage,
  );

  const Stack = createStackNavigator();

  useEffect(() => {
    const language = async () => {
      const value = await AsyncStorage.getItem('language');

      i18n.use(initReactI18next).init({
        resources: BaseSetting.resourcesLanguage,
        lng: value != null ? value : storeLanguage,
        fallbackLng: BaseSetting.defaultLanguage,
      });
    };
    if (Platform.OS == 'android') {
      StatusBar.setHidden(true);
    }
    language();
  }, [storeLanguage, theme]);

  const deepLinking = {
    prefixes: ['https://challange.com', 'challange://'],
    config: {
      Home: 'Home',
      DeepLogin: {
        path: 'Login/:username/:password',
        params: {
          username: null,
          password: null,
        },
      },
      ChangeTheme: {
        path: 'ChangeTheme',
      },
    },
  };

  return (
    <NavigationContainer theme={theme} linking={deepLinking}>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="SplashScreen" component={SplashScreen} />
        <Stack.Screen name="Main" component={BottomTabs} />
        <Stack.Screen name="ChangeTheme" component={ChangeTheme} />
        <Stack.Screen name="ChangeLanguage" component={ChangeLanguage} />
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="DeepLogin" component={DeepLogin} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({});
