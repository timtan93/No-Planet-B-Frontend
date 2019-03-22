//This is an example code to show image in a button//
import React, { Component } from 'react';
//import react in our code.
 
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
//import all the components we are going to use.
 
export default class App extends Component<{}> {
  render() {
    return (
      <View style={styles.MainContainer}>
        <TouchableOpacity style={styles.FacebookStyle} activeOpacity={0.5}>
          {/*We can use any component which is used to shows something inside 
             TouchableOpacity. It shows the item inside in horizontal orientation */}
          <Image
            //We are showing the Image from online
            source={{
              uri:
                'http://aboutreact.com/wp-content/uploads/2018/08/facebook.png.png',
            }}
            //You can also show the image from you project directory like below
            //source={require('./Images/facebook.png')}
            //Image Style
            style={styles.ImageIconStyle}
          />
          <View style={styles.SeparatorLine} />
          <Text style={styles.TextStyle}> Login Using Facebook </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.GooglePlusStyle} activeOpacity={0.5}>
          <Image
            //We are showing the Image from online
            source={{
              uri:
                'http://aboutreact.com/wp-content/uploads/2018/08/google-plus.png',
            }}
            //You can also show the image from you project directory like below
            //source={require('./Images/google-plus.png')}
            //Image Style
            style={styles.ImageIconStyle}
          />
          <View style={styles.SeparatorLine} />
          <Text style={styles.TextStyle}> Login Using Google Plus </Text>
        </TouchableOpacity>
      </View>
    );
  }
}
 
const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
  },
  GooglePlusStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#dc4e41',
    borderWidth: 0.5,
    borderColor: '#fff',
    height: 40,
    width: 220,
    borderRadius: 5,
    margin: 5,
  },
  FacebookStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#485a96',
    borderWidth: 0.5,
    borderColor: '#fff',
    height: 40,
    width: 220,
    borderRadius: 5,
    margin: 5,
  },
  ImageIconStyle: {
    padding: 10,
    margin: 5,
    height: 25,
    width: 25,
    resizeMode: 'stretch',
  },
  TextStyle: {
    color: '#fff',
    marginBottom: 4,
    marginRight: 20,
  },
  SeparatorLine: {
    backgroundColor: '#fff',
    width: 1,
    height: 40,
  },
});
 