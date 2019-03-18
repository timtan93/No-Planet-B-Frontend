import React, { Component } from 'react';
import { Text, View, StyleSheet, ScrollView, Image } from 'react-native';
import { Constants, MapView } from 'expo';






export default class History extends Component {
  
  static navigationOptions = {
    title: `History`
  };
  render() {
    const userItemsMarkers = this.props.screenProps.userItems.map(item => <MapView.Marker  coordinate={item} key={item.name} title={item.name} pinColor={'darkblue'}/>)
    const userItemsImages = this.props.screenProps.userItems.map(item => <Image source={{uri: item.image, width: 300, height: 300}} key={item.name} />)
    return (
      <View style={styles.container}>
        <MapView
          style={{ alignSelf: 'stretch', height: 400 }}
          region={{ latitude: this.props.screenProps.currentLatitude, 
            longitude: this.props.screenProps.currentLongitude,
            latitudeDelta: 0.0005, 
            longitudeDelta: 0.0005 }}>
        
        {userItemsMarkers}
        </MapView>
        <ScrollView contentContainerStyle={styles.contentContainer}>
      {userItemsImages}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    // paddingTop: Constants.statusBarHeight,
    backgroundColor: '#383838',
  },
  contentContainer: {
    paddingVertical: 20
  }
});
