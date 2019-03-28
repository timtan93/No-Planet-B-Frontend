import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity, TextInput
} from "react-native";
import {
Feather
} from "@expo/vector-icons";

export default class OptionsScreen extends React.Component {
  state ={
    email : "",
  }
  static navigationOptions = {
    title: "Settings",
    tabBarIcon: ({ focused, tintColor }) => {
      return <Feather name="settings" size={25} color={tintColor} />;
    }
  };

  render() {
    return (
       <View style={(styles.container)}>
          {/* <TouchableOpacity style={{paddingBottom: 10}} onPress={() => this.props.navigation.navigate("UpdateUser")}>
            <View style={(style = styles.button)}>
              <Text style={styles.text}>Update User Info</Text>
            </View >
          </TouchableOpacity> */}
        <TouchableOpacity
          style={{ paddingBottom: 10 }}
          onPress={() => this.props.screenProps.signOut()}
        >
          <View style={(style = styles.button)}>
            <Text style={styles.text}>Sign Out</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
    backgroundColor: "#1F2833",
    flex: 1,
    paddingTop: 30
  },
  button: {
    width: 100,
    height: 44,
    backgroundColor: "#66FCF1",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "space-around",
    alignSelf: "center",

  },
  text: {
    fontWeight: "bold"
  },  
  input: {
    width: 200,
    height: 44,
    padding: 10,
    borderWidth: 2,
    borderColor: "black",
    marginBottom: 10,
    borderRadius: 10,
    alignSelf:'center'
  },
  longButton: {
    width: 200,
    height: 44,
    backgroundColor: "#66FCF1",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "space-around",
    alignSelf: "center",
  },
});