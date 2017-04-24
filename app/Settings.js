import React, { Component } from 'react';
import { View, Button, Text, Picker, Switch, StyleSheet } from 'react-native';
import FriendMap from './FriendMap.js';
import AuthAxios from './AuthAxios.js';
import styles from './styles.js';

export default class Settings extends Component {
  constructor(props) {
    super(props);
    // TODO: grab logged in userId (for SQL table)
    // and pass it along in the req.body
    // currently hard coded to 1
    this.state = {
      selected: 'gps', //TODO: set this to the privacy setting grabbed from the sql database
      incognito: false,
      error: false
    };
    this.pickerChange = this.pickerChange.bind(this);
    this.switchChange = this.switchChange.bind(this);
  };

  static navigationOptions = {
    title: 'Settings'
  };

  pickerChange(privacySetting) {
    AuthAxios({
      url: '/api/user',
      method: 'put',
      data: {defaultPrivacy: privacySetting}
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

  switchChange(value) {
    AuthAxios({
      url: '/api/user',
      method: 'put',
      data: { incognito: value }
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
      incognito: !this.state.incognito
    })
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.settingContainer}>

        <Text style={styles.settingText}>Default Privacy Settings</Text>
        <Text style={styles.settingDescription}>This is the default information presented to your connections</Text>
        <Text style={styles.settingDescription}>You can edit individual privacy settings from their location details screen</Text>
        <Picker 
          style={{width: 200}} 
          selectedValue={this.state.selected}
          onValueChange={this.pickerChange} >
          <Picker.Item label='Label' value='label'/>
          <Picker.Item label='GPS' value='gps' />
        </Picker>

        <Text style={styles.settingText}>Incognito Mode - Stop sharing your location</Text>
        <Switch
          onValueChange={this.switchChange}
          value={this.state.incognito} />

        {this.state.error &&
          (<Text>There was an error updating your privacy settings. Please try again later.</Text>)}
          
      </View>
    )
  }
};

