import React, { Component } from 'react';
import { Button, View, Text, StyleSheet, ListView, TouchableOpacity } from 'react-native';
import AuthAxios from './AuthAxios.js';
import styles from './styles.js';

export default class GroupsList extends Component {
  constructor(props) {
    super(props);
    this.state =  {
      groups: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2
      })
    };
  }

  componentWillMount () {
    AuthAxios({
      url: `/api/groups`
    })
    .then(({data}) => {
      let groups = data;
      this.setState({
        groups: this.state.groups.cloneWithRows(groups)
      });
    })
    .catch(err => {
      console.log('There was an error in getting groups', err)
    })
  }

  static navigationOptions = {
    title: 'Groups'
  };

  render() {
    const params = this.props.navigation.state.params;
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <Button
          color='black'
          onPress={() => navigate('CreateGroup',{
            title: "Create Group"
          })
        }
        title="Create Group"
        />
        <ListView
          style={styles.listView}
          dataSource={this.state.groups}
          renderRow={(rowData) => (
            <TouchableOpacity 
              onPress={() => navigate('GroupMap', {
                data: rowData
              })
            }
            >
              <View style={styles.nameContainer}>
                <Text style={styles.groupName}>{rowData.name}</Text>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    );
  }
}