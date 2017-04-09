import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import endpoint from './endpoint.js';

export default class AllFriendsList extends Component {
  constructor(props) {
    super(props);
    this.state =  {};
    fetch(endpoint + '/api/test')
      .then(function(response) {
        return response.json();
      })
      .then(function(data) {
        console.log('data: ', data);
        this.setState(data);
      }.bind(this))
      .catch(function(error) {
        console.log('There was an error in fetching your data: ', error);
        return error;
      });
  }

  static navigationOptions = {
    title: 'Contacts'
  };

  render() {
    const params = this.props.navigation.state.params;
    return (
      <View>
        <Text>Contacts List</Text>
        <Text>{ this.state.name }</Text>
      </View>
    );
  }
}