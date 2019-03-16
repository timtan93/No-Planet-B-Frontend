import React, { Component } from 'react';
import { View, StyleSheet, Button, Text, TouchableOpacity } from 'react-native';
import { Constants, Permissions, ImagePicker, Location } from 'expo';
import { RNS3 } from 'react-native-aws3'
import { AntDesign, MaterialCommunityIcons} from '@expo/vector-icons';

export default class App extends Component {
  
  state = {
    user_id: 3,
    uri: null,
    latitude: null,
    longitude: null,
  }

  componentWillMount() {
      this.getLocation();
  }

  getLocation = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied',
      });
    }

    let location = await Location.getCurrentPositionAsync({});
    this.setState({ latitude: location.coords.latitude ,
    longitude: location.coords.longitude});
  };
  galleryHandler = async () => {
    const permissions = Permissions.CAMERA_ROLL;
    const { status } = await Permissions.askAsync(permissions);
    console.log(permissions, status);
    if(status === 'granted') {
      let image = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [4, 4],
        quality:0.2
      }).catch(error => console.log(permissions, { error }));
      this.setState({
        uri: image.uri
      })
      console.log(permissions, 'SUCCESS', image);
    }
  }

  cameraHandler = async () => {
    const permissions = Permissions.CAMERA;
    const { status } = await Permissions.askAsync(permissions);
    console.log(permissions, status);
    if(status === 'granted') {
      let image = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [4, 4],
        quality:0.2
      }).catch(error => console.log(permissions, { error }));
      this.setState({
        uri: image.uri
      })
      console.log(permissions, 'SUCCESS', image);
    }
    const file = {
      uri: this.state.uri,
      name: 'test',
      type: 'image/png'
    }
    console.log(file)
    
    const options = {
      bucket: 'goodvet',
          region: 'ap-northeast-2',
          accessKey: 'AKIAIJ4ZNXCKL6CIYIXQ',
          secretKey: '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',
          successActionStatus: 201
      }
      RNS3.put(file, options).then(response => {
      if (response.status !== 201)
      throw new Error("Failed to upload image to S3");
      console.log(response.body);
    })
  }


  render() {
    return (
      <View style={styles.container}>
      <TouchableOpacity style={styles.button}
          onPress={this.galleryHandler}>
      <MaterialCommunityIcons name="image-album" size={50} color="cyan" />
      </TouchableOpacity>
        <TouchableOpacity style={styles.button}
          onPress={this.cameraHandler}>
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