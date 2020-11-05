import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useTheme} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {languageFromCode, languageLogo} from '../utils/Settings';

const LanguageComponent = ({item, checkedLanguage, setCheckedLanguage}) => {
  const {colors} = useTheme();

  return (
    <TouchableOpacity onPress={() => setCheckedLanguage(item)}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          borderBottomWidth: 1,
          borderBottomColor: 'lightgrey',
          paddingBottom: 10,
          paddingTop: 10,
        }}>
        <View style={{flexDirection: 'row'}}>
          <View
            style={{
              backgroundColor: colors.card,
              width: 30,
              height: 30,
              borderRadius: 100,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text style={{color: colors.text, fontWeight: 'bold'}}>
              {languageLogo(item)}
            </Text>
          </View>
          <Text style={{marginLeft: 10, fontSize: 16, color: colors.text}}>
            {languageFromCode(item)}
          </Text>
        </View>
        <View style={{justifyContent: 'center'}}>
          {checkedLanguage == item ? (
            <Icon style={{color: colors.text}} name="check" size={20} />
          ) : null}
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default LanguageComponent;

const styles = StyleSheet.create({});
