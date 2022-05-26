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
} from 'react-native';

import axios from 'axios';
import {Colors} from './colors';

export const domain = 'https://buginkomek.kz/';
import ArrowRight from './../icon/arrowRight.svg';
import ArrowLeft from './../icon/arrow_back.svg';

const {width, height} = Dimensions.get('screen');

export function AboutUs(props) {
  const text = 'AboutUs';
  return (
    <View style={styles.shell}>
      <TouchableOpacity onPress={() => props.navigation.goBack()}>
        <View style={styles.arrowLeftStyle}>
          <ArrowLeft />
        </View>
      </TouchableOpacity>

      <View style={styles.appBarStyle}>
        <Text style={styles.appBarTextStyle}>{text}</Text>
      </View>
      <View style={styles.container}>
        <Text style={styles.textStyle}>{text}</Text>
      </View>
    </View>
  );
}

export function Contact(props) {
  const text = 'Contact';
  return (
    <View style={styles.shell}>
      <TouchableOpacity onPress={() => props.navigation.goBack()}>
        <View style={styles.arrowLeftStyle}>
          <ArrowLeft />
        </View>
      </TouchableOpacity>
      <View style={styles.appBarStyle}>
        <Text style={styles.appBarTextStyle}>{text}</Text>
      </View>
      <View style={styles.container}>
        <Text style={styles.textStyle}>{text}</Text>
      </View>
    </View>
  );
}

export function Help(props) {
  const text = 'Help';
  return (
    <View style={styles.shell}>
      <TouchableOpacity onPress={() => props.navigation.goBack()}>
        <View style={styles.arrowLeftStyle}>
          <ArrowLeft />
        </View>
      </TouchableOpacity>
      <View style={styles.appBarStyle}>
        <Text style={styles.appBarTextStyle}>{text}</Text>
      </View>
      <View style={styles.container}>
        <Text style={styles.textStyle}>{text}</Text>
      </View>
    </View>
  );
}

export function Policy(props) {
  const text = 'Policy';
  return (
    <View style={styles.shell}>
      <TouchableOpacity onPress={() => props.navigation.goBack()}>
        <View style={styles.arrowLeftStyle}>
          <ArrowLeft />
        </View>
      </TouchableOpacity>
      <View style={styles.appBarStyle}>
        <Text style={styles.appBarTextStyle}>{text}</Text>
      </View>
      <View style={styles.container}>
        <Text style={styles.textStyle}>{text}</Text>
      </View>
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
});
