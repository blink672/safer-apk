import React, { Component } from 'react';
import { endpoint } from './endpoint.js';
import { ListView, View, Text, StyleSheet } from 'react-native';

export default class LogOut extends Component {
  constructor(props) {
    super(props);
    this.state =  {
    };
  }

  static navigationOptions = {
    title: 'LogOut'
  };

  render() {
    const params = this.props.navigation.state.params;
    return (
      <View>
        <Text> LogOut </Text>
      </View>
    );
  }
}