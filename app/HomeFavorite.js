import React, { Component } from 'react';
import { Button, View, Text, StyleSheet, ListView, TouchableOpacity } from 'react-native';
import AuthAxios from './AuthAxios.js';

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
    // const params = this.props.navigation.state.params;
    // const { navigate } = this.props.navigation;
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
    // const { navigate } = this.props.navigation;
    console.log(this.props);
    return (
      <TouchableOpacity
        onPress={() => this.props.navigate('FriendMap', {data: memberData}) }
      >
        <View style={styles.nameContainer}>
          <Text style={{textAlign: 'left', fontSize: 23}}>{memberData.first} {memberData.last}</Text>
          <Text style={{textAlign: 'left', fontSize: 18}}>{memberData.currentLabel ? memberData.currentLabel : 'Pending'}</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // flexDirection: 'row',
    // justifyContent: 'center',
    // alignItems: 'flex-start',
    backgroundColor: '#F5FCFF',
  },
  nameContainer: {
    // justifyContent: 'right',
    flex: 1,
    marginBottom: 8,
  },
  name: {
    fontSize: 23,
    // marginBottom: 8,
    textAlign: 'center',
  },
  year: {
    textAlign: 'right',

  },
  button: {

  },
  listView: {
    paddingTop: 10,
    backgroundColor: '#F5FCFF',
  },
  separator: {
    flex: 1,
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#8E8E8E',
  },
});