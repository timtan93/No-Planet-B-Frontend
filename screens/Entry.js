import React from 'react';
import { AsyncStorage, Platform, StatusBar, StyleSheet, View, Text } from 'react-native';
import {Location, Permissions} from 'expo'
import MainTabNav from '../navigation/MainTabNav'

export default class Entry extends React.Component {
  state ={
    items: [],
    latitude: null,
    longitude: null,
  }

  _signOutAsync = async () => {
    await AsyncStorage.clear();
    this.props.navigation.navigate('Auth');
  };

  componentDidMount() {
    API.getItems()
      .then(data => {
        this.setState({
          items: data
        })
      })
    .then(this.getLocation())
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
      longitude: location.coords.longitude, coords: location.coords
    });
  };
  
  render() {
      return (
        <View style={styles.container}>
            <MainTabNav screenProps={{
              latitude: this.state.latitude,
              longitude: this.state.longitude,
              items: this.state.items,
              signOut: this._signOutAsync
            }} />
        </View>
      );
    }
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
    },
  });