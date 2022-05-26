import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Dimensions,
  Share,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState, useContext} from 'react';
import {Colors} from './colors.js';
const {width, height} = Dimensions.get('screen');
export const domain = 'https://buginkomek.kz/';
import RenderHtml from 'react-native-render-html';
import IframeRenderer, {iframeModel} from '@native-html/iframe-plugin';
import WebView from 'react-native-webview';
import CalendarIcon from './../icon/calendar.svg';
import axios from 'axios';
import {GlobalContext} from './context/Context';

import ArrowBackIcon from './../icon/arrow_back.svg';
import DownloadIcon from './../icon/downloadIcon.svg';

const renderers = {
  iframe: IframeRenderer,
};

const customHTMLElementModels = {
  iframe: iframeModel,
};

export function NewsScreenDetails(props) {
  const commentText = 'Комметарии';

  const onShare = async () => {
    try {
      const result = await Share.share({
        message: projectData.news.title_kz + '\n' + domain,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };

  const {token, setToken} = useContext(GlobalContext);
  const [userData, setUserData] = useState(null);
  const [projectData, setProjectData] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (token) {
      getProjects();
    } else {
      setUserData({
        full_name: 'Guest',
      });
      getProjects();
    }
  }, []);

  const getProjects = () => {
    axios.get(`news/${props.route.params.id}`).then(res => {
      console.log('Id news project: ', res.data.news);
      console.log('Id news comment: ', res.data.comments);
      setProjectData(res.data);
      if (token == null) {
        console.log('token', token);
        setLoading(false);
      } else {
        getProfile();
        setLoading(false);
      }
    });
  };

  const getProfile = () => {
    axios
      .get('profile/edit')
      .then(res => {
        console.log('profile/edit:', res.data.user);
        setUserData(res.data.user);
      })
      .catch(err => {
        console.log('error catchm: ', err);
      });
  };

  if (!userData) return null;
  var dateApiText = '01:01:2001';
  // var dateApiText = projectData.news.created_at;
  let resultdateApiText = dateApiText.substr(0, 10);

  console.log('token new render', token);

  return (
    <View style={styles.shell}>
      {loading ? (
        <ActivityIndicator
          style={{marginTop: width / 1.5}}
          color={Colors.mainYellow}
        />
      ) : (
        <View>
          <View style={styles.appBarStyle}>
            <View style={styles.leadingPosition}>
              <TouchableOpacity onPress={() => props.navigation.goBack()}>
                <ArrowBackIcon />
              </TouchableOpacity>
            </View>
            <View style={styles.actionFirstPosition}>
              <TouchableOpacity onPress={onShare}>
                <DownloadIcon />
              </TouchableOpacity>
            </View>
          </View>
          <ScrollView>
            <Text style={styles.titleTextStyle}>
              {projectData.news.title_kz}
            </Text>
            <View style={{paddingBottom: 10}}></View>
            <View style={styles.posterContainer}>
              <Image
                style={styles.posterStyle}
                source={{
                  uri: domain + projectData.news.poster,
                }}
              />
            </View>
            <View>
              <View style={styles.calendarIconStyle}>
                <CalendarIcon />
              </View>
              <View style={styles.containerTitle}>
                <Text style={styles.dataTextStyle}>{resultdateApiText}</Text>
              </View>
              <RenderHtml
                source={{html: projectData.news.content_kz}}
                contentWidth={width - 32}
                renderers={renderers}
                customHTMLElementModels={customHTMLElementModels}
                WebView={WebView}
                tagsStyles={{
                  p: {color: '#222222', fontSize: 16, margin: 16},
                  iframe: {
                    backgroundColor: 'black',
                  },
                }}
              />
              <View style={{paddingBottom: 10}}></View>
              <Text style={styles.titleTextStyle}>{commentText}</Text>
            </View>

            <Text></Text>
            <View style={styles.containerProfileComment}>
              <View style={styles.containerCommentImage}>
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

              <TextInput style={styles.commentInputStyle}></TextInput>
            </View>
          </ScrollView>
        </View>
      )}
    </View>
  );
}
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

  leadingPosition: {
    paddingRight: 10,
    position: 'absolute',
    left: 20,
    top: 25,
  },
  actionFirstPosition: {
    paddingRight: 10,
    position: 'absolute',
    right: 20,
    top: 25,
  },

  titleTextStyle: {
    fontSize: 24,
    fontWeight: '500',
    color: Colors.mainBlackForText,
    paddingHorizontal: 16,
  },

  posterContainer: {
    paddingHorizontal: 16,
  },
  posterStyle: {
    borderRadius: 16,
    width: 368,
    height: 160,
  },

  containerCommentImage: {
    padding: 10,
  },
  profileImageStyle: {
    width: 50,
    height: 50,
  },
  containerProfileComment: {
    width: width,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  commentInputStyle: {
    backgroundColor: 'white',
    height: 40,
    marginVertical: 15,
    width: width - 100,
    marginHorizontal: 10,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: Colors.greyColor,
    paddingHorizontal: 10,
  },
  containerTitle: {
    paddingHorizontal: 16,
  },
  dataTextStyle: {
    left: 39,
    fontSize: 16,
    color: Colors.mainBlackForText,
  },

  calendarIconStyle: {
    left: 20,
    top: 20,
  },
});
