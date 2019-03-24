import React from "react";

import {
  createStackNavigator,
  createBottomTabNavigator,
  createAppContainer
} from "react-navigation";
import {
  SimpleLineIcons,
  AntDesign,
  Entypo,
  MaterialCommunityIcons, Icon
} from "@expo/vector-icons";
import HomeScreen from "../screens/HomeScreen";
import CameraScreen from "../screens/CameraScreen";
import MapScreen from "../screens/MapScreen";
import OptionsScreen from "../screens/OptionsScreen";
import StyleScreen from "../screens/StylingCheatSheet";
import ImagesScreen from "../screens/ImagesScreen"

const HomeStack = createStackNavigator({
  Home: HomeScreen
});

HomeStack.navigationOptions = {
  tabBarLabel: "Home",
  tabBarIcon: ({ focused }) => <AntDesign name="home" size={32} />
};

const CameraStack = createStackNavigator({
  Camera: CameraScreen
});

CameraStack.navigationOptions = {
  tabBarLabel: "Camera",
  tabBarIcon: ({ focused }) => <AntDesign name="camera" size={32} />
};

const MapStack = createStackNavigator({
  Map: MapScreen
});

MapStack.navigationOptions = {
  tabBarLabel: null,
  tabBarIcon: ({ focused }) => <Entypo name="map" size={32} />
};
const OptionsStack = createStackNavigator({
  Options: OptionsScreen
});

OptionsStack.navigationOptions = {
  tabBarLabel: "Options",
  tabBarIcon: ({ focused }) => <SimpleLineIcons name="options" size={32} />
};

const StyleStack = createStackNavigator({
  Style: StyleScreen
});

StyleStack.navigationOptions = {
  tabBarLabel: "Style"
};

const ImagesStack = createStackNavigator({
  Images: ImagesScreen
});

ImagesStack.navigationOptions = {
  tabBarIcon: ({ focused }) => <MaterialCommunityIcons name="image-album" size={32} />
}

const MainStack = createBottomTabNavigator({
  HomeStack,
  // CameraStack,
  MapStack,
  ImagesStack,
  OptionsStack,
  // StyleStack
}, {
  tabBarOptions: {
    showLabel: false,
  }
});

const AppContainer = createAppContainer(MainStack);

export default AppContainer;
