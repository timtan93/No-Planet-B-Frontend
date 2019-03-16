import React, { Component } from 'react';
import Homepage from './screens/Homepage'
import Map from './screens/Map'
import { MapView } from 'expo';
import { RNS3 } from 'react-native-aws3'
import {Permissions, ImagePicker, Location } from 'expo';

import { View} from 'react-native';
export default class App extends Component {
  
  state = {
    uploadedpic: false,
    uri: null,
    latitude: null,
    longitude: null,
    useritems: [],
    itemname: null,
    errorMessage: null,
    coords: null,
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
    longitude: location.coords.longitude, coords: location.coords});
  };
  logMoreLitter = () => {
    this.setState({
      uploadedpic: false
    })
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
    
    this.handleSelectedImage()
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
    this.handleSelectedImage()
  }

  handleSelectedImage = () => {
    console.log('hi')
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
      this.setState({
        uploadedpic: true
      })
    })
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
      {!this.state.uploadedpic? <Homepage cameraHandler={this.cameraHandler} galleryHandler={this.galleryHandler} />:
      <Map logMoreLitter={this.logMoreLitter} latitude={this.state.latitude} longitude={this.state.longitude}/>}
      </View>
    );
  }
}

