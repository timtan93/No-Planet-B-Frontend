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
import { ProgressCircle } from "react-native-svg-charts";

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
    name: null
  };

  getCurrentTime = () => {
    var today = new Date();
    var time =
      today.getDate() + '-' + today.getMonth() + '-' + today.getFullYear() + '@' + today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
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

  dates = () => {
    const items = this.props.screenProps.items;
    const unformattedDates = items.map(item => item.created_at);
    const dates = unformattedDates.map(unformattedDate =>
      unformattedDate.slice(0, 10)
    );
    const today = new Date();
    const lastweek= new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
    const dd = String(lastweek.getDate()).padStart(2, "0");
    const mm = String(lastweek.getMonth() + 1).padStart(2, "0"); //January is 0!
    const yyyy = lastweek.getFullYear();

    const dateLastWeek = yyyy + "-" + mm + "-" + dd;
    
    const week = dates.filter(date => date > dateLastWeek )
    return week.length
  };

  render() {
    const number = this.dates() 
    return (
      <View style={styles.container}>
        <Text style={styles.header}>
          You have logged {number} items items in the last week{" "}
        </Text>
        <ProgressCircle
          style={{ height: 200 }}
          progress={number/7}
          progressColor={"#66FCF1"}
          // backgroundColor={"#1F2833"}
          strokeWidth={20}
        />
          <Text style={styles.header}>
          Select the most relevant tag to start logging litter
        </Text>
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
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1F2833"
  },
  buttonContainer: {
    flexDirection: "row",
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
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
  },
  header: {
    fontSize: 15,
    color: "white",
    alignSelf: "center",
    paddingTop: 20,
    paddingBottom: 20,

  }
});
