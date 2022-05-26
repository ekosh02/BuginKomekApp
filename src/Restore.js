import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  TouchableOpacity,
} from 'react-native';
import {Colors} from './colors';

export function Restore(props) {
  const backText = 'Назад';
  const restorePasswordText = 'Восстановить пароль';
  const emailText = 'E-mail';
  const sendText = 'Отправить';
  return (
    <View style={styles.shell}>
      <View style={styles.appBarStyle}>
        <Text style={styles.appBarTextStyle}>{restorePasswordText}</Text>
      </View>
      <Image
        style={styles.iconPersonPlusStyle}
        source={require('./../icon/komekIcon.png')}
      />
      <TextInput
        style={styles.textInputStyle}
        placeholder={emailText}></TextInput>

      <Text></Text>
      <TouchableOpacity style={styles.orangeButtonStyle} activeOpacity={0.7}>
        <Text style={styles.loginButtonTextStyle}>{sendText}</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => props.navigation.navigate('Auth')}
        style={styles.whiteOrangeButtonStyle}
        activeOpacity={0.5}>
        <Text style={styles.registrationButtonTextStyle}>{backText}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  shell: {
    backgroundColor: 'white',
    flex: 1,
  },
  appBarStyle: {
    backgroundColor: 'white',
    paddingTop: 40,
    paddingBottom: 30,
  },
  appBarTextStyle: {
    fontSize: 22,
    color: Colors.mainYellow,
    textAlign: 'center',
  },
  textInputStyle: {
    borderColor: Colors.borderColor,
    borderBottomWidth: 2,
    height: 40,
    marginHorizontal: 16,
    marginVertical: 10,
    padding: 10,
    fontSize: 20,
  },

  orangeButtonStyle: {
    backgroundColor: Colors.mainYellow,
    paddingVertical: 16,
    borderRadius: 12,
    marginHorizontal: 30,
    marginVertical: 10,
  },

  whiteOrangeButtonStyle: {
    backgroundColor: Colors.whiteOrange,
    paddingVertical: 16,
    borderRadius: 12,
    marginHorizontal: 30,
    marginVertical: 10,
  },
  registrationButtonTextStyle: {
    fontSize: 22,
    color: Colors.mainYellow,
    textAlign: 'center',
  },

  loginButtonTextStyle: {
    fontSize: 22,
    color: 'white',
    textAlign: 'center',
  },

  iconPersonPlusStyle: {
    position: 'absolute',
    right: 16,
    marginTop: 40,
    width: 28,
    height: 30,
  },
});
