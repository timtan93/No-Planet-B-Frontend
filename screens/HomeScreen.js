import React from "react";
import {
  View,
  Dimensions,
  Alert,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Button
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { Permissions, ImagePicker } from "expo";
import { RNS3 } from "react-native-aws3";
const DeviceWidth = Dimensions.get("window").width;

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    title: "Home",
    tabBarIcon: ({ focused, tintColor }) => {
      return <AntDesign name="home" size={25} color={tintColor} />;
    }
  };

  state = {
    imageURL: null,
    uri: null,
    name: null,
    thisWeek: null,
  };
  

  getCurrentTime = () => {
    var today = new Date();
    var time =
      today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    return time;
  };

  handleNoImage = () => {
    item = {
      name: this.state.name,
      latitude: this.props.screenProps.latitude,
      longitude: this.props.screenProps.longitude,
      image: null
    };
    API.logItem(item).then(item => this.props.screenProps.addLoggedItem(item));
  };

  handleTagSelect(name) {
    this.setState({
      name: name
    });
    Alert.alert(
      "Thanks for logging litter",
      "Would you like to include an image?",
      [
        { text: "Yes", onPress: () => this.cameraHandler() },
        {
          text: "No",
          onPress: () => this.handleNoImage(),
          style: "cancel"
        }
      ],
      { cancelable: false }
    );
  }
  galleryHandler = async () => {
    const permissions = Permissions.CAMERA_ROLL;
    const { status } = await Permissions.askAsync(permissions);
  };

  cameraHandler = async () => {
    this.galleryHandler();
    const permissions = Permissions.CAMERA;
    const { status } = await Permissions.askAsync(permissions);
    console.log(permissions, status);
    if (status === "granted") {
      let image = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [4, 4],
        quality: 0.2
      }).catch(error => console.log(permissions, { error }));
      this.setState({
        uri: image.uri
      });
      console.log(permissions, "SUCCESS", image);
      this.handleSelectedImage();
    }
  };

  handleSelectedImage = () => {
    const file = {
      uri: this.state.uri,
      name: `${this.getCurrentTime()}+${this.state.name}`,
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
        imageURL: response.body.postResponse.location,
        uploadedImageName: response.body.postResponse.etag
      });
      const latitude = this.props.screenProps.latitude;
      const longitude = this.props.screenProps.longitude;
      const item = {
        name: `${this.state.name}`,
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


  render() {
    return (
      <View style={styles.buttonContainer}>
        <View>
          <TouchableOpacity onPress={e => this.handleTagSelect("Plastic")}>
            <View style={(style = styles.button)}>
              <Text style={styles.text}>Plastic</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={e => this.handleTagSelect("Cigarette")}>
            <View style={(style = styles.button)}>
              <Text style={styles.text}>Cigarette</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={e => this.handleTagSelect("Paper")}>
            <View style={(style = styles.button)}>
              <Text style={styles.text}>Paper</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity onPress={e => this.handleTagSelect("Can")}>
            <View style={(style = styles.button)}>
              <Text style={styles.text}>Can</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={e => this.handleTagSelect("Bottle")}>
            <View style={(style = styles.button)}>
              <Text style={styles.text}>Bottle</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={e => this.handleTagSelect("Bag")}>
            <View style={(style = styles.button)}>
              <Text style={styles.text}>Bag</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity onPress={e => this.handleTagSelect("Bottlecap")}>
            <View style={(style = styles.button)}>
              <Text style={styles.text}>BottleCap</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={e => this.handleTagSelect("Cup")}>
            <View style={(style = styles.button)}>
              <Text style={styles.text}>Cup</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={e => this.handleTagSelect("Straw")}>
            <View style={(style = styles.button)}>
              <Text style={styles.text}>Straw</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  
  buttonContainer: {
    flexDirection: "row",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1F2833"
  },
  button: {
    width: DeviceWidth * 0.2,
    height: DeviceWidth * 0.2,
    marginBottom: 10,
    marginLeft: 10,
    backgroundColor: "#66FCF1",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "space-around"
  },
  text: {
    fontWeight: "bold"
  }
});
