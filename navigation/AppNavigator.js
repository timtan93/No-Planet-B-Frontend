import { createStackNavigator, createAppContainer } from 'react-navigation';
import Map from '../screens/Map';
import Homepage from '../screens/Homepage';
import History from '../screens/History';

const AppNavigator = createStackNavigator({
  Homepage: { screen: Homepage },
  History: { screen: History},
});
const App = createAppContainer(AppNavigator)
export default App;