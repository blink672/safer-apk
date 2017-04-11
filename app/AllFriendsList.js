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
  };

  componentWillMount() {
    console.log("in component will mount in all friends list")
    fetch(`${endpoint}/api/friends`, {
      method: 'GET',
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
  }





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
          // onPress={this.checkPermissionAndGet}
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
  title: {
    fontSize: 20,
    marginBottom: 8,
    textAlign: 'center',
  },
  year: {
    textAlign: 'center',
  },
  thumbnail: {
    width: 53,
    height: 81,
  },
  listView: {
    paddingTop: 20,
    backgroundColor: '#F5FCFF',
  },
});

// let styles = StyleSheet.create({
//   button: {
//     flex: 1,
//     flexDirection: 'row',
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#F5FCFF',
//   },
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   name: {
//     fontSize: 20,
//     marginBottom: 4,
//     textAlign: 'center',
//   },
//   phoneNumber: {
//     textAlign: 'center',
//   },
// });