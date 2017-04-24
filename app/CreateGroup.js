import React, { Component } from 'react';
import CheckBox from 'react-native-checkbox';
import { View, Text, StyleSheet, TextInput, ListView, Picker, Button } from 'react-native';
import AuthAxios from './AuthAxios.js';
import styles from './styles.js';

export default class CreateGroup extends Component {
  constructor(props) {
    super(props);
    this.state =  { 
      friends: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2
      }),
      groupName: '',
      users: [],
      privacy: 'label',
    };
    this.handleUserChange = this.handleUserChange.bind(this);
    this.submitGroup = this.submitGroup.bind(this);
  }

  componentWillMount() {
    AuthAxios({
      url: `/api/friends?groups=true`
    })
    .then(({data}) => {
      let friends = data;
      this.setState({
        friends: this.state.friends.cloneWithRows(friends),
      })
    })
    .catch((error) => {
      console.log('There was an error in fetching your data', error);
      return error;
    })
  }

  submitGroup() {
    let groupSettings = {
      groupName: this.state.groupName,
      users: this.state.users,
      privacy: this.state.privacy,
    };
    AuthAxios({
      url: `/api/groups`,
      method: `post`,
      data:{groupSettings: groupSettings}
    })
    .then(({data}) => {
    })
    .catch((error) => {
      alert('There was a problem creating your group')
    })
    const { navigate } = this.props.navigation;
    navigate('GroupsList');
  }

  handleUserChange(userObj) {
    let userArr = this.state.users;
    let index = userArr.indexOf(userObj);
    if(index === -1) {
      userArr.push(userObj);
    } else {
      userArr.splice(index, 1);
    }

    this.setState({
      users: userArr
    })
  }

  static navigationOptions = ({ navigation }) => ({
    title: 'Create Group'
  });

  render() {
    const params = this.props.navigation.state.params;
    return (
      <View style={styles.container}>
        <Text style={styles.createGroupText}>Create Group:</Text>
        <TextInput
          style={{fontSize: 18, textAlign: 'left'}}
          onChangeText={(text) => this.setState( {groupName: text} )}
          placeholder='Insert Group Name'
          value={this.state.text}
        />
        <Text style={styles.createGroupText}>Privacy Setting:</Text>
        <Picker
          selectedValue={this.state.privacy}
          onValueChange={(privacy) => this.setState({ privacy: privacy })}
        >
          <Picker.Item label='Label' value='label' />
          <Picker.Item label='GPS' value='gps' />
        </Picker>
        <Text style={styles.createGroupText}>Members:</Text>
        <ListView
          dataSource={this.state.friends}
          style={styles.listView}
          renderRow={(rowData) => (
            <CheckBox
              label={rowData.first}
              onChange={() => this.handleUserChange(rowData)}
              underlayColor='transparent'
            />
          )}
        />
        <Button 
          title="Create Group"
          onPress={this.submitGroup}
        />
      </View>
    );
  }
};