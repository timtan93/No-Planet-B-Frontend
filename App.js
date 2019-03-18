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
    userItems: [],
    itemName: null,
    errorMessage: null,
    coords: null,
    user_id: null,
    imageURL: null,
    email: 'timtan93@gmail.com',
    uploadedImageName: null,
  }

  getUserData = () => {
    fetch(`http://10.218.7.113:3000/users/${this.state.email}`)
    .then(resp => resp.json())
    .then(data => {
      this.setState({
        userItems: data.items,
        user_id: data.id
      })
    })
 
    }

  componentDidMount() {
      this.getLocation()
      this.getUserData()
  }
 

logNewItem = () => {
  fetch(`http://10.218.7.113:3000/items`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({image: this.state.imageURL, name: this.state.uploadedImageName ,user_id:this.state.user_id, latitude:this.state.latitude, longitude: this.state.longitude})
  }).then(resp=> console.log(resp))
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

  getCurrentTime = () => {
    var today = new Date();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    return time;
    
}

  handleSelectedImage = () => {
    const file = {
      uri: this.state.uri,
      name: `${this.state.user_id}`+`${this.getCurrentTime()}`,
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
      }else{

      }
      console.log(response.body.postResponse);
      this.setState({
        uploadedpic: true,
        imageURL: response.body.postResponse.location,
        uploadedImageName: response.body.postResponse.etag
      })
      this.logNewItem()
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

