import React from "react";
import {
  Alert,
  AsyncStorage,
  Button,
  StyleSheet,
  TextInput,
  ImageBackground,
  TouchableOpacity,
  View,
  Text
} from "react-native";
import API from "../API";

export default class SignInScreen extends React.Component {
  state = {
    email: "",
    password: ""
  };

  SignUp = () => {
    this.props.navigation.navigate("SignUp");
  };
  _signInAsync = async data => {
    await AsyncStorage.setItem("token", data.token);
    this.props.navigation.navigate("App");
  };

  onLogin() {
    API.signin(this.state).then(data => {
      if (data.error) {
        Alert.alert(data.error);
      } else {
        this._signInAsync(data);
      }
    });
  }

  render() {
    return (
      <ImageBackground
        source={require("../app/img/turtle.jpg")}
        style={styles.container}
        blurRadius={1}
      >
        <TextInput
          value={this.state.email}
          onChangeText={email => this.setState({ email })}
          placeholder={"Email"}
          placeholderTextColor={"grey"}
          style={styles.input}
        />
        <TextInput
          value={this.state.password}
          onChangeText={password => this.setState({ password })}
          placeholder={"Password"}
          secureTextEntry={true}
          placeholderTextColor={"grey"}
          style={styles.input}
        />

        {/* <Button
          title={"Login"}
          style={styles.input}
          onPress={this.onLogin.bind(this)}
        />
        <Button
          title={"SignUp"}
          style={styles.input}
          onPress={() => this.props.navigation.navigate("Welcome")}
        /> */}
                  <TouchableOpacity style={{paddingBottom: 10}} onPress={this.onLogin.bind(this)}>
            <View style={(style = styles.button)}>
              <Text style={styles.text}>Sign In</Text>
            </View >
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.props.navigation.navigate("SignUp")}>
            <View style={(style = styles.button)}>
              <Text style={styles.text}>Sign Up</Text>
            </View>
          </TouchableOpacity>
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
    borderWidth: 2,
    borderColor: "black",
    marginBottom: 10,
    borderRadius: 10
  },
  button: {
    width: 100,
    height: 44,
    backgroundColor: "#66FCF1",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "space-around",
    alignSelf:'center',
  },
  text: {
    fontWeight: "bold"
  }
});
