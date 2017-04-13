import React, { Component } from 'react';
import CheckBox from 'react-native-checkbox';
import { endpoint } from './endpoint.js';
import { View, Text, StyleSheet, TextInput, ListView } from 'react-native';

export default class CreateGroup extends Component {
  constructor(props) {
    super(props);
    this.state =  { 
      friends: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2
      }),
      text: '',
    };
  }

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
    title: ({state}) => (state.params.title)
  };

  render() {
    const params = this.props.navigation.state.params;
    return (
      <View>
        <Text style={styles.button}>Create Group:</Text>
        <TextInput
          style={{fontSize: 18}}
          onChangeText={(text) => this.setState({text})}
          placeholder='Insert Group Name'
          value={this.state.text}
        />
        <ListView
          dataSource={this.state.friends}
          renderRow={(rowData) => (
            <CheckBox
              label={rowData.first}
              underlayColor='none'
            />
          )}
        />
      </View>
    );
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
  name: {
    fontSize: 20,
    marginBottom: 8,
    textAlign: 'center',
  },
  phoneNumber: {
    textAlign: 'center',
  },
  button: {
    fontSize: 20,
    // width: 53,
    // height: 81,
  },
  listView: {
    paddingTop: 20,
    backgroundColor: '#F5FCFF',
  },
});