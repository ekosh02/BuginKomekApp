import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Dimensions,
  TextInput,
  SafeAreaView,
} from 'react-native';

import {Colors} from './colors';

import {WebView} from 'react-native-webview';

import axios from 'axios';

export const PayBox = props => {
  useEffect(() => {
    console.log('PayBox Component');
  }, []);
  const [loading, setLoading] = useState(true);

  return (
    <View style={{flex: 1}}>
      <WebView source={{uri: props.route.params.url}} />
    </View>
  );
};
