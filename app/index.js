import HomeScreen from './Home.js';
import FriendMap from './FriendMap.js';
import AddFence from './AddFence.js';
import GroupsList from './GroupsList.js';
import AllFriendsList from './AllFriendsList.js';
import Settings from './Settings.js';
import AddFriendList from './AddFriendList.js';
import CreateGroup from './CreateGroup.js';
import GroupMap from './GroupMap.js';
import LogOut from './LogOut.js';

import React from 'react';
import { Button, TouchableOpacity, Image } from 'react-native';
import { StackNavigator, TabNavigator, DrawerNavigator } from 'react-navigation';

const HomePageTabs = TabNavigator({
  Home: { screen: HomeScreen },
  GroupsList: { screen: GroupsList },
  AllFriendsList: { screen: AllFriendsList },
});

const renderBurgerButton = (navigation) => {
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('DrawerOpen')}
    >
      <Image
        style={{height: 30, width: 30}}
        source={ require('./Image/BurgerButton.png') }
      />
    </TouchableOpacity>
  );
};

HomePageTabs.navigationOptions = ({navigation}) => ({
  title: 'SAFER',
  headerLeft: renderBurgerButton(navigation)
});


const Stack = StackNavigator({
  HomePageTabs: { screen: HomePageTabs },
  FriendMap: { screen: FriendMap },
  AddFence: { screen: AddFence },
  Settings: { screen: Settings },
  AddFriend: { screen: AddFriendList },
  CreateGroup: { screen: CreateGroup },
  GroupMap: { screen: GroupMap },
  LogOut: { screen: LogOut },
});

Stack.navigationOptions = {
  title: 'Home'
};

const MenuDrawer = DrawerNavigator({
  Stack: { screen: Stack },
  AddFriend: { screen: AddFriendList },  
  AddFence: { screen: AddFence },
  Settings: { screen: Settings },
  LogOut: { screen: LogOut },
}, {
  drawerWidth: 200
});

const Safer = StackNavigator({
  SplashScreen: { screen: SplashScreen },
  MenuDrawer: { screen: MenuDrawer },
})

export default MenuDrawer;

