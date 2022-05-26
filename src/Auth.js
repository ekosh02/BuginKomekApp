import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import PersonPlus from './../icon/personPlus.svg';
import {Colors} from './colors';
import axios, {Axios} from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Restart from 'react-native-restart';

export function Auth(props) {
  const authText = 'Авторизация';
  const emailText = 'E-mail';
  const passwordText = 'Пароль';
  const forgotPasswordText = 'Зыбыли пароль?';
  const signInText = 'Войти';
  const registrationText = 'Регистрация';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const PopUp = msg =>
    Alert.alert('Ошибка', msg, [
      {
        text: 'OK',
        style: 'default',
      },
    ]);

  const postLogin = async props => {
    setLoading(true);

    if (email && password) {
      try {
        let params = {
          email,
          password,
        };

        console.log('email', email);
        console.log('pass', password);
        const data = await axios.post('login', params);
        console.log('res : ', data.data.success);
        await AsyncStorage.setItem('token', data.data.success.token);

        // const savedToken = await AsyncStorage.getItem('token');
        // console.log('token', savedToken);
        Restart.Restart();
      } catch (e) {
        PopUp('User is not found!');
        console.log('error - ' + e);
        setLoading(false);
      }
    } else {
      PopUp('Введите корректную информацию!');
      setLoading(false);
    }
    setLoading(false);
  };

  return (
    <View style={styles.shell}>
      <View style={styles.appBarStyle}>
        <Text style={styles.appBarTextStyle}>{authText}</Text>
      </View>
      <View style={styles.iconPersonPlusStyle}>
        <PersonPlus />
      </View>
      <TextInput
        style={styles.textInputStyle}
        placeholder={emailText}
        onChangeText={setEmail}
        // value={email.current}
        // onChangeText={text => (email.current = text)}
      ></TextInput>
      <TextInput
        style={styles.textInputStyle}
        placeholder={passwordText}
        onChangeText={setPassword}
        secureTextEntry={true}

        // value={password.current}
        // onChangeText={text => (password.current = text)}
      ></TextInput>

      <TouchableOpacity
        onPress={() => props.navigation.navigate('Restore')}
        activeOpacity={0.5}>
        <Text style={styles.forgorPasswordTextStyle}>{forgotPasswordText}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.orangeButtonStyle}
        activeOpacity={0.7}
        onPress={() => postLogin()}
        loading={loading}
        // onPress={() => props.navigation.replace('Tabs')}
      >
        <Text style={styles.loginButtonTextStyle}>{signInText}</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => props.navigation.navigate('Registration')}
        style={styles.whiteOrangeButtonStyle}
        activeOpacity={0.5}>
        <Text style={styles.registrationButtonTextStyle}>
          {registrationText}
        </Text>
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
  forgorPasswordTextStyle: {
    margin: 15,
    color: Colors.mainYellow,
    fontSize: 18,
    textDecorationLine: 'underline',
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
  loginButtonTextStyle: {
    fontSize: 22,
    color: 'white',
    textAlign: 'center',
  },
  registrationButtonTextStyle: {
    fontSize: 22,
    color: Colors.mainYellow,
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
