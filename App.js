import React, { Component } from 'react';
import Homepage from './screens/Homepage'
import Map from './screens/Map'
import History from './screens/History'
import Login from './screens/Login'
import API from './API.js'
import { MapView } from 'expo';
import { RNS3 } from 'react-native-aws3'
import {Permissions, ImagePicker, Location } from 'expo';
import AppNavigator from './navigation/AppNavigator.js'

import { Button, AsyncStorage, Alert, View, TouchableOpacity, Text} from 'react-native';
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
    email: '',
    uploadedImageName: null,
    usersName: null,
  }

  getUserData = () => {
    fetch(`http://10.0.2.2:3000/users/${this.state.user_id}`)
    .then(resp => resp.json())
    .then(data => {
      this.setState({
        userItems: data.items,
        user_id: data.id,
        usersName: data.first_name
      })
    })
 
    }

  componentDidMount() {
    console.log('hi')
      this.getLocation()
      API.validate().then(data =>{
        if (data.error) {
          this.signOut()
        } else {
        this.setUser(data)
        }
      })
  }

  signOut= async () => {
    await AsyncStorage.clear();

  };


logNewItem = () => {
  fetch(`http://10.0.2.2:3000/items`, {
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
          accessKey: 'AKIAJ2DDE7SSXSHEEPUA',
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
      this.popUp()
    })
  } 
 popUp = () => {
  Alert.alert(
    'Alert Title',
    'My Alert Msg',
    [
      {text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {text: 'OK', onPress: () => console.log('OK Pressed')},
    ],
    {cancelable: false},
  );
 }

  setUser = (data )=> {
    this.setState({
      email: "timtan93@gmail.com"
    })
  }

  render() {
    return (
      
      <View style={{ flex: 1 }}>
      
      {this.state.email === "" ? <Login setUser={this.setUser}   /> : 
   
 <AppNavigator/> 
    }
    
      </View> 
     
    );
  }
}


// auth stuff 
//SIGN IN 
// fetch(`http://localhost:3000/signin`, {
//     method: 'POST',
// 	headers: {'Content-Type': "application/json"},
// 	body: JSON.stringify({email: 'tim', password: 'tim'})
//     }).then(data => data.json())
// returns email add and token 

// VALIDATE
// fetch(`http://localhost:3000/validate`, {
//     method: 'GET',
// 	headers: {'Content-Type': "application/json",
// 'Authorization': "eyJhbGciOiJIUzI1NiJ9.eyJpZCI6NX0.WlbdGLMHHw4C4_A6jtXjah7_3e8bDoEgCB-YlxULGDU"}
	
//     }).then(data => data.json())
//returns email and token 

//GET ITEMS
// fetch(`http://localhost:3000/items`, {
//     method: 'GET',
// 	headers: {'Content-Type': "application/json",
// 'Authorization': "eyJhbGciOiJIUzI1NiJ9.eyJpZCI6NX0.WlbdGLMHHw4C4_A6jtXjah7_3e8bDoEgCB-YlxULGDU"}
	
//     }).then(data => data.json())
 //returns items 