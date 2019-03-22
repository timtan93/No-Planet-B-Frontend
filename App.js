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
import Entry from './screens/Entry'

const AuthStack = createStackNavigator({ SignIn: SignInScreen
}, {
  headerMode: 'none',
  navigationOptions: {
      headerVisible: false,
  }
});

export default createAppContainer(createSwitchNavigator(

  {
    AuthLoading: AuthLoadingScreen,
    App: Entry,
    Auth: AuthStack,
  },
  {
    initialRouteName: 'AuthLoading',
  }
));
