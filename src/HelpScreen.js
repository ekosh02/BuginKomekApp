import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Dimensions,
  TextInput,
  Alert,
} from 'react-native';

import Restart from 'react-native-restart';

import {Colors} from './colors';

import ArrowLeft from './../icon/arrow_back.svg';
import axios from 'axios';

const {width, height} = Dimensions.get('screen');

const PopUp = msg =>
  Alert.alert('', msg, [
    {
      text: 'OK',
      style: 'default',
    },
  ]);

export function HelpScreen(props) {
  useEffect(() => {
    getProfile();
  }, []);

  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  const getProfile = () => {
    axios
      .get('profile/edit')
      .then(res => {
        console.log('profile/edit:', res.data.user);
        setUserData(res.data.user);
        setLoading(false);
      })
      .catch(err => {
        console.log('error profile/edit: ', err);
        setLoading(false);
      });
  };

  const [amount, setAmountPay] = useState();

  const payInput = () => {
    console.log('user id', userData?.id);
    console.log('amountPay', amount);

    // axios.post('pay', amount);

    var params = {amount: amount, user_id: userData?.id};

    if (amount == 0 || amount == null) {
      PopUp('Введите сумму пожертрования');
    }
    if (amount < 100) {
      PopUp('Введите  сумму выше 100');
    } else {
      axios.get('pay', {params: params}).then(res => {
        console.log('res params', res);
        console.log('res payment_url', res.config.params);
        tenge = res;
        console.log('tenge', tenge);

        props.navigation.navigate('PayBox', {url: tenge.data.payment_url});
        setLoading(false);
        console.log('natigation to pay is worked');
      });
    }
  };

  const [chooseAmount, setChooseAmount] = useState();

  const chooseAmontFunc = () => {};

  const donationAmounts = [100, 200, 500, 10000];
  const anotherSumma = 'Другая сумма';
  const helpProject = 'Помочь проекту';
  const text = 'Помощь';
  const description = 'Чтобы помочь проекту выберите  сумму пожертвования:';
  return (
    <View style={styles.shell}>
      <View style={styles.arrowLeftStyle}>
        <TouchableOpacity onPress={() => props.navigation.goBack()}>
          <ArrowLeft />
        </TouchableOpacity>
      </View>
      <View style={styles.appBarStyle}>
        <Text style={styles.appBarTextStyle}>{text}</Text>
      </View>
      <Text style={styles.descriptionTextStyle}>{description}</Text>
      <View style={styles.donateContainer}>
        {donationAmounts.map((amount, index) => (
          <TouchableOpacity key={index}>
            <View style={styles.amountContainer} key={index}>
              <View>
                {console.log('indewindoweoixnwe', index, 'and', amount)}
              </View>
              <Text style={styles.amountText}>{amount}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
      <TouchableOpacity>
        <TextInput
          textAlign={'center'}
          style={styles.TextForSumma}
          onChangeText={text => setAmountPay(text)}
          keyboardType="numeric"></TextInput>
      </TouchableOpacity>
      <Text></Text>
      <TouchableOpacity onPress={payInput}>
        <View style={styles.containerHelpProject}>
          <Text style={styles.textHelpProject}>{helpProject}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  shell: {
    backgroundColor: 'white',
    flex: 1,
  },
  arrowLeftStyle: {
    position: 'absolute',
    top: 18,
    left: 16,
  },
  appBarStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 65,
    width: width,
  },
  appBarTextStyle: {
    fontSize: 20,
    color: Colors.mainBlackForText,
  },
  descriptionTextStyle: {
    padding: 16,
    fontSize: 20,
    color: Colors.mainBlackForText,
  },
  donateContainer: {
    width: width - 32,
    alignSelf: 'center',
    marginVertical: 20,
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'space-between',
  },
  amountContainer: {
    paddingVertical: 8,
    width: 160,
    alignItems: 'center',
    borderRadius: 30,
    borderWidth: 0.8,
    borderColor: Colors.greyColor,
    marginBottom: 10,
  },
  amountText: {
    color: Colors.mainYellow,
    fontSize: 25,
    fontWeight: '400',
  },

  TextForSumma: {
    borderWidth: 1,
    marginHorizontal: 16,
    marginVertical: 10,

    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    fontSize: 20,
    borderColor: Colors.greyColor,
    fontWeight: '400',
  },
  containerHelpProject: {
    padding: 16,
    borderWidth: 0.8,
    borderRadius: 136,
    marginHorizontal: 16,
    alignItems: 'center',
    backgroundColor: Colors.mainYellow,
    borderColor: Colors.greyColor,
  },
  textHelpProject: {
    color: 'white',
    fontSize: 26,
    fontWeight: '600',
  },
});
