import { AsyncStorage } from "react-native";

class API {

  static signin(user) {
    return fetch(`http://192.168.1.68:3000/signin`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user)
    }).then(data => data.json());
  }

  static signup(user) {
    return fetch(`http://192.168.1.68:3000/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user)
    }).then(data => data.json());
  }
  static validate() {
    return this.get("http://192.168.1.68:3000/validate");
  }

  static getItems() {
    return this.get("http:/192.168.1.68:3000/items");
  }

  static get = async url => {
    const userToken = await AsyncStorage.getItem("token");
    return fetch(url, {
      headers: {
        Authorization: userToken
      }
    }).then(response => response.json());
  };

  static logItem = async item => {
    const userToken = await AsyncStorage.getItem("token");
    return fetch(`http://192.168.1.68:3000/items`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: userToken },
      body: JSON.stringify(item)
    }).then(data => data.json());
  };

  static getAllItems() {
    return this.get("http:/192.168.1.68:3000/allitems")
  }
}

window.API = API;

export default API;
