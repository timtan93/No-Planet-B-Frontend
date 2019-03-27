import React from "react";
import {
  createStackNavigator,
  createSwitchNavigator,
  createAppContainer,
  createDrawerNavigator
} from "react-navigation";

import { Icon } from "@expo/vector-icons"

import AuthLoadingScreen from "./screens/Auth";

import SignInScreen from "./screens/SignIn";
import Home from "./navigation/Home";
import Analytics from "./screens/HeatmapScreen";
import SignUpScreen from "./screens/SignUpScreen";
import IntroScreen from "./screens/IntroScreen"

const AuthSwitch = createStackNavigator({
  Intro: IntroScreen,
  SignIn: SignInScreen,
  SignUp: SignUpScreen,
})




export default createAppContainer(
  createSwitchNavigator(
    {
      AuthLoading: AuthLoadingScreen,
      App: Home,
      Auth: AuthSwitch
    },
    {
      initialRouteName: "AuthLoading"
    }
  )
);
