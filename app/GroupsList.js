import React, { Component } from 'react';
import { Button, View, Text, StyleSheet, ListView, TouchableOpacity } from 'react-native';
import AuthAxios from './AuthAxios.js';

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
              <View style={{marginTop: 10}}>
                <Text style={{textAlign: 'center', fontSize: 20}}>{rowData.name}</Text>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    // flexDirection: 'row',
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