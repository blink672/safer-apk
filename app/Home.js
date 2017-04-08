import React, { Component } from 'react';
import { View, Button, Text, StyleSheet } from 'react-native';

export default class HomeScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  static navigationOptions = {
    title: 'Welcome'
  };

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <Text>Yo Yo refactor</Text>
        <Button
          onPress={() => navigate('FriendMap')}
          title="See yo friend yo"
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