import React, { Component } from "react";
import ImageLayout from "react-native-image-layout";


export default class ImageScreen extends React.Component {
  static navigationOptions = {
    title: "Images"
  };
  render() {
    const items = this.props.screenProps.items;
    const userItemImages = items.map(item => {
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