import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default class FriendMap extends React.Component {
  static navigationOptions = {
    title: 'Chat with Lucy',
  };
  render() {
    return (
      <View>
        <Text>Chat with Lucy</Text>
      </View>
    );
  }
}