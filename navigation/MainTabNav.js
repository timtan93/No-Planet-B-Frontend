import React from 'react';

import { createStackNavigator, createBottomTabNavigator, createAppContainer } from 'react-navigation';
import { FontAwesome, AntDesign, Entypo } from '@expo/vector-icons'
import HomeScreen from '../screens/HomeScreen'
import CameraScreen from '../screens/CameraScreen'
import MapScreen from '../screens/MapScreen'




const HomeStack = createStackNavigator({
  Home: HomeScreen,
});

HomeStack.navigationOptions = {
  tabBarLabel: 'Home',
  tabBarIcon: ({ focused }) => (
    <AntDesign name="home" size={32}/>
  ),
};


const CameraStack = createStackNavigator({
  Camera: CameraScreen,
});

CameraStack.navigationOptions = {
  tabBarLabel: 'Camera',
  tabBarIcon: ({ focused }) => (
    <AntDesign name="camera" size={32}/>
  ),
};

const MapStack = createStackNavigator({
  Map: MapScreen,
});

MapStack.navigationOptions = {
  tabBarLabel: 'Map',
  tabBarIcon: ({ focused }) => (
    <Entypo name="map" size={32}/>
  ),
};


const MainStack = createBottomTabNavigator({
  HomeStack,
  CameraStack,
  MapStack
});

const AppContainer = createAppContainer(MainStack)

export default AppContainer