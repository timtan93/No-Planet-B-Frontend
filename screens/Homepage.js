import React, { Component } from 'react';
import { Button, View, StyleSheet,TouchableOpacity } from 'react-native';
import { Constants} from 'expo';
import { AntDesign, MaterialCommunityIcons, 
  MaterialIcons} from '@expo/vector-icons';
export default class Homepage extends Component {
  static navigationOptions = {
    title: `Welcome`
  };
  render() {
    return (
      <View style={styles.container}>
      <TouchableOpacity style={styles.button}
          onPress={this.props.screenProps.galleryHandler}>
      <MaterialCommunityIcons name="image-album" size={50} color="cyan" />
      </TouchableOpacity>
        <TouchableOpacity style={styles.button}
          onPress={this.props.screenProps.cameraHandler}>
        <AntDesign name="camera" size={50} color="cyan"/>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}
          onPress={() =>
            this.props.navigation.navigate('History')
          }>
        <MaterialIcons name="history" size={50} color="cyan"/>
        </TouchableOpacity>
        
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#383838',
  },

});