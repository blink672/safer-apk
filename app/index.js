import HomeScreen from './Home.js';
import FriendMap from './FriendMap.js';
import AddFence from './AddFence.js';
import GroupsList from './GroupsList.js';
import AllFriendsList from './AllFriendsList.js';
import Settings from './Settings.js';
import AddFriendList from './AddFriendList.js';
import CreateGroup from './CreateGroup.js';
import GroupMap from './GroupMap.js';
import SplashScreen from './SplashScreen.js';
import SignUp from './SignUp.js';

import React from 'react';
import { View, Button, TouchableOpacity, Image, Text } from 'react-native';
import { StackNavigator, TabNavigator, DrawerNavigator } from 'react-navigation';

const HomePageTabs = TabNavigator({
  Home: { screen: HomeScreen },
  GroupsList: { screen: GroupsList },
  AllFriendsList: { screen: AllFriendsList },
}, {
  tabBarOptions: {
    inactiveBackgroundColor: '#e91e63',
    style: {
      backgroundColor: 'black',
    },
    indicatorStyle: {
      backgroundColor: 'blue',
    },
    pressColor: '#cfe9fd',
  },
});

const renderBurgerButton = (navigation) => {
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('DrawerOpen')}
    >
      <Image
        style={{height: 30, width: 30, marginLeft: 10}}
        source={ require('./Image/BurgerButton.png') }
      />
    </TouchableOpacity>
  );
};

const renderHeader = () => {
  return (
      <Image
        source={require('./Image/safer.png')}
        style={{height: 125, width: 125}}
      />
  );
};

HomePageTabs.navigationOptions = ({navigation}) => ({
  title: 'SAFER',
  headerLeft: renderBurgerButton(navigation)
});


const Stack = StackNavigator({
  SplashScreen: { screen: SplashScreen },
  SignUp: { screen: SignUp },
  HomePageTabs: { screen: HomePageTabs },
  FriendMap: { screen: FriendMap },
  AddFence: { screen: AddFence },
  Settings: { screen: Settings },
  AddFriend: { screen: AddFriendList },
  CreateGroup: { screen: CreateGroup },
  GroupMap: { screen: GroupMap },
});

Stack.navigationOptions = {
  headerVisible: false
};

const MenuDrawer = DrawerNavigator({
  Home: { screen: Stack },
  AddFriend: { screen: AddFriendList },  
  AddFence: { screen: AddFence },
  Settings: { screen: Settings },
}, {
  drawerWidth: 200,
});

export default MenuDrawer;

