import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

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
    return (
      <View>
        <Text>Group</Text>
      </View>
    );
  }
}