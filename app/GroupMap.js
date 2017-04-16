import React, { Component } from 'react';
import { endpoint } from './endpoint.js';
import { ListView, View, Text, StyleSheet } from 'react-native';

export default class GroupMap extends Component {
  constructor(props) {
    super(props);
    this.state =  {
      members: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2
      })
    };
  }

  componentWillMount() {
    console.log('GROUPMAP',this.props.navigation.state.params)
    let {name} = this.props.navigation.state.params.data;
    fetch(`${endpoint}/api/groupUsers?name=${name}`)
    .then(response => {
      return response.json();
    })
    .then(members => {
      this.setState({
        members: this.state.members.cloneWithRows(members)
      });
    })
    .catch(err => {
      console.log('there was an error in fetching members', err);
    });
  };

  static navigationOptions = ({navigation}) => ({
    title: navigation.state.params.data.name
  });

  render() {
    const params = this.props.navigation.state.params;
    return (
      <View>
        <ListView
          dataSource={this.state.members}
          renderRow={(rowData) => <Text>{rowData.first}</Text>}
        />
      </View>
    );
  }
}