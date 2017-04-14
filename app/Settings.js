import React, { Component } from 'react';
import { View, Button, Text, Picker, StyleSheet } from 'react-native';
import { endpoint } from './endpoint.js';

import FriendMap from './FriendMap.js';

export default class Settings extends Component {
  constructor(props) {
    super(props);
    // TODO: grab logged in userId (for SQL table)
    // and pass it along in the req.body
    // currently hard coded to 1
    this.state = {
      userId: 1, 
      selected: 'GPS', //TODO: set this to the privacy setting grabbed from the sql database
      error: false
    };
    this.onValueChange = this.onValueChange.bind(this);
  };

  static navigationOptions = {
    title: 'Settings'
  };

  onValueChange(privacySetting) {
    fetch(endpoint + '/api/privacySettings', {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId: this.state.userId,
        privacy: privacySetting
      })

    }).then((response) => {
      if (response.err) {
        this.setState({
          error: true
        });
      }      
    }).catch((err) => {
      this.setState({
        error: true
      });
    });
    this.setState({
      selected: privacySetting,
    });
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <Text>Privacy Settings</Text>
        {this.state.error && 
          (<Text>There was an error updating your privacy settings. Please try again later.</Text>)}
        <Picker 
          style={{width: 200}} 
          selectedValue={this.state.selected}
          onValueChange={this.onValueChange} >
          <Picker.Item label='Label' value='label'/>
          <Picker.Item label='GPS' value='gps' />
        </Picker>

      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start'
  }
});

