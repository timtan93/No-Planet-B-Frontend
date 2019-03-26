import React, { Component } from "react";
import ImageLayout from "react-native-image-layout";
import {
  Entypo
  } from "@expo/vector-icons";

export default class ImageScreen extends React.Component {
  static navigationOptions = {
    title: "Images",
    tabBarIcon: ({ focused, tintColor }) => {
      return <Entypo name="images" size={25} color={tintColor} />;
    }
  };
  render() {
    const items = this.props.screenProps.items;
    const hasImages = items.filter(item => item.image)
    const userItemImages = hasImages.map(item => {
      return { uri: item.image}
    })
    return (
        <ImageLayout
            images={
              userItemImages
            }
        />
    );
}
}