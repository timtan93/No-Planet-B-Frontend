import React from "react";
import {
  Text,
  ActivityIndicator,
  AsyncStorage,
  Button,
  StatusBar,
  StyleSheet,
  View,
  TouchableOpacity
} from "react-native";
import { Constants, Permissions, ImagePicker } from "expo";
import {
  AntDesign,
  MaterialCommunityIcons,
  MaterialIcons
} from "@expo/vector-icons";
import { RNS3 } from "react-native-aws3";
export default class CameraScreen extends React.Component {
  static navigationOptions = {
    title: `Log An Item`
  };

  state = {
    uploadedPic: true,
    imageURL: null,
    uploadedImageName: null,
    uri: null
  };

  galleryHandler = async () => {
    const permissions = Permissions.CAMERA_ROLL;
    const { status } = await Permissions.askAsync(permissions);
    // console.log(permissions, status);
    if (status === "granted") {
      let image = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [4, 4],
        quality: 0.2
      }).catch(error => console.log(permissions, { error }));
      this.setState({
        uri: image.uri
      });
      // console.log(permissions, 'SUCCESS', image);
    }

    this.handleSelectedImage();
  };

  cameraHandler = async () => {
    const permissions = Permissions.CAMERA;
    const { status } = await Permissions.askAsync(permissions);
    // console.log(permissions, status);
    if (status === "granted") {
      let image = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [4, 4],
        quality: 0.2
      }).catch(error => console.log(permissions, { error }));
      this.setState({
        uri: image.uri
      });
      // console.log(permissions, 'SUCCESS', image);
    }
    this.handleSelectedImage();
  };

  handleSelectedImage = () => {
    const file = {
      uri: this.state.uri,
      name: `${this.getCurrentTime()}`,
      type: "image/png"
    };

    const options = {
      bucket: "mod5-recycle",
      region: "eu-west-2",
      accessKey: "AKIAJ2DDE7SSXSHEEPUA",
      secretKey: "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",
      successActionStatus: 201
    };
    RNS3.put(file, options).then(response => {
      if (response.status !== 201) {
        // console.error(response)
        throw new Error("Failed to upload image to S3");
      } else {
      }
      // console.log(response.body.postResponse);
      this.setState({
        uploadedPic: true,
        imageURL: response.body.postResponse.location,
        uploadedImageName: response.body.postResponse.etag
      });
      const latitude = this.props.screenProps.latitude;
      const longitude = this.props.screenProps.latitude;
      const item = {
        name: this.state.uploadedImageName,
        latitude: latitude,
        longitude: longitude,
        image: this.state.imageURL
      };
      // console.log(item)
      API.logItem(item).then(item =>
        this.props.screenProps.addLoggedItem(item)
      );
      // this.popUp()
    });
  };

  popUp = () => {
    Alert.alert(
      "Alert Title",
      "My Alert Msg",
      [
        {
          text: "Ask me later",
          onPress: () => console.log("Ask me later pressed")
        },
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "OK", onPress: () => console.log("OK Pressed") }
      ],
      { cancelable: false }
    );
  };

  getCurrentTime = () => {
    var today = new Date();
    var time =
      today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    return time;
  };

  //   _signOutAsync = async () => {
  //     await AsyncStorage.clear();
  //     this.props.navigation.navigate('Auth');
  //   };

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.button} onPress={this.galleryHandler}>
          <MaterialCommunityIcons name="image-album" size={50} color="cyan" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={this.cameraHandler}>
          <AntDesign name="camera" size={50} color="cyan" />
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#383838"
  }
});
