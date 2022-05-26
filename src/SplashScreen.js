import React, {useState, useEffect, useContext} from 'react';
import {StyleSheet, View, Image} from 'react-native';
import axios, {Axios} from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {GlobalContext} from './context/Context';

export function SplashScreen(props) {
  const {setToken} = useContext(GlobalContext);

  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    const token = await AsyncStorage.getItem('token');

    if (token) {
      axios.defaults.headers.Authorization = 'Bearer ' + token;
      setToken(token);
      console.log('Token: ' + 'Bearer ' + token);
      getUserData();
    } else {
      console.log('Token else: ' + token);
    }
    props.navigation.replace('Tabs');
  };

  const getUserData = () => {
    axios
      .get('profile/edit')
      .then(res => {
        const id = res.data.user;
        console.log('user id: ', id);
      })
      .catch(err => {
        console.log('user id error:', err);
      });
  };
  return (
    <View style={styles.SplashScreenCenterContainerStyle}>
      <Image
        style={styles.SplashScreenKomekLogoStyle}
        source={require('./../icon/SplashKomekIcon.png')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  SplashScreenKomekLogoStyle: {
    width: 147,
    height: 224,
  },
  SplashScreenCenterContainerStyle: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
