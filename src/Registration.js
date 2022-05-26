import React, {useState, useEffect, useContext} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import PersonPlus from './../icon/personPlus.svg';
import SecurityPassword from './../icon/securityPassword.svg';
import {Colors} from './colors';
import axios, {Axios} from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Restart from 'react-native-restart';
import {GlobalContext} from './context/Context';

export function Registration(props) {
  const registrationText = 'Регистрация';
  const firstNameText = 'Имя';
  const lastNameText = 'Фамилия';
  const phoneNumberText = 'Телефон';
  const emailText = 'E-mail';
  const passwordText = 'Пароль';
  const repeatPasswordText = 'Повторите пароль';
  const registerText = 'Зарегистрироваться';
  const backText = 'Назад';

  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [loading, setLoading] = useState(false);

  const PopUp = msg =>
    Alert.alert('Errors', msg, [
      {
        text: 'OK',
        style: 'default',
      },
    ]);
  const postRegister = async props => {
    setLoading(true);

    if (
      firstName &&
      lastName &&
      email &&
      password &&
      confirmPassword &&
      phone
    ) {
      if (password != confirmPassword) {
        PopUp('Пароли не совпадают');
      } else if (password.length < 8) {
        PopUp('Пароль меньше чем 8 символов');
      } else {
        try {
          let params = {
            first_name: firstName,
            last_name: lastName,
            phone: phone,
            email: email,
            password: password,
            password_confirmation: confirmPassword,
          };

          console.log('params: ', params);

          const data = await axios.post('register', params);
          console.log('Post register:', data);

          setLoading(false);

          Restart;

          navigation.navigate('Auth');
        } catch (e) {
          console.log('Error at registration: ' + e);
          PopUp('Ошибка при регистраций');
          setLoading(false);
        }
      }
    } else {
      PopUp('Введите корректные данные!');
      setLoading(false);
    }
    setLoading(false);
  };

  return (
    <View style={styles.shell}>
      <View style={styles.appBarStyle}>
        <Text style={styles.appBarTextStyle}>{registrationText}</Text>
      </View>
      <Image
        style={styles.iconPersonPlusStyle}
        source={require('./../icon/komekIcon.png')}
      />
      <View style={styles.iconStylesecurityPasswordRegSecond}>
        <SecurityPassword />
      </View>
      <View style={styles.iconStylesecurityPasswordReg}>
        <SecurityPassword />
      </View>
      <TextInput
        style={styles.textInputStyle}
        onChangeText={setFirstName}
        placeholder={firstNameText}></TextInput>
      <TextInput
        style={styles.textInputStyle}
        onChangeText={setLastName}
        placeholder={lastNameText}></TextInput>

      <TextInput
        style={styles.textInputStyle}
        onChangeText={setPhone}
        keyboardType="number-pad"
        placeholder={phoneNumberText}></TextInput>
      <TextInput
        style={styles.textInputStyle}
        onChangeText={setEmail}
        placeholder={emailText}></TextInput>
      <TextInput
        style={styles.textInputStyle}
        placeholder={passwordText}
        onChangeText={setPassword}
        secureTextEntry={true}></TextInput>
      <TextInput
        style={styles.textInputStyle}
        onChangeText={setConfirmPassword}
        placeholder={repeatPasswordText}
        secureTextEntry={true}></TextInput>
      <Text></Text>
      <TouchableOpacity
        style={styles.orangeButtonStyle}
        activeOpacity={0.7}
        onPress={postRegister}>
        <Text style={styles.loginButtonTextStyle}>{registerText}</Text>
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

  iconStylesecurityPasswordReg: {
    marginTop: 295,
    right: 25,
    width: 24,
    height: 24,
    position: 'absolute',
  },
  iconStylesecurityPasswordRegSecond: {
    marginTop: 355,
    right: 25,
    width: 24,
    height: 24,
    position: 'absolute',
  },
});
