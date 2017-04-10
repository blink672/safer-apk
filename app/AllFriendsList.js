import React, { Component } from 'react';
import endpoint from './endpoint.js';
import Contacts from 'react-native-contacts';
import { View, Text, StyleSheet, Button, ListView } from 'react-native';

export default class AllFriendsList extends Component {
  constructor(props) {
    super(props);
    this.state =  {
      friends: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2
      }),
      loaded: false
    };
    this.checkPermissionAndGet = this.checkPermissionAndGet.bind(this);
    };

  checkPermissionAndGet() {
    

    // This won't work without editing the server files to res.json('validated!');
    fetch(`${endpoint}/anyroute`, {
      method: 'GET'
    })
      .then(function(response) {
        return response.json();
      })
      .then(function(data) {
        console.log('data: ', data);
        this.setState({
          data: data
        });
      }.bind(this))
      .catch(function(error) {
        console.log('There was an error in fetching your data: ', error);
        return error;
      });


    Contacts.checkPermission( (err, permission) => {
      // Contacts.PERMISSION_AUTHORIZED || Contacts.PERMISSION_UNDEFINED || Contacts.PERMISSION_DENIED
      console.log(permission)
      if(permission === 'undefined'){
        console.log('in fnction')
        Contacts.requestPermission( (err, permission) => {
          // ...
        })
      }
      if(permission === 'authorized'){
        // yay!
        Contacts.getAll((err, contacts) => {
          let friends = [];
          contacts.map((contact) => {
            let phoneNumbers = contact.phoneNumbers;
            if(phoneNumbers.length > 0) {
              let newFriend = {
                name: contact.givenName,
                phoneNumber: contact.phoneNumbers[0].number
              };
              friends.push(newFriend);
            }
          });
          this.setState({
            friends: this.state.friends.cloneWithRows(friends),
            loaded: true
          });
          console.log(friends);
        })
      }
      if(permission === 'denied'){
        // x.x
      }
    })
  };

  static navigationOptions = {
    title: 'Contacts'
  };

  render() {
    const params = this.props.navigation.state.params;

    if(this.state.loaded === true) {
      return this.renderContactList();
    }

    return (
      <View style={styles.container}>
        <Text>Contacts List</Text>
        <Button
          onPress={this.checkPermissionAndGet}
          title="Get Contacts"
        />
      </View>
    );
  }

  renderContactList() {
    return (
      <ListView
        dataSource={this.state.friends}
        renderRow={this.renderContacts}
      />
    )
  }

  renderContacts(friend) {
    return (
      <View>
        <Text style={styles.name}>{friend.name}</Text>
        <Text style={styles.phoneNumber}>{friend.phoneNumber}</Text>
      </View>
    )
  }
}

let styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  name: {
    fontSize: 20,
    marginBottom: 4,
    textAlign: 'center',
  },
  phoneNumber: {
    textAlign: 'center',
  },
});