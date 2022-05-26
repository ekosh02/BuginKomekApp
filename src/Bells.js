import React, {useEffect, useState, useContext} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import {Colors} from './colors.js';

const {width, height} = Dimensions.get('screen');
import axios from 'axios';
export const domain = 'https://buginkomek.kz/';
import ArrowLeft from './../icon/arrow_back.svg';

export function Bells(props) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProjects();
  }, []);

  const getProjects = () => {
    axios
      .get('notifications')
      .then(res => {
        console.log('notifications ', res.data.notifications);

        setData(res.data.notifications);
        setLoading(false);
      })
      .catch(err => {
        console.log('Error at Projects : ', err);
      });
  };

  const text = 'Уведомления';
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
      <View>
        <View>
          <FlatList
            data={data}
            renderItem={({item, index}) => (
              <RenderProject item={item} index={index} props={props} />
            )}
          />
        </View>
      </View>
    </View>
  );
}

const RenderProject = ({item, index, props}) => {
  return (
    <View>
      <Text>asxas</Text>
    </View>
  );
};
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
});
