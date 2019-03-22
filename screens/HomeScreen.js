import React from 'react';
import { View, Dimensions, ScrollButton, StyleSheet,Text, Button } from 'react-native';
const DeviceWidth = Dimensions.get('window').width
export default class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Welcome to the app!',
  };
 
  render() {
    return(
      <View style={styles.container}>
        <View>
          <View style={styles.button} />
          <View style={styles.button} />
          <View style={styles.button} />
        </View>
        <View>
          <View style={styles.button} />
          <View style={styles.button} />
          <View style={styles.button} />
        </View>
        <View>
          <View style={styles.button} />
          <View style={styles.button} />
          <View style={styles.button} />
        </View>
      </View>

      )
  }
}

const styles = StyleSheet.create({
  container : {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button : {
    width: DeviceWidth*0.2, 
    height: DeviceWidth*0.2, 
    marginBottom:10, 
    marginLeft:10, 
    backgroundColor: 'cyan',
    borderRadius: 10
  }
})
