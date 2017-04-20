import React, { Component } from 'react';
import { endpoint } from './endpoint.js';
import { ListView, View, Text, StyleSheet, TouchableOpacity, Button } from 'react-native';
import AuthAxios from './AuthAxios.js';

export default class GroupMap extends Component {
  constructor(props) {
    super(props);
    this.state =  {
      nonMembers: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2
      }),
      membersToAdd: [],
      membersToDelete: []
    };
  }

  componentWillMount() {
    AuthAxios({
      url: `api/nonGroupUsers?name=${this.props.name}`,
    })
    .then(({data}) => {
      this.setState({
        nonMembers: this.state.nonMembers.cloneWithRows(data),
      })
    })
    .catch(err => {
      console.log('there was an error in fetching non members', err);
    });
  }

  static navigationOptions = ({navigation}) => ({
    title: 'Add/Delete Friends'
  });

  render() {
    return (
      <View>
        <ListView
          dataSource={this.props.members}
          renderRow={rowData => this.renderMembersToBeChanged(rowData)}
          style={styles.listView}
        />
        <ListView
          dataSource={this.state.nonMembers}
          renderRow={rowData => this.renderNonMembers(rowData)}
          style={styles.listView}
        />
      </View>
    )
  }

  renderMembersToBeChanged(data) {
    return (
      <View style={styles.container}>
        <Button
          onPress={() => this.props.toDelete(data)}
          title='Delete'
          style={styles.button}
        />
        <View style={styles.nameContainer}>
          <Text style={styles.name}>{`${data.first} ${data.last}`}</Text>
        </View>
      </View>
    )
  }
 
  renderNonMembers(data) {
    return (
      <View style={styles.container}>
        <Button
          onPress={() => this.props.toAdd(data)}
          title='Add'
          style={styles.button}
        />
        <View style={styles.nameContainer}>
          <Text style={styles.name}>{`${data.first} ${data.last}`}</Text>
        </View>
      </View>
    )
  }
};

let styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
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
    width: 100,
    height: 81,
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