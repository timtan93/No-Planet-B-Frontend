import React from 'react';
import {
  Alert,
  ActivityIndicator,
  AsyncStorage,
  Button,
  StatusBar,
  StyleSheet,
  View,
  TextInput, Text,
ImageBackground} from 'react-native';
import API from '../API'


export default class  WelcomeScreen extends React.Component {
        

      
        render() {
          return (
            <ImageBackground source={require('../app/img/heatmap.png')} style={styles.container}>
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
