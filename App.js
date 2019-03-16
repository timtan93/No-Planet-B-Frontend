import React, { Component } from 'react';
import { View, StyleSheet, Button } from 'react-native';
import { Constants, Permissions, ImagePicker } from 'expo';
import { RNS3 } from 'react-native-aws3'

export default class App extends Component {
  
  state = {
    
    uri: null,
  }
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
    });
  }


  render() {
    return (
      <View style={styles.container}>

        <Button
          title="Pick from Camera"
          onPress={this.cameraHandler}
        />
        <Button
          title="Pick from Gallery"
          onPress={this.galleryHandler}
        />

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
  },
});