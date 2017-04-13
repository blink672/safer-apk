import React, { Component } from 'react';
import { View, Button, Text, Picker, StyleSheet } from 'react-native';
import { endpoint } from './endpoint.js';

import FriendMap from './FriendMap.js';

export default class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: 'Label'
    };
    this.onChange = this.onChange.bind(this);
  };

  static navigationOptions = {
    title: 'Settings'
  };

  onChange(privacySetting) {
    fetch(endpoint + '/api/privacySettings', {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(privacySetting)
    }).then((response) => {
      console.log(response);
    })
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <Text>Privacy Settings</Text>
        <Picker 
          style={{width: 200}} 
          selectedValue={this.state.selected}
          onValueChange={(selected) => this.setState({selected: selected})} >
          <Picker.Item label='Label' value='label'/>
          <Picker.Item label='GPS Coordinates' value='gps' />
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

