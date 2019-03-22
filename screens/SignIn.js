import React from 'react';
import {
  Alert,
  ActivityIndicator,
  AsyncStorage,
  Button,
  StatusBar,
  StyleSheet,
  View,
  TextInput,
ImageBackground} from 'react-native';
import API from '../API'


export default class  SignInScreen extends React.Component {
        

          
          state = {
            email: '',
            password: '',
          }
        
        SignUp = () => {
          this.props.navigation.navigate('SignUp')
        }
        _signInAsync = async (data) => {
            await AsyncStorage.setItem('token', data.token);
            this.props.navigation.navigate('App');
          };
      
       

        onLogin() {   
          API.signin(this.state).then(data => {
              if(data.error){
                 Alert.alert(data.error)
              } else {
                this._signInAsync(data)
              }
          })
        }
      
        render() {
          return (
            <ImageBackground source={require('../app/img/turtle.jpg')} style={styles.container}>
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
               <Button
                title={'SignUp'}
                style={styles.input}
                onPress={() => this.props.navigation.navigate('Welcome')}
              />
            
              </ImageBackground>
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

  
    
