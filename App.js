import React, {useContext, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import axios from 'axios';
import {Text, View} from 'react-native';
import {MainScreen} from './src/MainScreen';
import {MainScreenDetails} from './src/MainScreenDetails';
import {Auth} from './src/Auth';
import {Restore} from './src/Restore';
import {Registration} from './src/Registration';
import {SplashScreen} from './src/SplashScreen';
import {NewsScreen} from './src/NewsScreen';
import {NewsScreenDetails} from './src/NewsScreenDetails';

import {ReportScreen} from './src/ReportScreen';
import {ReportScreenDetails} from './src/ReportScreenDetails';

import {RaitingScreen} from './src/RaitingScreen';

import {ProfileScreen} from './src/ProfileScreen';
import {AboutUs, Contact, Help, Policy} from './src/ProfileScreenDetails';

import {Bells} from './src/Bells';
import {EditUserDetails} from './src/EditUserDetails';
import {HelpScreen} from './src/HelpScreen';

import {PayBox} from './src/PayBox';

import HomeSvg from './icon/bottom_bar/home.svg';
import NewsSvg from './icon/bottom_bar/news.svg';
import PersonSvg from './icon/bottom_bar/person.svg';
import RaitingSvg from './icon/bottom_bar/raiting.svg';
import RapportSvg from './icon/bottom_bar/rapport.svg';
import {Colors} from './src/colors.js';
import ContextProvider from './src/context/Context';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function App(props) {
  useEffect(() => {
    axios.defaults.baseURL = 'https://buginkomek.kz/api/';
  }, []);

  // const {token, setToken} = useContext()

  return (
    <ContextProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name="Splash" component={SplashScreen} />
          <Stack.Screen name="Auth" component={Auth} />
          <Stack.Screen name="Registration" component={Registration} />
          <Stack.Screen name="Restore" component={Restore} />
          <Stack.Screen
            name="MainScreenDetails"
            component={MainScreenDetails}
          />
          <Stack.Screen
            name="NewsScreenDetails"
            component={NewsScreenDetails}
          />
          <Stack.Screen
            name="ReportScreenDetails"
            component={ReportScreenDetails}
          />
          <Stack.Screen name="AboutUs" component={AboutUs} />
          <Stack.Screen name="Contact" component={Contact} />
          <Stack.Screen name="Help" component={Help} />
          <Stack.Screen name="Policy" component={Policy} />
          <Stack.Screen name="Bells" component={Bells} />
          <Stack.Screen name="Tabs" component={MyTabs} />
          <Stack.Screen name="EditUserDetails" component={EditUserDetails} />
          <Stack.Screen name="HelpScreen" component={HelpScreen} />
          <Stack.Screen name="PayBox" component={PayBox} />
        </Stack.Navigator>
      </NavigationContainer>
    </ContextProvider>
  );
}
function MainNavigation(props) {
  return <MainScreen {...props} />;
}

function NewsNavigation(props) {
  return <NewsScreen {...props} />;
}

function ReportNavigation(props) {
  return <ReportScreen {...props} />;
}

function RaitingNavigation(props) {
  return <RaitingScreen {...props} />;
}

function ProfileNavigation(props) {
  return <ProfileScreen {...props} />;
}

export function MyTabs(props) {
  const mainText = 'Главная';
  const newsText = 'Новости';
  const reportText = 'Отчет';
  const raitingText = 'Рейтинг';
  const profileText = 'Профиль';

  useEffect(() => {
    getUser();
  }, []);

  const getUser = () => {
    console.log('MyTabs is worked');
  };

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {height: 90},
        tabBarActiveTintColor: Colors.mainYellow,
        tabBarInactiveTintColor: 'black',
        tabBarLabelStyle: {
          fontSize: 15,
          bottom: 20,
          position: 'absolute',
        },
        tabBarIconStyle: {
          position: 'absolute',
          bottom: 55,
        },
      }}>
      <Tab.Screen
        name={mainText}
        component={MainNavigation}
        options={{
          tabBarIcon: ({focused}) => (
            <HomeSvg stroke={focused ? Colors.mainYellow : 'black'} />
          ),
        }}
      />
      <Tab.Screen
        name={newsText}
        component={NewsNavigation}
        options={{
          tabBarIcon: ({focused}) => (
            <NewsSvg stroke={focused ? Colors.mainYellow : 'black'} />
          ),
        }}
      />
      <Tab.Screen
        name={reportText}
        component={ReportNavigation}
        options={{
          tabBarIcon: ({focused}) => (
            <RapportSvg stroke={focused ? Colors.mainYellow : 'black'} />
          ),
        }}
      />

      <Tab.Screen
        name={raitingText}
        component={RaitingNavigation}
        options={{
          tabBarIcon: ({focused}) => (
            <RaitingSvg fill={focused ? Colors.mainYellow : 'black'} />
          ),
        }}
      />
      <Tab.Screen
        name={profileText}
        component={ProfileNavigation}
        options={{
          tabBarIcon: ({focused}) => (
            <PersonSvg stroke={focused ? Colors.mainYellow : 'black'} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default App;
