import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  PermissionsAndroid,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {useTheme} from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';
import ImagePicker from 'react-native-image-picker';
import {logout} from '../../store/Authontication';
import Header from '../../components/Header';
import FastImage from 'react-native-fast-image';

export default function UserDetails() {
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.entities.auth);
  const {colors} = useTheme();
  const [lang, setLang] = useState('en');
  const [image, setImage] = useState(
    'https://www.kindpng.com/picc/m/24-248253_user-profile-default-image-png-clipart-png-download.png',
  );

  const styles = StyleSheet.create({
    text: {
      fontSize: 18,
      fontWeight: 'bold',
      color: colors.text,
      flex: 1,
    },
    subtext: {
      fontSize: 18,
      fontWeight: '500',
      color: colors.text,
      flex: 2,
    },
    logoutButton: {
      padding: 5,
      width: '100%',
      alignItems: 'center',
      borderRadius: 10,
      marginTop: 20,
      height: 40,
      justifyContent: 'center',
    },
    logoutButtonText: {
      color: '#fff',
      fontWeight: '700',
    },
    imageContainer: {
      overflow: 'hidden',
      width: 100,
      height: 100,
      borderWidth: 1,
      borderColor: 'black',
      borderRadius: 100,
      alignSelf: 'center',
    },
    infocard: {
      backgroundColor: colors.card,
      borderRadius: 15,
      flexDirection: 'row',
      paddingVertical: 15,
      paddingHorizontal: 10,
      alignItems: 'center',
      marginTop: 15,
    },
  });

  const language = async () => {
    const value = await AsyncStorage.getItem('language');
    setLang(value);
  };

  useEffect(() => {
    language();
  }, []);

  const options = {
    title: 'Select Photo',
    storageOptions: {
      skipBackup: true,
      path: 'images',
    },
  };

  const cameraPicker = async () => {
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: 'We need your permission',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the camera');
      }
    }

    ImagePicker.showImagePicker(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const source = {uri: 'data:image/jpeg;base64,' + response.data};
        setImage(source.uri);
      }
    });
  };

  const onLogout = () => {
    dispatch(dispatch(logout()));
  };

  return (
    <>
      <SafeAreaView backgroundColor={colors.card} />
      <Header
        title={lang == null || lang == 'en' ? 'Profile' : 'الصفحة الشخصية'}
        arrow={false}
        logout={true}
        onLogout={onLogout}
      />
      <View style={{paddingHorizontal: 10}}>
        <View style={{alignSelf: 'center', marginTop: 20}}>
          <View style={styles.imageContainer}>
            <FastImage
              style={{width: '100%', height: '100%'}}
              source={{
                uri: image,
                priority: FastImage.priority.normal,
              }}
              resizeMode={FastImage.resizeMode.cover}
            />
          </View>
          <TouchableOpacity onPress={() => cameraPicker()}>
            <View
              style={{
                backgroundColor: colors.card,
                width: 150,
                height: 49,
                borderRadius: 12,
                justifyContent: 'center',
                alignItems: 'center',
                alignSelf: 'center',
                marginTop: 15,
              }}>
              <Text style={{color: colors.text}}>
                {lang == null || lang == 'en' ? 'Choose an image' : 'اختر صورة'}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={{marginTop: 15}}>
          <View style={styles.infocard}>
            <Text style={styles.text}>Name</Text>
            <Text style={styles.subtext}>{userInfo.name}</Text>
          </View>
          <View style={styles.infocard}>
            <Text style={styles.text}>User Name</Text>
            <Text style={styles.subtext}>{userInfo.username}</Text>
          </View>
          <View style={styles.infocard}>
            <Text style={styles.text}>Email</Text>
            <Text style={styles.subtext}>{userInfo.email}</Text>
          </View>
        </View>
      </View>
    </>
  );
}
