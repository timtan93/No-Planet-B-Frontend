import React from 'react';
import { Text,
  ActivityIndicator,
  AsyncStorage,
  Button,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import API from '../API'
import {Location, Permissions} from 'expo'


export default class  HomeScreen extends React.Component {

  state = {
    items : [],
    latitude: null,
    longitude: null,
    item: {name: 'fish'}
  }
    static navigationOptions = {
      title: 'Welcome to the app!',
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
        longitude: location.coords.longitude, coords: location.coords});
      };

    logItem = async (item) => {
      const userToken = await AsyncStorage.getItem('token');
      fetch(`http://10.218.0.239:3000/items`, {
      method: 'POST',
	  headers: {'Content-Type': 'application/json', Authorization: userToken},
	  body: JSON.stringify(item)
    }).then(data => data.json())
  }


    
    render() {
      const items = this.state.items.length
      return (
        <View style={styles.container}>
          <Button title="Log an Item" onPress={this._showMoreApp} />
          <Text>You have {items} items and your @ {this.state.latitude}, {this.state.longitude}  </Text>
          <Button title="Map" onPress={this._showMap} />
          <Button title="Sign Out" onPress={this._signOutAsync} />
          <Button title="bottle" onPress={this.logItem} />
        </View>
      );
    }
  
    _showMoreApp = () => {
      this.props.navigation.navigate('Other', {latitude: this.state.latitude, longitude: this.state.longitude});
    };

    _showMap = () => {
      this.props.navigation.navigate('Map', {items: this.state.items,
      latitude: this.state.latitude, longitude: this.state.longitude})
    }
  
    _signOutAsync = async () => {
      await AsyncStorage.clear();
      this.props.navigation.navigate('Auth');
    };
  }
const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
  