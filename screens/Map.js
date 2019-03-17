import React from 'react';
import { MapView, Constants, View} from 'expo';
import { Alert } from 'react-native'


export default class Map extends React.Component {
    
    componentWillMount(){
        Alert.alert(
            'Thanks for helping create a litter free future',
            '',
            [
              {text: 'Log more', onPress: () => {this.props.logMoreLitter()}},
              {text: 'View Map', onPress: () => console.log('View Map')},
            ],
            { cancelable: false }
          )
    }

  render() {
    return (
        <MapView
        style={{ width:420, height:800, paddingTop: Constants.statusBarHeight}}
        initialRegion={{
          latitude: this.props.latitude,
          longitude: this.props.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      />
      
    );
  }
}