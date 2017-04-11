import React, { Component } from 'react';
import { View, Button, Text, StyleSheet } from 'react-native';

import FriendMap from './FriendMap.js';

export default class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  };

  static navigationOptions = {
    title: 'Favorites'
  };

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <Text>Hello world</Text>
        <Button
          onPress={() => navigate('FriendMap', { 
              friendId: 1234567890,
              friendName: 'Kyle' 
            })
          }
          title="See yo friend yo"
        />
        <Button 
          onPress ={() => navigate('AddFence')}
          title="Geofence"
        />
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