import React from 'react';
import {
  ActivityIndicator,
  AsyncStorage,
  Button,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import { createStackNavigator, createSwitchNavigator, createAppContainer, createDrawerNavigator } from 'react-navigation';

import AuthLoadingScreen from './screens/Auth'

import SignInScreen from './screens/SignIn'
import Home from './screens/Home'
import HeatMap from './screens/HeatmapScreen'
import SignUpScreen from './screens/SignUpScreen'

const AuthStack = createSwitchNavigator({ SignIn: SignInScreen, Welcome: SignUpScreen 
});


const AppDrawerNavigator = createDrawerNavigator({Home, HeatMap })

export default createAppContainer(createSwitchNavigator(

  {
    AuthLoading: AuthLoadingScreen,
    App: AppDrawerNavigator,
    Auth: AuthStack,
  },
  {
    initialRouteName: 'AuthLoading',
  }
));
