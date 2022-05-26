import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
  Dimensions,
  ScrollView,
  TextInput,
  Alert,
} from 'react-native';

import axios from 'axios';
import {Colors} from './colors';

import Restart from 'react-native-restart';

export const domain = 'https://buginkomek.kz/';
import ArrowLeft from './../icon/arrow_back.svg';

const {width, height} = Dimensions.get('screen');

export function EditUserDetails(props) {
  const [userData, setUserData] = useState();
  const [loading, setLoading] = useState(true);

  const [firstNameState, setFirstNameState] = useState();
  const [lastNameState, setLastNameState] = useState();
  const [phoneNumberState, setPhoneNumberState] = useState();
  const [emailState, setEmailState] = useState();
  const [cityState, setCityState] = useState();

  const PopUp = msg =>
    Alert.alert('', msg, [
      {
        text: 'OK',
        style: 'default',
      },
    ]);

  useEffect(() => {
    getProfile();
  }, []);

  const getProfile = props => {
    axios
      .get('profile/edit')
      .then(res => {
        console.log('profile/edit edit:', res);
        setUserData(res.data.user);
        setSexState(res.data.user.sex);

        setFirstNameState(res.data.user.first_name);
        setLastNameState(res.data.user.last_name);
        setPhoneNumberState(res.data.user.phone);
        setEmailState(res.data.user.email);
        setCityState(res.data.user.city);
        setLoading(false);
      })
      .catch(err => {
        console.log('profile/edit edit: ', err);
      });
  };

  const postEditProfile = () => {
    setLoading(true);

    try {
      let params = {
        first_name: firstNameState,
        last_name: lastNameState,
        phone: phoneNumberState,
        sex: sexState,
        email: emailState,
        city: cityState,
      };
      console.log('sex: ', sexState);
      console.log('edit params: ', params);
      const data = axios.post('profile/update', params);
      console.log('post efit profile', data);
      PopUp('Редактирования успешно завершено');
      props.navigation.goBack();

      // props.navigation.navigate('Tabs');
    } catch (e) {
      console.log('Error at edit profile: ' + e, e?.response);
      PopUp('Ошибка при редактирования данных!!!');
      setLoading(false);
    }
    setLoading(false);
  };

  const text = 'Редактировать';
  const firstName = 'Имя';
  const surName = 'Фамилия';
  const sex = 'Пол';
  const phonehumber = 'Телефон';
  const mail = 'Почта';
  const city = 'Город';
  const changePhoto = 'Сменить фото';
  const save = 'Сохранить измеления';
  const male = 'Мужчина';
  const famale = 'Женщина';

  const [sexState, setSexState] = useState(null);

  if (!userData) return null;

  return (
    <View style={styles.shell}>
      {loading ? (
        <ActivityIndicator visible={loading} textContent={'Loading...'} />
      ) : (
        <>
          <View>
            <TouchableOpacity onPress={() => props.navigation.goBack()}>
              <View style={styles.arrowLeftStyle}>
                <ArrowLeft />
              </View>
            </TouchableOpacity>
            <View style={styles.appBarStyle}>
              <Text style={styles.appBarTextStyle}>{text}</Text>
            </View>
            <View style={styles.imageContainer}>
              <Image
                style={styles.profileImageStyle}
                source={{
                  uri: userData.avatar,
                }}
              />
              <Text></Text>
              <TouchableOpacity>
                <Text style={styles.changePhotoTextStyle}>{changePhoto}</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.containerName}>
              <Text style={styles.nameTextStyles}>{firstName}</Text>
              <TextInput
                style={styles.inputTextStyles}
                value={firstNameState}
                onChangeText={text => setFirstNameState(text)}></TextInput>
            </View>
            <View style={styles.line}></View>
            <View style={styles.containerName}>
              <Text style={styles.nameTextStyles}>{surName}</Text>
              <TextInput
                style={styles.inputTextStyles}
                value={lastNameState}
                onChangeText={text => setLastNameState(text)}></TextInput>
            </View>
            <View style={styles.line}></View>
            <View style={styles.containerName}>
              <Text style={styles.nameTextStyles}>{sex}</Text>
              <View style={styles.rowSexStyle}>
                <TouchableOpacity onPress={() => setSexState('M')}>
                  {sexState == 'M' ? (
                    <View style={styles.sexChoseStyleTab}>
                      <View style={styles.sexChoseStyleTabMini}></View>
                    </View>
                  ) : (
                    <View style={styles.sexChoseStyle}></View>
                  )}
                </TouchableOpacity>
                <Text style={styles.textStyle}>{male}</Text>
                <View style={{paddingHorizontal: 10}}></View>
                <TouchableOpacity onPress={() => setSexState('F')}>
                  {sexState == 'F' ? (
                    <View style={styles.sexChoseStyleTab}>
                      <View style={styles.sexChoseStyleTabMini}></View>
                    </View>
                  ) : (
                    <View style={styles.sexChoseStyle}></View>
                  )}
                </TouchableOpacity>
                <Text style={styles.textStyle}>{famale}</Text>
              </View>
            </View>
            <View style={styles.line}></View>
            <View style={styles.containerName}>
              <Text style={styles.nameTextStyles}>{phonehumber}</Text>
              <TextInput
                style={styles.inputTextStyles}
                value={phoneNumberState}
                onChangeText={text => setPhoneNumberState(text)}></TextInput>
            </View>
            <View style={styles.line}></View>
            <View style={styles.containerName}>
              <Text style={styles.nameTextStyles}>{mail}</Text>
              <TextInput
                style={styles.inputTextStyles}
                value={emailState}
                onChangeText={text => setEmailState(text)}></TextInput>
            </View>
            <View style={styles.line}></View>
            <View style={styles.containerName}>
              <Text style={styles.nameTextStyles}>{city}</Text>
              <TextInput
                style={styles.inputTextStyles}
                value={cityState}
                onChangeText={text => setCityState(text)}></TextInput>
            </View>
            <View style={styles.line}></View>

            <Text></Text>
            <Text></Text>
            <View style={styles.appBarStyle}>
              <TouchableOpacity onPress={postEditProfile}>
                <Text style={styles.changePhotoTextStyle}>{save}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  shell: {
    backgroundColor: 'white',
    flex: 1,
  },
  container: {
    padding: 16,
  },
  textStyle: {
    fontSize: 18,
    color: Colors.mainBlackForText,
  },
  appBarStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 55,
    width: width,
  },
  appBarTextStyle: {
    fontSize: 20,
    color: Colors.mainBlackForText,
  },
  arrowLeftStyle: {
    position: 'absolute',
    top: 18,
    left: 16,
  },
  containerName: {
    flexDirection: 'row',
    width: width - 32,
    left: 16,
    top: 20,
  },
  nameTextStyles: {
    width: width / 3 - 16,
    paddingVertical: 7,
    fontSize: 20,
    color: Colors.mainBlackForText,
  },
  inputTextStyles: {
    width: width / 1.5 - 16,
    paddingVertical: 7,
    fontSize: 20,
    color: Colors.mainBlackForText,
  },
  profileImageStyle: {
    width: 80,
    height: 80,
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  changePhotoTextStyle: {
    fontSize: 18,
    color: Colors.mainYellow,
  },

  line: {
    borderBottomColor: Colors.greyColor,
    borderBottomWidth: 0.9,
    marginTop: 15,
    marginHorizontal: 16,
  },
  sexChoseStyle: {
    right: 10,
    width: 26,
    height: 26,
    borderWidth: 3,

    borderRadius: 13,
    borderColor: Colors.mainYellow,
  },
  sexChoseStyleTab: {
    right: 10,
    width: 26,
    height: 26,
    borderWidth: 3,
    borderRadius: 13,

    backgroundColor: Colors.mainYellow,
    borderColor: Colors.mainYellow,
  },
  sexChoseStyleTabMini: {
    right: 0,
    width: 20,
    height: 20,
    borderWidth: 3,
    borderRadius: 13,

    backgroundColor: Colors.mainYellow,
    borderColor: 'white',
  },
  rowSexStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
});
