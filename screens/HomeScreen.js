import React from 'react';
import { View, Dimensions, ScrollButton, StyleSheet,Text, Button } from 'react-native';

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Welcome to the app!',
  };
 
  render() {
    const DeviceWidth = Dimensions.get('window').width
    return(
      <View style={{
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        <View>
          <Button title='b' onPress={() => console.log('hi')} style={{width: DeviceWidth*0.3, height: DeviceWidth*0.3, marginBottom:10, marginLeft:10,   Color: 'powderblue'}} />
          <Button title='b' onPress={() => console.log('hi')} style={{width: DeviceWidth*0.3, height: DeviceWidth*0.3, marginBottom:10, marginLeft:10,   Color: 'skyblue'}} />
          <Button title='b' onPress={() => console.log('hi')} style={{width: DeviceWidth*0.3, height: DeviceWidth*0.3, marginBottom:10, marginLeft:10,   Color: 'steelblue'}} />
        </View>
        <View>
          <Button title='b' onPress={() => console.log('hi')} style={{width: DeviceWidth*0.3, height: DeviceWidth*0.3, marginBottom:10, marginLeft:10,   Color: 'powderblue'}} />
          <Button title='b' onPress={() => console.log('hi')} style={{width: DeviceWidth*0.3, height: DeviceWidth*0.3, marginBottom:10, marginLeft:10,   Color: 'skyblue'}} />
          <Button title='b' onPress={() => console.log('hi')} style={{width: DeviceWidth*0.3, height: DeviceWidth*0.3, marginBottom:10, marginLeft:10,   Color: 'steelblue'}} />
        </View>
        <View>
          <Button title='b' onPress={() => console.log('hi')} style={{width: DeviceWidth*0.3, height: DeviceWidth*0.3, marginBottom:10, marginLeft:10,   Color: 'powderblue'}} />
          <Button title='b' onPress={() => console.log('hi')} style={{width: DeviceWidth*0.3, height: DeviceWidth*0.3, marginBottom:10, marginLeft:10,   Color: 'skyblue'}} />
          <Button title='b' onPress={() => console.log('hi')} style={{width: DeviceWidth*0.3, height: DeviceWidth*0.3, marginBottom:10, marginLeft:10,   Color: 'steelblue'}} />
        </View>
      </View>
      )
  }
}
