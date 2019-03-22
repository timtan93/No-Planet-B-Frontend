import React from 'react';
import { ScrollView, StyleSheet,Text, View, Button } from 'react-native';

export default class OptionsScreen extends React.Component {
  static navigationOptions = {
    title: 'Welcome to the app!',
  };
  render() {
    return(
      <View>
      <Button title='SignOut' onPress={this.props.screenProps.signOut}/>
      </View>
      )
  }
}