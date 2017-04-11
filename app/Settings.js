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
        <Text>Settings go here</Text>
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

// This won't work without editing the server files to res.json('validated!');
    // fetch(endpoint + '/api/validate', {
    //   method: 'POST'
    // })
    //   .then(function(response) {
    //     return response.json();
    //   })
    //   .then(function(data) {
    //     console.log('data: ', data);
    //     this.setState({
    //       data: data
    //     });
    //   }.bind(this))
    //   .catch(function(error) {
    //     console.log('There was an error in fetching your data: ', error);
    //     return error;
    //   });