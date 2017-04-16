import React, { Component } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

export default class FriendMap extends Component {
  constructor(props) {
    super(props);
    this.state =  {};
    console.log(this.props.navigation.state.params);
  }

  static navigationOptions = ({navigation}) => ({
    title: navigation.state.params.data.first
  });

  render() {
    const { data } = this.props.navigation.state.params;
    if(data.showSetting === 'GPS') { return this.renderGPS(data); }
    if(data.showSetting === 'label') { return this.renderLabel(data); }
    if(data.showSetting === 'pending') { return this.renderPending(data); }
  }

  renderPending(data) {
    return (
      <View>
        <Text>{data.first} doesn't want to be your friend. Stop checking.</Text>
      </View>
    );
  }

  renderLabel(data) {
    return (
      <View>
        <Text>{data.first} is in a ditch a block away from his house.</Text> 
        <Text>Find his fingers.</Text>
        <Text>Call him at { data.phoneNumber }</Text>
      </View>
    );
  }

  renderGPS(data) {
    return (
      <View>
        <Text>Checked In At:</Text>
        <Image
          source={require('./Image/MapImage.png')}
        />
        <Text>{data.updatedAt} Ago.</Text>
      </View>
    );
  }
}