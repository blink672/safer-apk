import React, { Component } from 'react';
import endpoint from './endpoint.js';
import Contacts from 'react-native-contacts';
import { View, Text, StyleSheet, Button, ListView } from 'react-native';

export default class AddFriend extends Component {
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
  componentWillMount(){
    console.log("will mount in addfriend")
    this.checkPermissionAndGet();
  };

  checkPermissionAndGet() {
    Contacts.checkPermission( (err, permission) => {
      // Contacts.PERMISSION_AUTHORIZED || Contacts.PERMISSION_UNDEFINED || Contacts.PERMISSION_DENIED
      console.log(permission)
      if(permission === 'undefined'){
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

          fetch(`${endpoint}/api/contacts/${friends}`, {
            method: 'GET',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            }
          })
            .then(function(response) {
              return response.json();
            })
            .then((data) => {
              console.log(data);
            })
            .catch((error) => {
              console.log('There was an error in fetching your data: ', error);
              return error;
            });

          this.setState({
            friends: this.state.friends.cloneWithRows(friends),
            loaded: true
          });
        })
      }
      if(permission === 'denied'){
        // x.x
      }
    })
  };

  static navigationOptions = {
    title: 'AddFriend'
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
        style={styles.listView}
        renderSeparator={(sectionId, rowId) => <View key={rowId} style={styles.separator} />}
      />
    )
  }

  renderContacts(friend) {
    return (
      <View style={styles.container}>
        <Button
          style={styles.button}
          onPress={() => {console.log(friend)}}
          title="Add Friend"
        />
        <View style={styles.rightContainer}>
          <Text style={styles.name}>{friend.name}</Text>
          <Text style={styles.phoneNumber}>{friend.phoneNumber}</Text>
        </View>
      </View>
    )
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