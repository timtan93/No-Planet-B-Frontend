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
    first_name: "",
    second_name: "",
    email: "",
    password: ""
    // passwordtwo: ""
  };

  SignUp = () => {
    if (this.validation()){
    API.signup(this.state).then(data => {
      if (data.error) {
        Alert.alert(data.error);
      } else {
        this.props.navigation.navigate("SignIn")
      }
    });
  }
  };

  validation = () => {
    if (this.state.first_name == ""){
    Alert.alert('Please enter your first name')
    return false
    }else if (this.state.second_name == ""){
      Alert.alert('Please enter your second name')
      return false
    }else if (this.state.email == ""){
      Alert.alert('Please enter email address')
      return false
    }else if (this.state.password == ""){
        Alert.alert('Please enter a password')
        return false
  } else {
    return true
  }
}
  _signInAsync = async data => {
    await AsyncStorage.setItem("token", data.token);
    this.props.navigation.navigate("App");
  };

  // onLogin() {
  //   API.signin(this.state).then(data => {
  //     if (data.error) {
  //       Alert.alert(data.error);
  //     } else {
  //       this.props.navigation.navigate("SignIn")
  //     }
  //   });
  // }

  render() {
    return (
      <ImageBackground
        source={require("../app/img/turtle.jpg")}
        style={styles.container}
        blurRadius={1}
      >
        <TextInput
          value={this.state.first_name}
          onChangeText={first_name => this.setState({ first_name })}
          placeholder={"First Name"}
          placeholderTextColor={"grey"}
          style={styles.input}
        />
        <TextInput
          value={this.state.second_name}
          onChangeText={second_name => this.setState({ second_name })}
          placeholder={"Second Name"}
          placeholderTextColor={"grey"}
          style={styles.input}
        />
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
          placeholder={"Select a Password"}
          secureTextEntry={true}
          placeholderTextColor={"grey"}
          style={styles.input}
        />
        {/* <TextInput
          value={this.state.passwordtwo}
          onChangeText={passwordtwo => this.setState({ passwordtwo })}
          placeholder={"Verify"}
          secureTextEntry={true}
          placeholderTextColor={"grey"}
          style={styles.input}
        /> */}

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
        <TouchableOpacity
          style={{ paddingBottom: 10 }}
          onPress={() =>  this.SignUp()}
        >
          <View style={(style = styles.button)}>
            <Text style={styles.text}>Sign Up</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ paddingBottom: 10 }}
          onPress={() => this.props.navigation.navigate("SignIn")}
        >
          <View style={(style = styles.button)}>
            <Text style={styles.text}>Sign In</Text>
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
    alignSelf: "center"
  },
  text: {
    fontWeight: "bold"
  }
});
