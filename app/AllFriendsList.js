import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default class AllFriendsList extends Component {
  constructor(props) {
    super(props);
    this.state =  {};
  }

  static navigationOptions = {
    title: 'Contacts'
  };

  render() {
    const params = this.props.navigation.state.params;
    return (
      <View>
        <Text>Contacts List</Text>
      </View>
    );
  }
}