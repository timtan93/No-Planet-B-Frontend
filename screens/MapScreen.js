import React from "react";
import { MapView, Constants } from "expo";
import { View, StyleSheet, Image, ScrollView } from "react-native";
import {
  Feather,
} from "@expo/vector-icons";
export default class Map extends React.Component {
  static navigationOptions = {
    title: "Map",
    tabBarIcon: ({ focused, tintColor }) => {
      return <Feather name="map" size={25} color={tintColor} />;
    }
  };

  render() {
    const latitude = this.props.screenProps.latitude;
    const longitude = this.props.screenProps.longitude;
    const items = this.props.screenProps.items;
    const userItemsMarkers = items.map(item => (
      <MapView.Marker
        coordinate={item}
        key={item.id}
        title={item.name}
        pinColor={"darkblue"}
      />
    ));
    // const userItemImages = items.map(item => (
    //   <Image
    //     source={{ uri: item.image, width: 300, height: 300 }}
    //     key={item.name}
    //   />
    // ));
    return (
      // <View style={styles.container}>
        <MapView
          style={{
            // width: 420,
            // height: 400,
            // paddingTop: Constants.statusBarHeight
            flex: 1
          }}
          initialRegion={{
            latitude: latitude,
            longitude: longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421
          }}
        >
          {userItemsMarkers}
        </MapView>
        /* <ScrollView contentContainerStyle={styles.contentContainer}>
          {userItemImages}
        </ScrollView> */
      // </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    // paddingTop: Constants.statusBarHeight,
    backgroundColor: "#383838"
  },
  contentContainer: {
    paddingVertical: 20
  }
});
