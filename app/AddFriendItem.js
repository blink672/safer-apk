import React, { Component } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import AuthAxios from './AuthAxios.js';
import styles from './styles.js';

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
      <View style={styles.centerContainer}>
        <Button
          style={styles.button}
          onPress={() => this.addFriend(friend)}
          title={friend.hasApp ? "Add Friend" : "Invite Friend"}
        />
        <View style={styles.nameContainer}>
          <Text style={styles.addName}>{friend.name}</Text>
          <Text style={styles.phoneNumber}>{friend.phoneNumber}</Text>
        </View>
      </View>
    );
  }
};
