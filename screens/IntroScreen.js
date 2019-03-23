import React from "react";
import {
  Button,
  View,
  Text,
  ImageBackground,
  StyleSheet,
  ScrollView
} from "react-native";
import API from "../API";
import { AntDesign, Feather } from "@expo/vector-icons";
export default class DashBoardScreen extends React.Component {
  render() {
    return (
      <ImageBackground
        source={require("../app/img/turtle.jpg")}
        style={styles.container}
        blurRadius={1}
      >
        <ScrollView style={styles.scrollView}>
          <View style={styles.paragraph}>
            <View
              style={{ flexDirection: "row", justifyContent: "space-around" }}
            >
              <AntDesign name="tags" size={90} color="black" />
              <AntDesign name="camera" size={90} color="black" />
              <Feather name="trash-2" size={90} color="black" />
            </View>
            <View
              style={{ flexDirection: "row", justifyContent: "space-around" }}
            >
              <Text>Tag</Text>
              <Text>Snap</Text>
              <Text>Dispose</Text>
            </View>
            <Text
              style={{
                fontWeight: "bold",
                color: "black",
                paddingTop: 50,
                fontSize: 15
              }}
            >
              Litter is everywhere. Plastic bottles, straws, and cigarette butts
              destroy our beaches, choke turtles, and threaten the planet. Lets
              tackle this problem one piece of litter at a time. 
            </Text>
            <Text
              style={{
                fontWeight: "bold",
                color: "black",
                paddingTop: 20,
                fontSize: 15
              }}
            >
              Geotags provide an into problem areas, while hashtags help identify the most
              commonly found items. The aim of this app is to collect data and
              work with local councils to find sustainable solutions.
            </Text>
          </View>
          <Button
            title={"SignIn"}
            onPress={() => this.props.navigation.navigate("SignIn")}
          />
        </ScrollView>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ecf0f1"
  },
  input: {
    width: 200,
    height: 44,
    padding: 10,
    borderWidth: 1,
    borderColor: "black",
    marginBottom: 10
  },
  button: {
    width: 50,
    height: 50,
    marginBottom: 10,
    marginLeft: 10,
    backgroundColor: "cyan",
    borderRadius: 10
  },
  paragraph: {
    width: 300,
    paddingTop: 100
  },
  scrollView: {
    paddingTop: 50
  }
});
