import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Constants, MapView, Location, Permissions } from 'expo';




export default class History extends Component {
  
  userItems = this.props.screenProps.userItems.map(itemPlace => 
    <MapView.Marker  coordinate={itemPlace} key={itemPlace.name}/>)
  

  componentDidMount() {
    this.getLocation()
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
    userItems = this.props.screenProps.userItems.map(itemPlace => 
      <MapView.Marker  coordinate={itemPlace} key={itemPlace.name}/>)
    return (
      <View style={styles.container}>
        <MapView
          style={{ alignSelf: 'stretch', height: 400 }}
          region={{ latitude: this.props.screenProps.currentLatitude, 
            longitude: this.props.screenProps.currentLongitude,
            latitudeDelta: 0.0922, 
            longitudeDelta: 0.0421 }}
        >
    {userItems}
        
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
