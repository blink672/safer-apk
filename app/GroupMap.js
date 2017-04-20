import React, { Component } from 'react';
import { endpoint } from './endpoint.js';
import { ListView, View, Text, StyleSheet, TouchableOpacity, Button } from 'react-native';
import AuthAxios from './AuthAxios.js';
import AddDeleteGroupMembers from './AddDeleteGroupMembers.js';

export default class GroupMap extends Component {
  constructor(props) {
    super(props);
    this.state =  {
      members: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2
      }),
      nonMembers: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2
      }),
      membersToAdd: [],
      membersToDelete: [],
      addAndDelete: false
    };
    this.changeToEditGroup = this.changeToEditGroup.bind(this);
    this.updateGroupMembers = this.updateGroupMembers.bind(this);
    this.addMember = this.addMember.bind(this);
    this.removeMember = this.removeMember.bind(this);
    this.updateGroupMembers = this.updateGroupMembers.bind(this);
  }

  componentWillMount() {
    console.log('GROUPMAP',this.props.navigation.state.params)
    let {name} = this.props.navigation.state.params.data;
    AuthAxios({
      url: `/api/groupUsers?name=${name}`
    })
    .then(({data}) => {
      this.setState({
        members: this.state.members.cloneWithRows(data)
      });
    })
    .catch(err => {
      console.log('there was an error in fetching members', err);
    });
  };

  changeToEditGroup() {
    this.setState({
      addAndDelete: !this.state.addAndDelete
    })
  }

  updateGroupMembers() {
    console.log('UPDATING GROUP');
    let groupChanges = {
      toAdd: this.state.membersToAdd,
      toDelete: this.state.membersToDelete,
    }
    console.log(groupChanges);
    this.setState({
      addAndDelete: !this.state.addAndDelete
    })
  }

  addMember(friendData) {
    console.log('adding member', friendData);
    let membersToAdd = this.state.membersToAdd;
    let index = membersToAdd.indexOf(friendData);
    if(index === -1) {
      membersToAdd.push(friendData);
    } else {
      userArr.splice(index, 1);
    }
    this.setState({
      membersToAdd: membersToAdd
    })
    console.log(this.state.membersToAdd);
  }

  removeMember(friendData) {
    console.log('removeMember', friendData);
    let membersToDelete = this.state.membersToDelete;
    let index = membersToDelete.indexOf(friendData);
    if(index === -1) {
      membersToDelete.push(friendData);
    } else {
      userArr.splice(index, 1);
    }
    this.setState({
      membersToDelete: membersToDelete
    })
    console.log(this.state.membersToDelete);
  }

  static navigationOptions = ({navigation}) => ({
    title: navigation.state.params.data.name
  });

  render() {
    const { data } = this.props.navigation.state.params;
    return (
      <View>
        <Button
          onPress={() => !this.state.addAndDelete ? this.changeToEditGroup() : this.updateGroupMembers() }
          title={ !this.state.addAndDelete ? 'Add/Delete Friends' : 'Confirm'}
        />
        {this.state.addAndDelete ? <AddDeleteGroupMembers members={this.state.members} name={data.name} toAdd={this.addMember} toDelete={this.removeMember} /> : this.renderNoChangeList()}
      </View>
    );
  }

  renderNoChangeList() {
    return (
      <ListView
        dataSource={this.state.members}
        renderRow={(rowData) => this.renderMembers(rowData) }
        style={styles.listView}
      />
    )
  }

  renderMembers(memberData) {
    const { navigate } = this.props.navigation;
    return (
      <TouchableOpacity
        onPress={() => navigate('FriendMap', {data: memberData}) }
      >
        <View style={styles.nameContainer}>
          <Text style={{textAlign: 'left', fontSize: 23}}>{memberData.first}</Text>
          <Text style={{textAlign: 'left', fontSize: 18}}>{memberData.currentLabel ? memberData.currentLabel : 'Pending'}</Text>
        </View>
      </TouchableOpacity>
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