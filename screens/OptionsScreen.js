import React from "react";
import { ScrollView, StyleSheet, Text, View, Button } from "react-native";

export default class OptionsScreen extends React.Component {
  static navigationOptions = {
    title: "Sign Out?"
  };
  render() {
    return (
      <View>
        <Button title="SignOut" onPress={this.props.screenProps.signOut} />
      </View>
    );
  }
}
