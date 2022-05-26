import React, {useEffect, useState, useContext} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
  TextInput,
  Dimensions,
} from 'react-native';
import {Colors} from './colors.js';
import BuginAssosation from './../icon/BuginAssosation.svg';
import Search from './../icon/search.svg';
import BellsIcon from './../icon/bells.svg';
const {width, height} = Dimensions.get('screen');
import axios from 'axios';
export const domain = 'https://buginkomek.kz/';
import {GlobalContext} from './context/Context';

export function NewsScreen(props, item, index) {
  const helpText = 'Помочь';

  const [loading, setLoading] = useState(true);
  const [DATA, setData] = useState(null);
  const {token, setToken} = useContext(GlobalContext);

  const [searchInput, setSearchInput] = useState(false);
  const [search, setSearch] = useState('');
  const [masterDataSource, setMasterDataSource] = useState([]);

  useEffect(() => {
    getProjects();
  }, []);

  const getProjects = () => {
    axios
      .get('news')
      .then(res => {
        console.log('News ', res);

        setLoading(false);
        setData(res.data.news);
        setMasterDataSource(res.data.news);
      })
      .catch(err => {
        console.log('Error at news: ', err);
      });
  };

  const searchFilterFunction = text => {
    if (text) {
      const newData = masterDataSource.filter(function (item) {
        const itemData = item.title_kz
          ? item.title_kz.toUpperCase()
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

        {token ? (
          <View style={styles.actionFirstPosition}>
            <TouchableOpacity
              onPress={() => props.navigation.navigate('Bells')}>
              <BellsIcon />
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.actionFirstPosition}>
            <TouchableOpacity onPress={() => props.navigation.navigate('Auth')}>
              <BellsIcon />
            </TouchableOpacity>
          </View>
        )}
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
      {loading ? (
        <ActivityIndicator
          style={{marginTop: width / 1.5}}
          color={Colors.mainYellow}
        />
      ) : (
        <FlatList
          data={DATA}
          renderItem={({item, index}) => (
            <RenderProject item={item} index={index} props={props} />
          )}
        />
      )}
      {token ? (
        <TouchableOpacity
          onPress={() => props.navigation.navigate('HelpScreen')}>
          <View style={styles.helpPosition}>
            <Text style={styles.helpTextStyle}>{helpText}</Text>
          </View>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={() => props.navigation.navigate('Auth')}>
          <View style={styles.helpPosition}>
            <Text style={styles.helpTextStyle}>{helpText}</Text>
          </View>
        </TouchableOpacity>
      )}
    </View>
  );
}

const RenderProject = ({item, index, props}) => {
  return (
    <View>
      <TouchableOpacity
        onPress={() =>
          props.navigation.navigate('NewsScreenDetails', {
            id: item.id,
          })
        }>
        <View style={styles.posterContainer}>
          <Image
            style={styles.posterStyle}
            source={{
              uri: domain + item.poster,
            }}
          />
        </View>
        <View style={{paddingBottom: 10}}></View>
        <View style={styles.containerTitle}>
          <Text numberOfLines={1} style={styles.titleTextStyle}>
            {item.title_kz}
          </Text>
        </View>
      </TouchableOpacity>
      <View style={styles.line} />
      <View style={styles.indent}></View>
    </View>
  );
};

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
  buginAssosationImageStyle: {
    position: 'absolute',
    left: 20,
    top: 20,
    width: 97,
    height: 30,
  },
  posterContainer: {
    paddingHorizontal: 16,
  },
  posterStyle: {
    borderRadius: 16,
    width: 368,
    height: 160,
  },
  containerTitle: {
    paddingHorizontal: 16,
  },
  titleTextStyle: {
    fontSize: 20,
    fontWeight: '500',
    color: Colors.mainBlackForText,
  },
  indent: {
    marginBottom: 20,
  },
  line: {
    borderBottomColor: Colors.borderColor,
    borderBottomWidth: 1,
    marginVertical: 10,
    marginHorizontal: 16,
  },

  helpTextStyle: {
    color: 'white',
    fontSize: 16,
  },
  helpPosition: {
    zIndex: 10,
    bottom: 16,
    position: 'absolute',
    width: 80,
    height: 80,
    backgroundColor: Colors.mainYellow,
    borderRadius: 40,
    right: 16,
    justifyContent: 'center',
    alignItems: 'center',
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
