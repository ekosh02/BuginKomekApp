import React, {useEffect, useState, useContext} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  Dimensions,
} from 'react-native';

import axios from 'axios';
import {Colors} from './colors';
import Restart from 'react-native-restart';
export const domain = 'https://buginkomek.kz/';
const {width, height} = Dimensions.get('screen');
import AsyncStorage from '@react-native-async-storage/async-storage';
import {GlobalContext} from './context/Context';

export function ProfileScreen(props) {
  const informationText = 'Информация';
  const aboutUsText = 'О нас';
  const contactText = 'Связаться с нами';
  const helpText = 'Помощь';
  const policy = 'Политика соглашения';
  const buginText = 'bugin.soft © 2021';
  const exit = 'Выйти';
  const signIn = 'Войти';

  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null);
  const {token, setToken} = useContext(GlobalContext);

  useEffect(() => {
    console.log('Token Project ', token);
    if (token) {
      getProjects();
    } else {
      setUserData({
        full_name: 'Guest',
      });

      setLoading(false);
    }
  }, []);

  const getProjects = props => {
    axios
      .get('profile/edit')
      .then(res => {
        console.log('profile/edit profile', res.data.user);

        setUserData(res.data.user);
        setLoading(false);
      })
      .catch(err => {
        console.log('error at profile: ', err);
        setLoading(false);
      });
  };

  const onExit = async () => {
    await AsyncStorage.removeItem('token');
    const checkToken = await AsyncStorage.getItem('token');
    if (checkToken === null) {
      Restart.Restart();
    }
  };

  if (!userData) return null;

  const editProfile = 'Редактировать профиль';

  return (
    <View style={styles.shell}>
      {loading ? (
        <View>
          <ActivityIndicator
            style={{marginTop: width / 1.5}}
            color={Colors.mainYellow}
          />
        </View>
      ) : (
        <View>
          <View style={styles.containerProfileAppBar}>
            <View style={styles.containerImage}>
              <Image
                style={styles.profileImageStyle}
                source={
                  token
                    ? {
                        uri: userData.avatar,
                      }
                    : require('./../icon/emptyAvatar.jpg')
                }
              />
            </View>

            <View>
              <Text style={styles.fullNameTextStyle}>{userData.full_name}</Text>
              {token ? (
                <View>
                  <TouchableOpacity
                    onPress={() =>
                      props.navigation.navigate('EditUserDetails')
                    }>
                    <Text style={styles.editProfileTextStyle}>
                      {editProfile}
                    </Text>
                  </TouchableOpacity>
                </View>
              ) : (
                <View></View>
              )}
            </View>
          </View>

          <View style={styles.line}></View>

          <View style={styles.containerInformation}>
            <Text style={styles.titleTextStyle}>{informationText}</Text>
          </View>

          <TouchableOpacity
            onPress={() => props.navigation.navigate('AboutUs')}>
            <View style={styles.containerText}>
              <Text style={styles.textStyle}>{aboutUsText}</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => props.navigation.navigate('Contact')}>
            <View style={styles.containerText}>
              <Text style={styles.textStyle}>{contactText}</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => props.navigation.navigate('Help')}>
            <View style={styles.containerText}>
              <Text style={styles.textStyle}>{helpText}</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => props.navigation.navigate('Policy')}>
            <View style={styles.containerText}>
              <Text style={styles.textStyle}>{policy}</Text>
            </View>
          </TouchableOpacity>

          {token ? (
            <TouchableOpacity onPress={() => onExit()}>
              <View style={styles.containerExitToken}>
                <Text style={styles.containerExitTokenText}>{exit}</Text>
              </View>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={() => props.navigation.navigate('Auth')}>
              <View style={styles.containerExitToken}>
                <Text style={styles.containerExitTokenText}>{signIn}</Text>
              </View>
            </TouchableOpacity>
          )}

          <View style={styles.buginContainer}>
            <Text style={styles.buginTextStyle}>{buginText}</Text>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  shell: {
    backgroundColor: 'white',
    flex: 1,
  },
  containerText: {
    marginVertical: 5,
    paddingHorizontal: 16,
    height: 40,
    borderBottomColor: Colors.borderColor,
    borderBottomWidth: 1,
  },
  containerInformation: {
    marginVertical: 5,
    paddingHorizontal: 16,
    height: 40,
  },
  textStyle: {
    fontSize: 20,
    color: Colors.mainBlackForText,
    fontWeight: '400',
  },
  titleTextStyle: {
    fontSize: 20,
    color: Colors.mainBlackForText,
    fontWeight: '300',
  },
  line: {
    borderBottomColor: Colors.borderColor,
    borderBottomWidth: 1,
    marginVertical: 10,
    marginHorizontal: 16,
  },
  buginContainer: {
    position: 'absolute',
    left: 0,
    top: height - 200,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buginTextStyle: {
    fontSize: 22,
    color: Colors.mainBlackForText,
    fontWeight: '400',
  },
  containerProfileAppBar: {
    height: 100,
    width: width,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  profileImageStyle: {
    width: 80,
    height: 80,
  },
  containerImage: {
    padding: 10,
  },
  fullNameTextStyle: {
    color: Colors.mainBlackForText,
    top: 20,
    left: 15,
    fontSize: 24,
  },
  editProfileTextStyle: {
    top: 20,
    left: 15,
    fontSize: 16,
  },
  containerExitToken: {
    top: 30,
    alignItems: 'center',
  },
  containerExitTokenText: {
    fontSize: 20,
    color: Colors.mainYellow,
  },
});
