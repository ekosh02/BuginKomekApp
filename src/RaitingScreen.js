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
} from 'react-native';
import BuginAssosation from './../icon/BuginAssosation.svg';
import Search from './../icon/search.svg';
import BellsIcon from './../icon/bells.svg';
import axios from 'axios';
import {Colors} from './colors';

export const domain = 'https://buginkomek.kz/';

const {width, height} = Dimensions.get('screen');

export function RaitingScreen(props) {
  const [data, setData] = useState(true);
  const [loading, setLoading] = useState(true);

  const [searchInput, setSearchInput] = useState(false);
  const [search, setSearch] = useState('');
  const [masterDataSource, setMasterDataSource] = useState([]);

  useEffect(() => {
    getProjects();
  }, []);

  const getProjects = () => {
    axios
      .get('rating')
      .then(res => {
        setLoading(false);
        console.log('Rating: ' + res.data);
        setData(res.data.rating);
        setMasterDataSource(res.data.rating);
      })
      .catch(err => {
        console.log('Error at rating: ' + err);
      });
  };

  const searchFilterFunction = text => {
    if (text) {
      const newData = masterDataSource.filter(function (item) {
        const itemData = item.full_name
          ? item.full_name.toUpperCase()
          : ''.toUpperCase();
        const textData = text.toUpperCase();

        return itemData.indexOf(textData) > -1;
      });
      setData(newData);
      setSearch(text);
    } else {
      setData(masterDataSource);
      setSearch(text);
    }
  };

  const raitingText = 'Рейтинг пожертвований';
  const number = '№';
  const fullName = 'ФИО';
  const summa = 'Сумма';
  return (
    <View style={styles.shell}>
      <View style={styles.appBarStyle}>
        <View style={styles.buginAssosationImageStyle}>
          <BuginAssosation />
        </View>

        <View style={styles.actionSecondPosition}>
          <TouchableOpacity onPress={() => setSearchInput(!searchInput)}>
            <Search />
          </TouchableOpacity>
        </View>

        <View style={styles.actionFirstPosition}>
          <TouchableOpacity onPress={() => props.navigation.navigate('Bells')}>
            <BellsIcon />
          </TouchableOpacity>
        </View>
      </View>

      <View>
        {searchInput ? (
          <TextInput
            style={styles.searchStyle}
            placeholder={'Search'}
            onChangeText={text => searchFilterFunction(text)}
            value={search}></TextInput>
        ) : null}
      </View>

      <View style={{paddingTop: 5}}></View>
      <Text style={styles.titleTextStyle}>{raitingText}</Text>
      <View style={{paddingTop: 20}}></View>

      <View style={styles.row}>
        <Text style={styles.numberTextStyle}>{number}</Text>
        <Text style={styles.fullNameTextStyle}>{fullName}</Text>
        <Text style={styles.summaTextStyle}>{summa}</Text>
      </View>

      <View style={{paddingTop: 5}}></View>
      <View style={styles.line}></View>
      <View style={{paddingTop: 5}}></View>

      {loading ? (
        <ActivityIndicator
          style={{marginTop: width / 1.5}}
          color={Colors.mainYellow}
        />
      ) : (
        <FlatList
          data={data}
          renderItem={({item, index}) => (
            <RenderProject item={item} index={index} props={props} />
          )}
        />
      )}
    </View>
  );
}

const RenderProject = ({item, index, props}) => {
  return (
    <View>
      <View style={styles.rowForFlatList}>
        <Text style={styles.numberStyle} numberOfLines={1}>
          {item.id}
        </Text>
        <Text style={styles.fullNameStyle} numberOfLines={1}>
          {item.full_name}
        </Text>
        <Text style={styles.summaStyle} numberOfLines={1}>
          {item.all_payments} ₸
        </Text>
      </View>
    </View>
  );
};

export const styles = StyleSheet.create({
  shell: {
    backgroundColor: 'white',
    flex: 1,
  },
  appBarStyle: {
    backgroundColor: 'white',
    paddingTop: 40,
    paddingBottom: 30,
  },

  buginAssosationImageStyle: {
    position: 'absolute',
    left: 20,
    top: 20,
    width: 97,
    height: 30,
  },

  actionFirstPosition: {
    paddingRight: 10,
    position: 'absolute',
    right: 20,
    top: 25,
  },
  actionSecondPosition: {
    paddingRight: 10,
    position: 'absolute',
    right: 75,
    top: 25,
  },

  titleTextStyle: {
    fontSize: 26,
    fontWeight: '500',
    color: Colors.mainBlackForText,
    paddingHorizontal: 16,
  },

  numberTextStyle: {
    width: 50,
    fontSize: 22,
    color: Colors.greyText,
  },
  fullNameTextStyle: {
    width: width / 2,
    fontSize: 22,
    color: Colors.greyText,
  },
  summaTextStyle: {
    width: 100,
    fontSize: 22,
    color: Colors.greyText,
  },

  numberStyle: {
    width: 50,
    color: Colors.mainBlackForText,
    fontSize: 24,
  },
  fullNameStyle: {
    width: width / 2,
    color: Colors.mainBlackForText,
    fontSize: 24,
  },
  summaStyle: {
    width: 100,
    color: Colors.mainBlackForText,
    fontSize: 24,
  },

  row: {
    paddingHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },

  rowForFlatList: {
    paddingHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },

  line: {
    borderBottomColor: Colors.borderColor,
    borderBottomWidth: 1,
    marginVertical: 10,
    marginHorizontal: 16,
  },
  searchStyle: {
    // zIndex: 9,
    paddingHorizontal: 16,
    left: 16,
    borderWidth: 0.6,
    marginTop: 5,
    marginBottom: 10,
    width: width - 32,
    borderColor: Colors.greyColor,
    backgroundColor: 'rgba(180, 180, 180, 0.5)',
    borderRadius: 10,
    // position: 'absolute',
  },
});
