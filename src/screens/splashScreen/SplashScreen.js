import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';
import FastImage from 'react-native-fast-image';

const SplashScreen = () => {
  const navigation = useNavigation();
  const [lang, setLang] = useState('');

  const language = async () => {
    const value = await AsyncStorage.getItem('language');
    setLang(value);
  };

  useEffect(() => {
    language();
  }, []);

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#1111',
        justifyContent: 'center',
      }}>
      {/* <Image
        source={{
          uri:
            'https://i.pinimg.com/280x280_RS/46/bd/f5/46bdf53e4a4aa34fb6cb633f857c7588.jpg',
        }}
        style={{
          width: 200,
          height: 100,
          alignSelf: 'center',
          flex: 2,
          borderRadius: 15,
        }}
        resizeMode="contain"
      /> */}
      <View
        style={{
          flex: 2,
          width: 200,
          height: 100,
          borderRadius: 15,
          alignSelf: 'center',
        }}>
        <FastImage
          style={{
            width: '100%',
            height: '100%',
            borderRadius: 20,
          }}
          source={{
            uri:
              'https://i.pinimg.com/280x280_RS/46/bd/f5/46bdf53e4a4aa34fb6cb633f857c7588.jpg',
            priority: FastImage.priority.normal,
          }}
          resizeMode={FastImage.resizeMode.contain}
        />
      </View>

      <View style={{flex: 1, justifyContent: 'center'}}>
        <TouchableOpacity onPress={() => navigation.navigate('Main')}>
          <View
            style={{
              backgroundColor: 'rgba(242, 181, 116, 0.6)',
              width: 170,
              paddingVertical: 18,
              alignItems: 'center',
              borderRadius: 30,
            }}>
            <Text style={{fontWeight: 'bold', fontSize: 18}}>
              {lang == null ? 'Login' : lang == 'en' ? 'Login' : 'دخول'}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({});
