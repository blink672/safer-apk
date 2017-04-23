import FriendMap from './FriendMap.js';
import React, { Component } from 'react';
import Contacts from 'react-native-contacts';
import { View, Text, StyleSheet, Button, ListView, TouchableOpacity } from 'react-native';
import AuthAxios from './AuthAxios.js';

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
        renderSeparator={(sectionId, rowId) => <View key={rowId} style={styles.separator} />}
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
            <Text style={{textAlign: 'left', fontSize: 23}}>{friend.first} {friend.last}</Text>
            <Text style={{textAlign: 'left', fontSize: 18}}>{friend.currentLabel ? friend.currentLabel : 'Pending'}</Text>
          </View>
        </TouchableOpacity>
      </View>
    )
  }
}

let styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    // justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  nameContainer: {
    // justifyContent: 'right',
    flex: 1,
    marginBottom: 8,
  },
  name: {
    fontSize: 20,
    marginBottom: 8,
    textAlign: 'center',
  },
  year: {
    textAlign: 'right',
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