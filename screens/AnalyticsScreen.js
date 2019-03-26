import React from "react";
import { BarChart, Grid, YAxis } from "react-native-svg-charts";
import * as scale from "d3-scale";
import { View, StyleSheet, ScrollView, Text, TouchableOpacity } from "react-native";
import { MapView } from "expo";
import { FontAwesome } from "@expo/vector-icons";
export default class Chart extends React.PureComponent {
  static navigationOptions = {
    title: "Analytics"
  };

  state = {
    items: []
  };

  componentDidMount() {
    API.getAllItems().then(items => {
      this.setState({
        items: items
      });
    });
  }

  refresh = () => {
    API.getAllItems().then(items => {
      this.setState({
        items: items
      });
    });
  }
  pinColor = name => {
    switch (name) {
      case "Plastic":
        return "red";
        break;
      case "Can":
        return "blue";
        break;
      case "BottleCap":
        return "green";
        break;
      case "Cigarette":
        return "cyan";
        break;
      case "Bottle":
        return "orange";
        break;
      case "Cup":
        return "yellow";
        break;
      case "Paper":
        return "purple";
        break;
      case "Bag":
        return "lightblue";
        break;
      case "Straw":
        return "khaki";
    }
  };
  pinImage = (name) => {
    switch (name) {
      case "Plastic":
        return require('../app/img/plastic.png');
        break;
      case "Can":
        return require('../app/img/can.png');
        break;
      case "BottleCap":
        return require('../app/img/bottlecap.png');
        break;
      case "Cigarette":
        return require('../app/img/cigarette.png');
        break;
      case "Bottle":
        return require('../app/img/bottle.png');
        break;
      case "Cup":
        return require('../app/img/cup.png');
        break;
      case "Paper":
        return require('../app/img/paper.png');
        break;
      case "Bag":
        return require('../app/img/bag.png');
        break;
      case "Straw":
        return require('../app/img/straw.png');
    }
  };
  render() {
    const latitude = this.props.screenProps.latitude;
    const longitude = this.props.screenProps.longitude;
    const items = this.state.items
    const plastic = items.filter(item => item.name === "Plastic")
    const can = items.filter(item => item.name === "Can")
    const bottleCap = items.filter(item => item.name === "BottleCap")
    const cigarette = items.filter(item => item.name === "Cigarette")
    const bottle = items.filter(item => item.name === "Bottle")
    const cup = items.filter(item => item.name === "Cup")
    const paper = items.filter(item => item.name === "Paper")
    const bag = items.filter(item => item.name === "Bag")
    const straw = items.filter(item => item.name === "Straw") 
    const itemMarkers = items.map(item => (
      <MapView.Marker
        coordinate={item}
        key={item.id}
        title={item.name}
        // pinColor={this.pinColor(item.name)}
        image={this.pinImage(item.name)}
      />
    ));
    const data = [
      {
        value: plastic.length,
        label: "Plastic"
      },
      {
        value: can.length,
        label: "Can"
      },
      {
        value: bottleCap.length,
        label: "BottleCap"
      },
      {
        value: cigarette.length,
        label: "Cigarette"
      },
      {
        value: bottle.length,
        label: "Bottle"
      },
      {
        value: cup.length,
        label: "Cup"
      },
      {
        value: paper.length,
        label: "Paper"
      },
      {
        value: bag.length,
        label: "Bag"
      },
      {
        value: straw.length,
        label: "Straw"
      }
    ];

    return (
      <View style={{flex: 1, backgroundColor: "#1F2833"}}>
        <MapView
          style={{ alignSelf: "stretch", height: 400 }}
          region={{
            latitude: latitude,
            longitude: longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421
          }}
        >
          {itemMarkers}
        </MapView>
        <View style={{ paddingTop: 20 }} />
        <View
          style={{ flexDirection: "row", height: 200, paddingVertical: 16, width: 400 }}
        >
          <YAxis
            data={data}
            yAccessor={({ index }) => index}
            scale={scale.scaleBand}
            contentInset={{ top: 10, bottom: 10 }}
            spacing={0.5}
            formatLabel={(_, index) => data[index].label}
            svg={{ fill: "grey" }}
          />
          <BarChart
            style={{ flex: 1, marginLeft: 8 }}
            data={data}
            horizontal={true}
            yAccessor={({ item }) => item.value}
            svg={{ fill: "#66FCF1" }}
            contentInset={{ top: 10, bottom: 10 }}
            spacing={0.2}
            gridMin={0}
          >
            <Grid direction={Grid.Direction.VERTICAL}
             svg={{ fill: "grey" }} />
          </BarChart>
        </View>
        <TouchableOpacity style={{paddingLeft: 20}} onPress={() =>this.refresh() }>
        <FontAwesome name="refresh" size={90} color="green" />
        </TouchableOpacity>
      </View>
    );
  }
}
