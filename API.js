import { AsyncStorage } from 'react-native'

class API {
    static signin(user) {
      return fetch(`http://10.0.2.2:3000/signin`, {
        method: 'POST',
      headers: {'Content-Type': "application/json"},
      body: JSON.stringify(user)
        }).then(data => data.json())
    }
  
    static validate() {
      return this.get("http://10.0.2.2:3000/validate");
    }
  
    static getItems() {
      return this.get("http://10.0.2.2.84:3000/items");
    } 
  
    static get(url) {
      return fetch(url, {
        headers: {
          Authorization: AsyncStorage.getItem("token")
        }
      }).then(response => response.json());
    }
  }
  
  window.API = API;
  
  export default API;