import React, { Component } from 'react';
import { endpoint } from './endpoint.js';
import Contacts from 'react-native-contacts';
import { View, Text, StyleSheet, Button, ListView } from 'react-native';

export default class AllFriendsItem extends Component {
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
      .then((friends) => {
        console.log(friends);
        this.setState({
          friends: this.state.friends.cloneWithRows(friends),
          loaded: true
        });
      })
      .catch((error) => {
        console.log('There was an error in fetching your data: ', error);
        return error;
      });
  }

  static navigationOptions = {
    title: 'Friends'
  };

  render() {
    const params = this.props.navigation.state.params;

    if(this.state.loaded === true) {
      return this.renderContactList();
    }

    return (
      <View style={styles.container}>
        <Text>Loading Friends...</Text>
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
          style={styles.thumbnail}
          onPress={() => console.log(friend)}
          title={friend.privacy}
        />
        <View style={styles.rightContainer}>
          <Text style={styles.title}>{friend.first}</Text>
          <Text style={styles.year}>{friend.last}</Text>
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
  separator: {
    flex: 1,
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#8E8E8E',
  },
});