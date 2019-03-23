import React from "react";
import {
  createStackNavigator,
  createSwitchNavigator,
  createAppContainer,
  createDrawerNavigator
} from "react-navigation";

import AuthLoadingScreen from "./screens/Auth";

import SignInScreen from "./screens/SignIn";
import Home from "./navigation/Home";
import HeatMap from "./screens/HeatmapScreen";
import SignUpScreen from "./screens/SignUpScreen";
import IntroScreen from "./screens/IntroScreen"

const AuthStack = createSwitchNavigator({
  Intro: IntroScreen,
  SignIn: SignInScreen,
  Welcome: SignUpScreen,
});

const AppDrawerNavigator = createDrawerNavigator({ Home, HeatMap });

export default createAppContainer(
  createSwitchNavigator(
    {
      AuthLoading: AuthLoadingScreen,
      App: AppDrawerNavigator,
      Auth: AuthStack
    },
    {
      initialRouteName: "AuthLoading"
    }
  )
);
