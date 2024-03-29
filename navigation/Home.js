import React from "react";
import {
  AsyncStorage,
  StyleSheet,
  View,
} from "react-native";
import { Location, Permissions } from "expo";
import MainTabNav from "./MainTabNav";

export default class Home extends React.Component {
  state = {
    items: [],
    latitude: 51.5202146,
    longitude: -0.0877691,
  };

  _signOutAsync = async () => {
    await AsyncStorage.clear();
    this.props.navigation.navigate("Auth");
  };

  addLoggedItem = item => {
    const items = this.state.items;
    this.setState({
      items: [...items, item]
    });
  };

  componentDidMount() {
    API.getItems()
      .then(data => {
        this.setState({
          items: data
        });
      })
      .then((data) => this.getLocation())

  }

  getLocation = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== "granted") {
      this.setState({
        errorMessage: "Permission to access location was denied"
      });
    }
    let location = await Location.getCurrentPositionAsync({});
    this.setState({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      coords: location.coords
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <MainTabNav
          screenProps={{
            latitude: this.state.latitude,
            longitude: this.state.longitude,
            items: this.state.items,
            signOut: this._signOutAsync,
            addLoggedItem: this.addLoggedItem,
            openDrawer: this.props.navigation.openDrawer,
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  }
});

