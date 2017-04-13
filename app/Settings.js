import React, { Component } from 'react';
import { View, Button, Text, StyleSheet } from 'react-native';

import FriendMap from './FriendMap.js';

export default class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  };

  static navigationOptions = {
    title: 'Settings'
  };

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <Text>Privacy Settings</Text>
        
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

