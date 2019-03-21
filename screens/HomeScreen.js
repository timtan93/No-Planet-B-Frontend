import React from 'react';
import { ScrollView, StyleSheet,Text, View, Button } from 'react-native';

export default class SettingsScreen extends React.Component {
  static navigationOptions = {
    title: 'Welcome to the app!',
  };
  render() {
    return(
      <View>
      <Text>Welcome To The App</Text>
      <Text>You are @ {this.props.screenProps.latitude}, {this.props.screenProps.latitude} </Text>
      <Text>You current have {this.props.screenProps.items.length} logged items</Text>
      <Text>Click on the Camera Tab to take a photo or upload an image </Text>
      <Button title='SignOut' onPress={this.props.screenProps.signOut}/>
      </View>
      )
  }
}
