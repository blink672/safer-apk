import React, { Component } from 'react';
import { endpoint } from './endpoint.js';
import { View, Text, StyleSheet } from 'react-native';

export default class GroupMap extends Component {
  constructor(props) {
    super(props);
    this.state =  {};
  }

  componentWillMount() {
    fetch(`${endpoint}/api/groupUsers`)
    .then(response => {
      return response.json();
    })
    .then(members => {
      console.log(members);
    })
    .catch(err => {
      console.log('there was an error in fetching members', err);
    });
  };

  static navigationOptions = {
    title: ({state}) => (state.params.data.name)
  };

  render() {
    const params = this.props.navigation.state.params;
    return (
      <View>
        <Text>Raffy is in a ditch a block away from his house. Find his fingers. { params.friendId }</Text>
        <Text>{ params.friendName }</Text>
      </View>
    );
  }
}