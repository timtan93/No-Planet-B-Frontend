import React from 'react';
import { MapView, Constants} from 'expo';
import { View, StyleSheet, Image, ScrollView } from 'react-native';



export default class Map extends React.Component {
  static navigationOptions = {
    title: `Map`
  };

  render() {
    const { navigation } = this.props;
    const latitude = navigation.getParam('latitude',  51.566022);
    const longitude = navigation.getParam('longitude', -0.060651);
    const items = navigation.getParam('items')
    const userItemsMarkers = items.map(item => <MapView.Marker  coordinate={item} key={item.name} title={item.name} pinColor={'darkblue'}/>)
    const userItemImages = items.map(item => <Image source={{uri: item.image, width: 300, height: 300}} key={item.name} />)
    console.log(items)
    return (
      <View style={styles.container}>
        <MapView
        style={{ width:420, height:400, paddingTop: Constants.statusBarHeight}}
        initialRegion={{
          latitude: latitude,
          longitude: longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
    {userItemsMarkers}
    </MapView>
    <ScrollView contentContainerStyle={styles.contentContainer}>
      {userItemImages}
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
