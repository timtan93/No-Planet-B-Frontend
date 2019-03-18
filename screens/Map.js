import React from 'react';
import { MapView, Constants} from 'expo';
import { View, StyleSheet } from 'react-native';


export default class Map extends React.Component {
    
    // componentWillMount(){
    //     Alert.alert(
    //         'Thanks for helping create a litter free future',
    //         '',
    //         [
    //           {text: 'Log more', onPress: () => {this.props.logMoreLitter()}},
    //           {text: 'View Map', onPress: () => console.log('View Map')},
    //         ],
    //         { cancelable: false }
    //       )
    // }

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