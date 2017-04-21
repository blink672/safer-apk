import React, { Component } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import AuthAxios from './AuthAxios.js';

export default class AddFriendList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      buttonPressed: false
    };
    this.addFriend = this.addFriend.bind(this);
  }

  addFriend (contact) {
    if (contact.hasApp) {
      AuthAxios({
        url: '/api/friends',
        method: 'post',
        data: {phoneNumber: contact.phoneNumber}
      }).catch((error) => {
        console.log('There was an error in adding your friend: ', error);
        return error;
      });

      this.setState({
        buttonPressed: true
      });
    }
  }

  render() {
    let friend = this.props.friend;
    return !this.state.buttonPressed && (
      <View style={styles.container}>
        <Button
          style={styles.button}
          onPress={() => this.addFriend(friend)}
          title={friend.hasApp ? "Add Friend" : "Invite Friend"}
        />
        <View style={styles.rightContainer}>
          <Text style={styles.name}>{friend.name}</Text>
          <Text style={styles.phoneNumber}>{friend.phoneNumber}</Text>
        </View>
      </View>
    );
  }
}

let styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  rightContainer: {
    flex: 1,
  },
  name: {
    fontSize: 20,
    marginBottom: 8,
    textAlign: 'center',
  },
  phoneNumber: {
    textAlign: 'center',
  },
  button: {
    width: 53,
    height: 81,
  },
  listView: {
    paddingTop: 20,
    backgroundColor: '#F5FCFF',
  },
});
