import React from "react";
import { BarChart, Grid, YAxis, PieChart } from "react-native-svg-charts";
import * as scale from "d3-scale";
import { View, StyleSheet, ScrollView, Text, TouchableOpacity, Dimensions } from "react-native";
import { MapView } from "expo";
import { DataTable } from 'react-native-paper';
import { FontAwesome } from "@expo/vector-icons";
const DeviceWidth = Dimensions.get("window").width;
const DeviceHeight = Dimensions.get("window").height;
export default class Chart extends React.PureComponent {
  static navigationOptions = {
    title: "Analytics"
  };

  state = {
    items: [],
    sortedItems: []
  };

  componentDidMount() {
    API.getAllItems().then(items => {
      this.setState({
        items: items
      });
    }).then(data => this.countTags(this.state.items))
  }

  refresh = () => {
    API.getAllItems().then(items => {
      this.setState({
        items: items
      })
    }).then(data => this.countTags(this.state.items))
  }

  countTags = itemObjects => {
    const total = itemObjects.length
    const items = itemObjects.map(item => item.name)
    let stats = [];
    let sliced = items.slice(0);
    for (var i = 0; i < items.length; i++) {
      var count = 0;
      for (var x = 0; x < sliced.length; x++) {
        if (items[i] == sliced[x]) {
          count++;
          delete sliced[x];
        }
      }

      if (count > 0) {
        var a = {};
        a.tag = items[i];
        a.number = ((count/total)*100);
        stats.push(a);
      }
    }
    const sorted = stats.sort((a, b) => (a.number < b.number) ? 1 : -1)
    this.setState({
      sortedItems: sorted
    })
  };

 
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
    const sortedItems = this.state.sortedItems
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
    const itemRows = sortedItems.map(item =>(
      <DataTable.Row key={item.tag}>
      <DataTable.Cell >{item.tag}</DataTable.Cell>
      <DataTable.Cell numeric>{item.number.toFixed(2)}%</DataTable.Cell>
    </DataTable.Row>
    ))
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
          style={{ alignSelf: "stretch", height: DeviceHeight*0.4 }}
          region={{
            latitude: latitude,
            longitude: longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421
          }}
        >
          {itemMarkers}
        </MapView>
        <View style={{ paddingTop: 10 }} />
        <View
          style={{ borderRadius:10, flexDirection: "row", height: DeviceHeight*0.4, paddingVertical: 16,  width: DeviceWidth*0.9, alignSelf: 'center' }}
        >
        <ScrollView style={{}}>
           <DataTable style={{borderRadius: 10, backgroundColor:"#66FCF1"}}>
        <DataTable.Header>
          <DataTable.Title>Tag</DataTable.Title>
          <DataTable.Title numeric>Percentage</DataTable.Title>
        </DataTable.Header>
        {itemRows}
      </DataTable>
      </ScrollView>
        </View>
        <TouchableOpacity style={{paddingLeft: 20, flexDirection: 'row'}} onPress={() =>this.refresh() }>
        <FontAwesome name="refresh" size={50} color="green" />
        <Text style={{paddingTop: 16, color: 'green'}}> Refresh Data </Text>
        </TouchableOpacity>
      </View>
    );
  }
}
