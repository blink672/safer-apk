import React, { Component } from 'react';
import FriendMap from './FriendMap.js';
import HomeFavorite from './HomeFavorite.js';
import { AppState, View, Button, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { endpoint, googleAuthWebClientId } from './endpoint.js';
import {GoogleSignin, GoogleSigninButton} from 'react-native-google-signin';
import PushController from './FCM/PushController.js';
import AuthAxios from './AuthAxios.js';
import axios from 'axios';
import styles from './styles.js';

export default class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  };

  static navigationOptions = {
    title: 'Favorites'
  };
  
  render() {
    const { navigate } = this.props.navigation;    
    return (
      <View>
        <PushController />
        <HomeFavorite />
      </View>
    )
  }
}
