import React from "react";

import {
  createStackNavigator,
  createBottomTabNavigator,
  createAppContainer,
  createDrawerNavigator,
  DrawerItems
} from "react-navigation";
import {
  SimpleLineIcons,
  AntDesign,
  Entypo,
  MaterialCommunityIcons,
  Icon,
  Feather
} from "@expo/vector-icons";
import { TouchableOpacity, Text, View, Button, SafeAreaView, ScrollView } from "react-native";
import HomeScreen from "../screens/HomeScreen";
import CameraScreen from "../screens/CameraScreen";
import MapScreen from "../screens/MapScreen";
import OptionsScreen from "../screens/OptionsScreen";
import StyleScreen from "../screens/StylingCheatSheet";
import ImagesScreen from "../screens/ImagesScreen";
import UserUpdateScreen from '../screens/UserUpdateForm'
import Analytics from "../screens/AnalyticsScreen";
import SignOutScreen from '../screens/SignOutScreen'


// const HomeStack = createStackNavigator({
//   Home: HomeScreen
// });

// HomeStack.navigationOptions = {
//   tabBarLabel: "Home",
//   tabBarIcon: ({ focused }) => <AntDesign name="home" size={32} />
// };

// const CameraStack = createStackNavigator({
//   Camera: CameraScreen
// });

// CameraStack.navigationOptions = {
//   tabBarLabel: "Camera",
//   tabBarIcon: ({ focused }) => <AntDesign name="camera" size={32} />
// };

// const MapStack = createStackNavigator({
//   Map: MapScreen
// });

// MapStack.navigationOptions = {
//   tabBarLabel: null,
//   tabBarIcon: ({ focused }) => <Entypo name="map" size={32} />
// };
// const OptionsStack = createStackNavigator({
//   Options: OptionsScreen
// });

// OptionsStack.navigationOptions = {
//   tabBarLabel: "Options",
//   tabBarIcon: ({ focused }) => <SimpleLineIcons name="options" size={32} />
// };

// const StyleStack = createStackNavigator({
//   Style: StyleScreen
// });

// StyleStack.navigationOptions = {
//   tabBarLabel: "Style"
// };

// const ImagesStack = createStackNavigator({
//   Images: ImagesScreen
// });

// ImagesStack.navigationOptions = {
//   tabBarIcon: ({ focused }) => (
//     <MaterialCommunityIcons name="image-album" size={32} />
//   )
// };
const SettingStack = createStackNavigator(
  {
    Settings: OptionsScreen,
    UpdateUser: UserUpdateScreen,
  },
  {
    headerMode: "none",
    navigationOptions: {
      headerVisible: false,
      tabBarIcon: ({ focused, tintColor }) => {
        return <Feather name="settings" size={25} color={tintColor} />;
      }
    }
  }
);

const MainTab = createBottomTabNavigator(
  {
    Home: HomeScreen,
    Map: MapScreen,
    Images: ImagesScreen,
    Settings: SignOutScreen
    // Styling: StyleScreen
  },
  {
    navigationOptions: ({ navigation }) => {
      const { routeName } = navigation.state.routes[navigation.state.index];
      return {
        headerTitle: routeName

        // headerStyle: {
        //   backgroundColor: "#C5C6C7"
        // },
      };
    }
  }
);

const HomeStackNavigator = createStackNavigator(
  {
    MainTabNav: MainTab
  },
  {
    defaultNavigationOptions: ({ navigation }) => {
      return {
        headerLeft: (
          <Entypo
            onPress={() => navigation.toggleDrawer()}
            style={{ paddingLeft: 10 }}
            name="menu"
            size={30}
          />
        )
      };
    }
  }
);

const AnalyticsStack = createStackNavigator(
  {
    Analytics
  },
  {
    defaultNavigationOptions: ({ navigation }) => {
      return {
        headerLeft: (
          <Entypo
            onPress={() => navigation.toggleDrawer()}
            style={{ paddingLeft: 10 }}
            name="menu"
            size={30}
          />
        )
      };
    }
  }
);


 
const AppDrawerNavigator = createDrawerNavigator({
  Home: HomeStackNavigator,
  Analytics: AnalyticsStack,
  // LogOut: SignOutScreen
}
);

const AppContainer = createAppContainer(AppDrawerNavigator);

export default AppContainer;
