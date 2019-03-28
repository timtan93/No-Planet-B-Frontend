import React from "react";
import { MapView, Constants } from "expo";
import { View, StyleSheet, Image, ScrollView } from "react-native";
import { Feather } from "@expo/vector-icons";


export default class Map extends React.Component {
  static navigationOptions = {
    title: "Map",
    tabBarIcon: ({ focused, tintColor }) => {
      return <Feather name="map" size={25} color={tintColor} />;
    }
  };

  pinImage = (name) => {
    switch (name) {
      case "Plastic":
        return require('../app/img/plastic.png');
        break;
      case "Can":
        return require('../app/img/can.png');
        break;
      case "Bottlecap":
        return require('../app/img/bottlecap.png');
        break;
      case "Cigarette":
        return require('../app/img/cigarette.png');
        break;
      case "Bottle":
        return require('../app/img/bottle.png');
        break;
      case "Cup":
        return require('../app/img/cup.png');
        break;
      case "Paper":
        return require('../app/img/paper.png');
        break;
      case "Bag":
        return require('../app/img/bag.png');
        break;
      case "Straw":
        return require('../app/img/straw.png');
    }
  };

 
  render() {
    const latitude = this.props.screenProps.latitude;
    const longitude = this.props.screenProps.longitude;
    const items = this.props.screenProps.items;
    const itemsMarkers = items.map(item => (
      <MapView.Marker
        coordinate={item}
        key={item.id}
        title={item.name}
        image={this.pinImage(item.name)}
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
        region={{
          latitude: latitude,
          longitude: longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421
        }}
        initialRegion={{
          latitude: 51.5202146,
          longitude: -0.0877691,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421
        }}
      >
        {itemsMarkers}
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
