import React from 'react';
import {
  ActivityIndicator,
  AsyncStorage,
  Button,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import { createStackNavigator, createSwitchNavigator, createAppContainer } from 'react-navigation';

import AuthLoadingScreen from './screens/Auth'

import SignInScreen from './screens/SignIn'
import HomeScreen from './screens/Home'
import OtherScreen from './screens/OtherScreen'
import MapScreen from './screens/Map'

const AppStack = createStackNavigator({ Home: HomeScreen, Other: OtherScreen, Map: MapScreen });
const AuthStack = createStackNavigator({ SignIn: SignInScreen });

export default createAppContainer(createSwitchNavigator(

  {
    AuthLoading: AuthLoadingScreen,
    App: AppStack,
    Auth: AuthStack,
  },
  {
    initialRouteName: 'AuthLoading',
  }
));
