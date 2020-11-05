import React, {useState, useEffect, useRef} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  SafeAreaView,
  Dimensions,
  TouchableWithoutFeedback,
  ActivityIndicator,
} from 'react-native';
import Global from '../../utils/Global';
import AsyncStorage from '@react-native-community/async-storage';
import {useNavigation, useTheme} from '@react-navigation/native';
import FastImage from 'react-native-fast-image';
import {useSelector, useDispatch} from 'react-redux';
import {login} from '../../store/Authontication';
import i18n from 'i18next';
import Header from '../../components/Header';

export default function Login() {
  const {colors} = useTheme();
  const navigation = useNavigation();
  const [username, setUsername] = useState('sami.k');
  const [password, setPassword] = useState('sami@123');
  const [loading, setLoading] = useState(false);
  const unmounted = useRef(false);
  const dispatch = useDispatch();
  const {height, width} = Dimensions.get('window');

  const styles = StyleSheet.create({
    inputContainer: {
      alignItems: 'center',
      marginTop: 10,
    },
    inputs: {
      borderWidth: 1.5,
      borderColor: 'orange',
      height: 50,
      width: Dimensions.get('window').width - 40,
      marginVertical: 10,
      paddingLeft: 10,
      backgroundColor: '#fff',
      borderRadius: 15,
    },
    loginButton: {
      alignItems: 'center',
      backgroundColor: colors.card,
      height: 50,
      width: Dimensions.get('window').width - 40,
      justifyContent: 'center',
      borderRadius: 15,
    },
    buttonLoginText: {
      color: colors.text,
      fontWeight: 'bold',
      fontSize: 15,
    },
    signupContainer: {
      alignItems: 'flex-start',
      paddingLeft: 20,
    },
    signuptext: {
      fontWeight: 'bold',
      fontSize: 15,
      marginRight: 20,
      marginTop: 15,
      color: colors.text,
    },
  });

  const storeData = async (key, value) => {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (error) {
      alert('error ', error);
    }
  };

  useEffect(() => {
    return () => {
      unmounted.current = true;
    };
  }, []);

  const handleLogin = async () => {
    if (username.trim() == '' || password.trim() == '') {
      alert('All fields are required');
    } else {
      setLoading(true);
      try {
        const response = await fetch(
          `${Global.apiURL}/login?username=${username}&password=${password}`,
          {
            headers: {
              'X-Parse-Application-Id': Global.appID,
              Authorization: 'application/json',
            },
          },
        );
        const result = await response.json();

        if (result.error) {
          setLoading(false);
          alert(result.error);
        } else {
          dispatch(
            login({
              token: result.sessionToken,
              username: result.username,
              email: result.email,
              name: result.name,
            }),
          );
          storeData('token', result.sessionToken);
          storeData('username', result.username);
          storeData('password', password);
        }
        setLoading(false);
      } catch (err) {
        console.log('error', err);
      }
    }
  };
  return (
    <>
      <SafeAreaView style={{backgroundColor: colors.card, flex: 0}} />
      <Header title={i18n.t('login')} arrow={false} />
      <ScrollView>
        <View style={{alignItems: 'center', marginTop: 15}}>
          <FastImage
            style={{width: 200, height: 200, borderRadius: 20}}
            source={{
              uri:
                'https://i.pinimg.com/280x280_RS/46/bd/f5/46bdf53e4a4aa34fb6cb633f857c7588.jpg',
              priority: FastImage.priority.normal,
            }}
            resizeMode={FastImage.resizeMode.contain}
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Username"
            autoCapitalize="none"
            value={username}
            onChangeText={(text) => setUsername(text)}
            style={styles.inputs}
          />
          <TextInput
            placeholder="Password"
            autoCapitalize="none"
            secureTextEntry
            value={password}
            onChangeText={(text) => setPassword(text)}
            style={styles.inputs}
          />
        </View>
        <View style={{alignItems: 'center'}}>
          <TouchableWithoutFeedback onPress={() => handleLogin()}>
            <View style={styles.loginButton}>
              <Text style={styles.buttonLoginText}>{i18n.t('login')}</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
        <TouchableWithoutFeedback onPress={() => navigation.navigate('Signup')}>
          <View style={styles.signupContainer}>
            <Text style={styles.signuptext}>{i18n.t('sign_up_desc')}</Text>
            <Text style={styles.signuptext}>{i18n.t('sign_up')}</Text>
          </View>
        </TouchableWithoutFeedback>
      </ScrollView>
      {loading ? (
        <View
          style={{
            width: width,
            height: height,
            backgroundColor: 'rgba(0, 0, 0, 0.4)',
            position: 'absolute',
            zIndex: 100,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <ActivityIndicator size="large" color={colors.card} />
        </View>
      ) : null}
    </>
  );
}
