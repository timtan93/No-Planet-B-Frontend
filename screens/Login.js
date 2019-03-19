import React, { Component } from 'react';
import { Alert, Button, TextInput, View, StyleSheet } from 'react-native';
import { AsyncStorage } from 'react-native'
import API from '../API'
export default class Login extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      email: '',
      password: '',
    };
  }
  signin = user => {
    AsyncStorage.setItem("token", user.token);
    this.setState({ username: user.username });
  };

  signout = () => {
    AsyncStorage.removeItem("token");
    this.setState({ username: "" });
  };


  onLogin() {   
    console.log(this.state)  
    API.signin(this.state).then(data => {
        if(data.error){
           Alert.alert("something is wrong")
        } else {
            this.props.setUserID(data)
        }
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          value={this.state.email}
          onChangeText={(email) => this.setState({ email })}
          placeholder={'email'}
          style={styles.input}
        />
        <TextInput
          value={this.state.password}
          onChangeText={(password) => this.setState({ password })}
          placeholder={'Password'}
        //   secureTextEntry={true}
          style={styles.input}
        />
        
        <Button
          title={'Login'}
          style={styles.input}
          onPress={this.onLogin.bind(this)}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
  },
  input: {
    width: 200,
    height: 44,
    padding: 10,
    borderWidth: 1,
    borderColor: 'black',
    marginBottom: 10,
  },
});
