import React, { Component } from 'react';
import { Button, View, Text, StyleSheet, ListView, TouchableOpacity } from 'react-native';
import AuthAxios from './AuthAxios.js';
import styles from './styles.js';

export default class HomeFavorite extends Component {
  constructor(props) {
    super(props);
    this.state = {
      members: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2
      })
    };
  }

  componentWillMount() {
    // let {name} = this.props.navigation.state.params.data;
    console.log('componentWillMount')
    AuthAxios({
      url: `/api/groupUsers?name=FAVORITES`
    })
    .then(({data}) => {
      let members = data;
      this.setState({members: this.state.members.cloneWithRows(members)});
    })
    .catch(err => {
      console.log('There was an error fetching members', err);
    });
  }

  render() {
    console.log('HomeFavorite')
    return (
      <View style={styles.container}>
        <Button
          onPress={() => console.log("PRESSED")}
          title="Add Member To Favorite"
        />
        <ListView
          dataSource={this.state.members}
          style={styles.listView}
          renderRow={(rowData) => this.renderMembers(rowData) }
        />
      </View>
    );
  }

  renderMembers(memberData) {
    return (
      <TouchableOpacity
        onPress={() => this.props.navigate('FriendMap', {data: memberData}) }
      >
        <View style={styles.nameContainer}>
          <Text style={styles.name}>{memberData.first} {memberData.last}</Text>
          <Text style={styles.label}>{memberData.currentLabel ? memberData.currentLabel : 'Pending'}</Text>
        </View>
      </TouchableOpacity>
    );
  }
}