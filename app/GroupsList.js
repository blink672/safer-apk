import React, { Component } from 'react';
import { endpoint } from './endpoint.js';
import { Button, View, Text, StyleSheet } from 'react-native';

export default class GroupsList extends Component {
  constructor(props) {
    super(props);
    this.state =  {};
  }

  componentWillMount () {
    console.log('getgroups')
    fetch(`${endpoint}/api/groups`, {
      method: 'GET',
    })
    .then(res => {
      return res.json();
    })
    .then(groups => {
      console.log(groups);
    })
    .catch(err => {
      console.log('There was error in getting groups', err);
    })
  }

  static navigationOptions = {
    title: 'Groups'
  };

  render() {
    const params = this.props.navigation.state.params;
    const { navigate } = this.props.navigation;
    return (
      <View>
        <Button
          onPress={() => navigate('CreateGroup',{
            information: 'random',
            title: "Create Group"
          })
        }
        title="Create Group"
        />
        <Text>Group</Text>
      </View>
    );
  }
}