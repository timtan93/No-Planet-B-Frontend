import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Constants, MapView, Location, Permissions } from 'expo';

export default class History extends Component {
  state = {
    locationResult: 'Loading Location.....',
    location: {coords: { latitude: -8.639880, longitude: 115.140167}},
    location2: {coords: { latitude: 51.566022 , longitude: -0.060651}} ,
  };

  componentDidMount() {
    this.getLocation();
  }


  getLocation = async () => {
   let { status } = await Permissions.askAsync(Permissions.LOCATION);
   if (status !== 'granted') {
     this.setState({
       locationResult: 'Permission to access location was denied',
     });
   }

   let location = await Location.getCurrentPositionAsync({});
   this.setState({ locationResult: JSON.stringify(location), location, });
 };

  render() {
    return (
      <View style={styles.container}>
        <MapView
          style={{ alignSelf: 'stretch', height: 400 }}
          region={{ latitude: this.state.location.coords.latitude, 
            longitude: this.state.location.coords.longitude, 
            latitudeDelta: 0.0922, 
            longitudeDelta: 0.0421 }}
        >
    <MapView.Marker
      coordinate={this.state.location.coords}
      title= "item?"
      description=" User?"
    />
     <MapView.Marker
      coordinate={this.state.location2.coords}
      title="Item name?"
      description=" User?"
    />
        
        </MapView>
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
  }
});
