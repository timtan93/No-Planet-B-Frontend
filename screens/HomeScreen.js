import React from "react";
import {
  View,
  Dimensions,
  Alert,
  Text,
  StyleSheet,
  TouchableOpacity
} from "react-native";

const DeviceWidth = Dimensions.get("window").width;
export default class HomeScreen extends React.Component {
  static navigationOptions = {
    title: "Welcome to the app!"
  };

  handleClick(item) {
    console.log("this is a:", item);
  }

  render() {
    return (
      <View style={styles.container}>
        <View>
          <TouchableOpacity onPress={e => this.handleClick("Plastic")}>
            <View style={style=styles.button}>
            <Text style={styles.text}>Plastic</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={e => this.handleClick("Cigarette")}>
          <View style={style=styles.button}>
            <Text style={styles.text}>Cigarette</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={e => this.handleClick("Paper")}>
          <View style={style=styles.button}>
            <Text style={styles.text}>Paper</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity onPress={e => this.handleClick("Can")}>
          <View style={style=styles.button}>
            <Text style={styles.text}>Can</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={e => this.handleClick("Bottle")}>
          <View style={style=styles.button}>
            <Text style={styles.text}>Bottle</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={e => this.handleClick("Bag")}>
          <View style={style=styles.button}>
            <Text style={styles.text}>Bag</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity onPress={e => this.handleClick("Bottlecap")}>
          <View style={style=styles.button}>
            <Text style={styles.text}>BottleCap</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={e => this.handleClick("Cup")}>
          <View style={style=styles.button}>
            <Text style={styles.text}>Cup</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={e => this.handleClick("Straw")}>
          <View style={style=styles.button}>
            <Text style={styles.text}>Straw</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#383838"
  },
  button: {
    width: DeviceWidth * 0.2,
    height: DeviceWidth * 0.2,
    marginBottom: 10,
    marginLeft: 10,
    backgroundColor: "cyan",
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  text: {
    fontWeight: 'bold',

  }
});
