import HomeScreen from './Home.js';
import FriendMap from './FriendMap.js';
import { StackNavigator } from 'react-navigation';

export default safely = StackNavigator({
  Home: { screen: HomeScreen },
  FriendMap: { screen: FriendMap }
});
