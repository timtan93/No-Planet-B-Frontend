import React from "react";
import {
  Alert,
  ActivityIndicator,
  AsyncStorage,
  Button,
  StatusBar,
  StyleSheet,
  View,
  TextInput,
  Text,
  ImageBackground
} from "react-native";
import API from "../API";

export default class DashBoardScreen extends React.Component {
  render() {
    return (
      <View>
        <Text>Sign Up</Text>
        <Button
          title={"SignIn"}
          onPress={() => this.props.navigation.navigate("SignIn")}
        />
      </View>
    );
  }
}
