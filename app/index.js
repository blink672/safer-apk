import HomeScreen from './Home.js';
import FriendMap from './FriendMap.js';
import AddFence from './AddFence.js'
import GroupsList from './GroupsList.js';
import AllFriendsList from './AllFriendsList.js';
import Settings from './Settings.js';

import { StackNavigator, TabNavigator, DrawerNavigator } from 'react-navigation';

const HomePageNavigator = TabNavigator({
  Home: { screen: HomeScreen },
  GroupsList: { screen: GroupsList },
  AllFriendsList: { screen: AllFriendsList },
})

HomePageNavigator.navigationOptions = {
  title: 'Safely'
}

const Stack = StackNavigator({
  Home: { screen: HomePageNavigator },
  FriendMap: { screen: FriendMap },
  AddFence: { screen: AddFence },
  Settings: { screen: Settings }
});

Stack.navigationOptions = {
  title: 'Home'
}

export default safely = DrawerNavigator({
  Stack: { screen: Stack },
  Home: { screen: HomeScreen },
  AllFriendsList: { screen: AllFriendsList },  
  Settings: { screen: Settings }
}, {
  drawerWidth: 200
});

// MenuNavigator.navigationOptions = {

// }
