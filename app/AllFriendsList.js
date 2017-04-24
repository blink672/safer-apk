import FriendMap from './FriendMap.js';
import React, { Component } from 'react';
import Contacts from 'react-native-contacts';
import { View, Text, StyleSheet, Button, ListView, TouchableOpacity } from 'react-native';
import AuthAxios from './AuthAxios.js';
import styles from './styles.js';

export default class AllFriendsList extends Component {
  constructor(props) {
    super(props);
    this.state =  {
      friends: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2
      }),
      loaded: false,
      privacy: '',
    };
  };

  componentWillMount() {
    AuthAxios({
      url: '/api/friends'
    })
    .then(({data}) => {
      this.setState({
        friends: this.state.friends.cloneWithRows(data),
        loaded: true
      });
    })
    .catch((error) => {
      console.log('There was an error in fetching your data: ', error);
      return error;
    });
  }

  static navigationOptions = ({navigation}) => ({
    title: 'Friends'
  });

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
        renderRow={(rowData) => this.renderContacts(rowData)}
        style={styles.listView}
      />
    )
  }

  renderContacts(friend) {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => navigate('FriendMap', {data: friend}) }
        >
          <View style={styles.nameContainer}>
            <Text style={styles.name}>{friend.first} {friend.last}</Text>
            <Text style={styles.label}>{friend.currentLabel ? friend.currentLabel : 'Pending'}</Text>
          </View>
        </TouchableOpacity>
      </View>
    )
  }
};