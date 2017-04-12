import React, { Component } from 'react';
import endpoint from './endpoint.js';
import { View, Text, StyleSheet, Button } from 'react-native';

export default class AddFriendList extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.addFriend = this.addFriend.bind(this);
  }

  addFriend (contact) {
    console.log(contact);
    fetch(`${endpoint}/api/friends`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({contact: contact})
    })
      .then(function(response) {
        return response.json();
      })
      .then((friend) => {
        console.log(friend);
        // this.setState({
        //   friends: this.state.friends.cloneWithRows(friends),
        //   loaded: true
        // });
      })
      .catch((error) => {
        console.log('There was an error in fetching your data: ', error);
        return error;
      });
  }

  render() {
    let friend = this.props.friend;
    return (
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
  separator: {
    flex: 1,
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#8E8E8E',
  },
});