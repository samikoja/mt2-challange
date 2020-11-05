import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import UserDetails from '../screens/userDetails/UserDetails';
import Location from '../screens/location/Location';

const UserTab = () => {
  const UserTab = createStackNavigator();
  return (
    <UserTab.Navigator>
      <UserTab.Screen
        name="UserDetails"
        component={UserDetails}
        options={{headerShown: false}}
      />
      <UserTab.Screen
        name="Location"
        component={Location}
        options={{headerShown: false}}
      />
    </UserTab.Navigator>
  );
};

export default UserTab;

const styles = StyleSheet.create({});
