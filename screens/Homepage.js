import React, { Component } from 'react';
import { View, StyleSheet,TouchableOpacity } from 'react-native';
import { Constants} from 'expo';
import { AntDesign, MaterialCommunityIcons} from '@expo/vector-icons';
export default class Homepage extends Component {

  render() {
    return (
      <View style={styles.container}>
      <TouchableOpacity style={styles.button}
          onPress={this.props.galleryHandler}>
      <MaterialCommunityIcons name="image-album" size={50} color="cyan" />
      </TouchableOpacity>
        <TouchableOpacity style={styles.button}
          onPress={this.props.cameraHandler}>
        <AntDesign name="camera" size={50} color="cyan"/>
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