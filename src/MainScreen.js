import React, {useEffect, useState, useContext} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
  Dimensions,
  TextInput,
} from 'react-native';
import BuginAssosation from './../icon/BuginAssosation.svg';
import Search from './../icon/search.svg';
import BellsIcon from './../icon/bells.svg';
import axios from 'axios';
import {Colors} from './colors';
import {GlobalContext} from './context/Context';

export const domain = 'https://buginkomek.kz/';

const {width, height} = Dimensions.get('screen');

export function MainScreen(props) {
  const helpText = 'Помочь';

  const {token, setToken} = useContext(GlobalContext);
  const [loading, setLoading] = useState(true);
  const [searchInput, setSearchInput] = useState(false);

  const [search, setSearch] = useState('');
  const [fiteredDataSource, setFiteredDataSource] = useState([]);
  const [masterDataSource, setMasterDataSource] = useState([]);

  useEffect(() => {
    getProjects();
  }, []);

  const getProjects = () => {
    axios
      .get('projects')
      .then(res => {
        console.log('Projects', res);
        setFiteredDataSource(res.data.projects);
        setMasterDataSource(res.data.projects);
        setLoading(false);
      })
      .catch(err => {
        console.log('Error at projects : ', err);
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
      setFiteredDataSource(newData);
      setSearch(text);
    } else {
      setFiteredDataSource(masterDataSource);
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
          data={fiteredDataSource}
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
        <View style={styles.helpPosition}>
          <TouchableOpacity onPress={() => props.navigation.navigate('Auth')}>
            <Text style={styles.helpTextStyle}>{helpText}</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const RenderProject = ({item, index, props}) => {
  const [state, setState] = useState(false);

  return (
    <View>
      <TouchableOpacity
        onPress={() =>
          props.navigation.navigate('MainScreenDetails', {
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
        <View style={styles.containerTitle}></View>
      </TouchableOpacity>
      <View style={styles.line} />
      <View style={styles.indent}></View>
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

  containerTitle: {
    paddingHorizontal: 16,
  },
  titleTextStyle: {
    fontSize: 20,
    fontWeight: '500',
    color: Colors.mainBlackForText,
  },

  posterContainer: {
    paddingHorizontal: 16,
  },
  posterStyle: {
    borderRadius: 16,
    width: 368,
    height: 160,
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
});
