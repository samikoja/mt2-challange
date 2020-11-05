import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import Login from '../screens/login/Login';
import Signup from '../screens/signUp/SignUp';

export default function Auth() {
  const Auth = createStackNavigator();
  return (
    <Auth.Navigator>
      <Auth.Screen name="Login" component={Login} />
      <Auth.Screen name="Signup" component={Signup} />
    </Auth.Navigator>
  );
}

const styles = StyleSheet.create({});
