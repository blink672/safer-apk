import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import HomeFavorite from './HomeFavorite.js';
import PushController from './FCM/PushController.js';
import AuthAxios from './AuthAxios.js';
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
