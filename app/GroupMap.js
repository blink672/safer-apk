import React, { Component } from 'react';
import { endpoint } from './endpoint.js';
import { ListView, View, Text, StyleSheet, TouchableOpacity, Button } from 'react-native';
import AuthAxios from './AuthAxios.js';

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
      addAndDelete: false
    };
    this.fetchNonGroupMembers = this.fetchNonGroupMembers.bind(this);
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

  fetchNonGroupMembers() {
    let {name} = this.props.navigation.state.params.data; 
    AuthAxios({
      url: `api/nonGroupUsers?name=${name}`,
    })
    .then(({data}) => {
      this.setState({
        nonMembers: this.state.nonMembers.cloneWithRows(data),
        addAndDelete: !this.state.addAndDelete
      })
    })
    .catch(err => {
      console.log('there was an error in fetching non members', err);
    });
  }

  static navigationOptions = ({navigation}) => ({
    title: navigation.state.params.data.name
  });

  render() {
    const params = this.props.navigation.state.params;
    return (
      <View>
        <Button
          onPress={() => !this.state.addAndDelete ? this.fetchNonGroupMembers() : console.log('confirm') }
          title={ !this.state.addAndDelete ? 'Add/Delete Friends' : 'Confirm'}
        />
        {this.state.addAndDelete ? this.renderAddAndDeleteList() : this.renderNoChangeList()}
      </View>
    );
  }

/******* Render view for when user IS NOT editing group ****************/
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
/*********************************************************************/

/********** Render view for when user IS editing grou ****************/
  renderAddAndDeleteList() {
    return (
      <View>
        <ListView
          dataSource={this.state.members}
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
          onPress={() => console.log('Add/Delete')}
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
          onPress={() => console.log('Add/Delete')}
          title='Add'
          style={styles.button}
        />
        <View style={styles.nameContainer}>
          <Text style={styles.name}>{`${data.first} ${data.last}`}</Text>
        </View>
      </View>
    )
  }
/*********************************************************************/
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