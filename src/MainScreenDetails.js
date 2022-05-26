import React, {useEffect, useState, useContext} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
  TextInput,
  Share,
  ActivityIndicator,
  FlatList,
  Alert,
} from 'react-native';
import ArrowBackIcon from './../icon/arrow_back.svg';
import DownloadIcon from './../icon/downloadIcon.svg';
import CalendarIcon from './../icon/calendar.svg';
export const domain = 'https://buginkomek.kz/';

import RenderHtml from 'react-native-render-html';
import IframeRenderer, {iframeModel} from '@native-html/iframe-plugin';
import WebView from 'react-native-webview';
import {Colors} from './colors.js';

import {GlobalContext} from './context/Context';

const {width, height} = Dimensions.get('screen');

const PopUp = msg =>
  Alert.alert('', msg, [
    {
      text: 'OK',
      style: 'default',
    },
  ]);

import axios from 'axios';

const renderers = {
  iframe: IframeRenderer,
};

const customHTMLElementModels = {
  iframe: iframeModel,
};

export function MainScreenDetails(props) {
  const [userData, setUserData] = useState(null);
  const [projectData, setProjectData] = useState(null);
  const [loading, setLoading] = useState(true);

  const {token, setToken} = useContext(GlobalContext);

  useEffect(() => {
    if (token) {
      console.log('id: ', props.route.params.id);
      getProject();
    } else {
      setUserData({
        full_name: 'Guest',
      });
      console.log('else, id: ', props.route.params.id);
      getProject();
    }
  }, []);

  const getProject = () => {
    axios
      .get(`project/${props.route.params.id}`)
      .then(res => {
        console.log('data=======', res);
        console.log('comment: ', res.data.comments);
        console.log('project: ', res.data.project);
        setProjectData(res);

        if (token == null) {
          console.log('token', token);
        } else {
          getProfile();
        }
        setLoading(false);
      })
      .catch(err => {
        console.log('project : ', err);
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
        console.log('error profile/edit: ', err);
        setLoading(false);
      });
  };

  if (!userData) return null;

  const onShare = async () => {
    try {
      const result = await Share.share({
        message: projectData.project.title_kz + '\n' + domain,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
        } else {
        }
      } else if (result.action === Share.dismissedAction) {
      }
    } catch (error) {
      alert(error.message);
    }
  };

  // var dateApiText = projectData.project.created_at;

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

          <FlatList
            data={projectData.data.comments}
            ListHeaderComponent={() => (
              <Project
                data={projectData.data.project}
                token={token}
                userData={userData}
                props={props}
              />
            )}
            renderItem={({item, index}) => (
              <RenderProjects
                item={item}
                index={index}
                props={props}
                token={token}
                userData={userData}
                idReply={projectData}
              />
            )}
            ListFooterComponent={() => <View style={styles.line}></View>}
          />
        </View>
      )}
    </View>
  );
}

const Project = ({props, data, token, userData}) => {
  useEffect(() => {}, []);

  const [loading, setLoading] = useState(true);

  const [sendCommentState, setSendCommentState] = useState();

  const sendComment = () => {
    console.log('commentari', sendCommentState);
    axios
      .post('project/' + props.route.params.id + '/comment', {
        comment: sendCommentState,
      })
      .then(res => {
        console.log('red send Comment', res);
      })
      .catch(err => {
        console.log('err comment :', err);
      });
  };

  var dateApiText = data.created_at;
  let resultdateApiText = dateApiText.substr(0, 10);

  const donationAmounts = [100, 200, 500, 10000];
  const helpProjectText = 'Чтобы помочь проекту выберите  сумму пожертвования:';
  const anotherSumma = 'Другая сумма';
  const helpProject = 'Помочь проекту';
  const comment = 'Комментарии';

  const [amount, setAmountPay] = useState();

  const payInput = () => {
    console.log('user id', userData?.id);
    console.log('amountPay', amount);

    console.log('project_id', props.route.params.id);

    var params = {
      amount: amount,
      user_id: userData?.id,
      project_id: props.route.params.id,
    };

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
  return (
    <View style={styles.shell}>
      <View style={{paddingBottom: 10}}></View>

      <Text style={styles.titleTextStyle}>{data.title_kz}</Text>

      <View style={{paddingBottom: 10}}></View>
      <View style={styles.posterContainer}>
        <Image
          style={styles.posterStyle}
          source={{
            uri: domain + data.poster,
          }}
        />
      </View>
      <View style={styles.calendarIconStyle}>
        <CalendarIcon />
      </View>
      <View style={styles.containerTitle}>
        <Text style={styles.dataTextStyle}>{resultdateApiText}</Text>
      </View>
      <RenderHtml
        contentWidth={width - 32}
        source={{html: data.content_kz}}
        tagsStyles={{
          p: {color: '#222222', fontSize: 16, margin: 16},
          iframe: {
            backgroundColor: 'black',
          },
        }}
        renderers={renderers}
        customHTMLElementModels={customHTMLElementModels}
        WebView={WebView}
      />
      <Text style={styles.descriptionTextStyle}>{helpProjectText}</Text>
      <View style={styles.donateContainer}>
        {donationAmounts.map((amount, index) => (
          <TouchableOpacity key={index}>
            <View style={styles.amountContainer} key={index}>
              <Text style={styles.amountText}>{amount}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
      <TouchableOpacity>
        <TextInput
          keyboardType="numeric"
          style={styles.TextForSumma}
          textAlign={'center'}
          onChangeText={text => setAmountPay(text)}></TextInput>
      </TouchableOpacity>
      <Text></Text>
      <TouchableOpacity onPress={payInput}>
        <View style={styles.containerHelpProject}>
          <Text style={styles.textHelpProject}>{helpProject}</Text>
        </View>
      </TouchableOpacity>
      <View style={styles.line}></View>
      <Text style={styles.titleTextStyle}>{comment}</Text>

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

        <View style={styles.commentInputStyle}>
          <TextInput
            onChangeText={text => setSendCommentState(text)}
            placeholder={'Комментарий'}></TextInput>
        </View>
        <View style={styles.sendButtonStyle}>
          <TouchableOpacity onPress={() => sendComment()}>
            <Text>Send</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const RenderProjects = ({item, index, token, userData, idReply}) => {
  const [sendInput, setSendInput] = useState(false);
  const [showComment, setShowComment] = useState(false);
  const [sendCommentState, setSendCommentState] = useState();

  const sendComment = () => {
    axios
      .post('project/' + item.id, +'/reply', {
        comment: sendCommentState,
      })
      .then(res => {
        console.log('red', res);
      });
  };

  const renderDate = item.created_at;
  const renderDateRes = renderDate.substr(0, 10);

  return (
    <View style={styles.commentStyles}>
      <Image
        style={styles.profileImageStyle}
        source={{
          uri: item.commentator.avatar,
        }}
      />

      <Text style={styles.commentNameTextStyle}>
        {item.commentator.full_name}
      </Text>
      <View style={styles.calendarIconStyle}>
        <CalendarIcon />
      </View>
      <Text style={styles.commentNameTextStyle}>{renderDateRes}</Text>
      <Text style={styles.commentTextStyle}>{item.comment}</Text>
      <View style={{left: 66, top: 5, width: width - 32, height: 25}}>
        <TouchableOpacity onPress={() => setSendInput(!sendInput)}>
          <Text>Отправить</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setShowComment(!showComment)}>
          <Text>Показаить ответы</Text>
        </TouchableOpacity>
      </View>
      <View>
        {sendInput ? (
          <View style={styles.containerProfileCommentRe}>
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
            <View style={styles.commentInputStyle}>
              <TextInput
                onChangeText={text => setSendCommentState(text)}
                placeholder={'Reply'}></TextInput>
            </View>
            <View style={styles.sendButtonStyle}>
              <TouchableOpacity onPress={() => sendComment()}>
                <Text>Send</Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : null}
      </View>
      <View>
        {showComment ? (
          <View style={styles.commentStyles}>
            <Image
              style={styles.profileImageStyle}
              source={{
                uri: item.commentator.avatar,
              }}
            />

            <Text style={styles.commentNameTextStyle}>
              {item.commentator.full_name}
            </Text>
            <View style={styles.calendarIconStyle}>
              <CalendarIcon />
            </View>
            <Text style={styles.commentNameTextStyle}>{renderDateRes}</Text>
            <Text style={styles.commentTextStyle}>{item.comment}</Text>
          </View>
        ) : null}
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
  searchStyle: {
    // zIndex: 9,
    paddingHorizontal: 16,
    marginHorizontal: 66,
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

  calendarIconStyle: {
    left: 20,
    top: 20,
    paddingRight: 15,
  },

  containerTitle: {
    paddingHorizontal: 16,
  },
  titleTextStyle: {
    fontSize: 24,
    fontWeight: '500',
    color: Colors.mainBlackForText,
    paddingHorizontal: 16,
  },
  descriptionTextStyle: {
    fontSize: 22,
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

  dataTextStyle: {
    left: 39,
    fontSize: 16,
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
  containerSumma: {
    padding: 16,
    borderWidth: 0.8,
    borderRadius: 136,
    marginHorizontal: 16,
    marginBottom: 10,
    alignItems: 'center',
    borderColor: Colors.greyColor,
  },

  textHelpProject: {
    color: 'white',
    fontSize: 26,
    fontWeight: '600',
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

  line: {
    borderBottomColor: Colors.borderColor,
    borderBottomWidth: 1,
    marginVertical: 32,
    marginHorizontal: 16,
  },
  containerCommentImage: {
    paddingLeft: 16,
    paddingTop: 10,
  },
  profileImageStyle: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  containerProfileComment: {
    width: width,
    flexDirection: 'row',
    flexWrap: 'wrap',
    height: 70,
    marginBottom: 10,
  },

  containerProfileCommentRe: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: width,
    height: 110,
    marginBottom: 10,
    marginHorizontal: -16,
  },
  commentInputStyle: {
    backgroundColor: 'white',
    height: 50,
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 15,
    width: width - 170,
    marginHorizontal: 10,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: Colors.greyColor,
    paddingHorizontal: 10,
  },
  commentStyles: {
    marginVertical: 0,
    marginHorizontal: 16,
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingVertical: 10,
  },
  commentTextStyle: {
    marginHorizontal: 66,
    marginTop: -15,
    fontSize: 14,
    color: Colors.mainBlackForText,
  },
  commentNameTextStyle: {
    marginHorizontal: 16,

    fontSize: 14,
    color: Colors.mainBlackForText,
  },
  sendCommentTextStyle: {
    marginHorizontal: 66,
    marginTop: 3,
    fontSize: 14,
    color: Colors.greyText,
  },
  sendButtonStyle: {
    marginVertical: 25,
  },
});
