import React, { Component } from 'react';
import { Button, View, Text, StyleSheet } from 'react-native';

export default class GroupsList extends Component {
  constructor(props) {
    super(props);
    this.state =  {};
  }

  static navigationOptions = {
    title: 'Groups'
  };

  render() {
    const params = this.props.navigation.state.params;
    const { navigate } = this.props.navigation;
    return (
      <View>
        <Text>Group</Text>
      </View>
    );
  }
}