import React, { Component } from 'react';
import Homepage from './screens/Homepage'
import Map from './screens/Map'
import History from './screens/History'
import { MapView } from 'expo';
import { RNS3 } from 'react-native-aws3'
import {Permissions, ImagePicker, Location } from 'expo';
import AppNavigator from './navigation/AppNavigator.js'

import { View, TouchableOpacity, Text} from 'react-native';
export default class App extends Component {
  
  state = {
    uploadedpic: false,
    uri: null,
    latitude: null,
    longitude: null,
    userItems: [{name: 'bottle', 
    latitude: 51.566022 , 
    longitude: -0.060651},
  {name: 'cigarette', 
  latitude: 51.562340, 
  longitude: -0.074790}],
    itemName: null,
    errorMessage: null,
    coords: null,
    user_id: 7,
  }

  getItems = () => {
    fetch(`http://192.168.1.68.:3000/users/${this.state.user_id}`)
    .then(resp => resp.json())
    .then(data => {
      this.setState({
        userItems: data.items
      })
    }) 

  }

  componentDidMount() {
    
  }
  componentWillMount() {
    this.getLocation()
    // .then(this.getItems())
    
}

// sendLocation = () => {
//   fetch(`http://192.168.1.68.:3000/items`, {
//     method: 'POST',
//     headers: {'Content-Type': 'application/json'},
//     body: JSON.stringify({name: 'bottle', user_id:6, latitude:this.state.coords})
//   })
// }

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
    const file = {
      uri: this.state.uri,
      name: 'test',
      type: 'image/png'
    }
    console.log(file)
    
    const options = {
      bucket: 'mod5-recycle',
          region: 'eu-west-2',
          accessKey: 'AKIAJAVHTTOI67GNT2XA',
          secretKey: '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',
          successActionStatus: 201
      }
      RNS3.put(file, options).then(response => {
      if (response.status !== 201) {
        console.error(response)
        throw new Error("Failed to upload image to S3");
      }
      console.log(response.body);
      this.setState({
        uploadedpic: true
      })
    })
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
      {/* {!this.state.uploadedpic? <Homepage cameraHandler={this.cameraHandler} galleryHandler={this.galleryHandler} />:
      <Map logMoreLitter={this.logMoreLitter} latitude={this.state.latitude} longitude={this.state.longitude}/>} */}
{/*       
      <History items={this.state.userItems}/>
      <Homepage cameraHandler={this.cameraHandler} galleryHandler={this.galleryHandler} /> */}
<AppNavigator
          screenProps={ {
            currentLatitude: this.state.latitude,
            currentLongitude: this.state.longitude,
            cameraHandler: this.cameraHandler,
            galleryHandler: this.galleryHandler,
            userItems: this.state.userItems
          } }
        />
      </View>
    );
  }
}

