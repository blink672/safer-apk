import HomeScreen from './Home.js';
import FriendMap from './FriendMap.js';
import AddFence from './AddFence.js';
import GroupsList from './GroupsList.js';
import AllFriendsList from './AllFriendsList.js';
import Settings from './Settings.js';
import AddFriend from './AddFriend.js';

import React from 'react';
import { Button } from 'react-native';
import { StackNavigator, TabNavigator, DrawerNavigator } from 'react-navigation';

const HomePageTabs = TabNavigator({
  Home: { screen: HomeScreen },
  GroupsList: { screen: GroupsList },
  AllFriendsList: { screen: AllFriendsList },
});

// HomePageTabs.navigationOptions = {
//   title: 'Safely',
//   header: (({ navigate }) => ({
//     left: <Button title='Menu' onPress={ () => navigate('DrawerOpen') }/>
//   }))
// };

HomePageTabs.navigationOptions = ({navigation}) => ({
  title: 'Safely',
  headerRight: <Button title='Menu' onPress={ () => navigation.navigate('DrawerOpen') } />
});

const Stack = StackNavigator({
  Home: { screen: HomePageTabs },
  FriendMap: { screen: FriendMap },
  AddFence: { screen: AddFence },
  Settings: { screen: Settings },
  AddFriend: { screen: AddFriend },
});

Stack.navigationOptions = {
  title: 'Home'
};

const MenuDrawer = DrawerNavigator({
  Stack: { screen: Stack },
  AddFriend: { screen: AddFriend },  
  Settings: { screen: Settings }

}, {
  drawerWidth: 200
});

export default MenuDrawer;