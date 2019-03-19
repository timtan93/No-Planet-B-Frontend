import React from 'react';
import { MapView, Constants} from 'expo';
import { View, StyleSheet } from 'react-native';


export default class Map extends React.Component {
  static navigationOptions = {
    title: `Map`
  };

  render() {
    return (
      <View style={styles.container}>
        <MapView
        style={{ width:420, height:800, paddingTop: Constants.statusBarHeight}}
        initialRegion={{
          latitude: this.props.screenProps.currentLatitude,
          longitude: this.props.screenProps.currentLongitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
      <MapView.Marker coordinate={{
        latitude: this.props.screenProps.currentLatitude,
        longitude: this.props.screenProps.currentLongitude,
        }}  />
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