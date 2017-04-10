import React, { Component } from 'react';
import endpoint from './endpoint.js';
import Contacts from 'react-native-contacts';
import { View, Text, StyleSheet, Button } from 'react-native';

export default class AllFriendsList extends Component {
  constructor(props) {
    super(props);
    this.state =  {};
    // This won't work without editing the server files to res.json('validated!');
    fetch(endpoint + '/api/validate', {
      method: 'POST'
    })
      .then(function(response) {
        return response.json();
      })
      .then(function(data) {
        console.log('data: ', data);
        this.setState({
          data: data
        });
      }.bind(this))
      .catch(function(error) {
        console.log('There was an error in fetching your data: ', error);
        return error;
      });
    this.checkPermissionAndGet = this.checkPermissionAndGet.bind(this);
  }

  checkPermissionAndGet(){
    Contacts.checkPermission( (err, permission) => {
      // Contacts.PERMISSION_AUTHORIZED || Contacts.PERMISSION_UNDEFINED || Contacts.PERMISSION_DENIED
      console.log(permission)
      if(permission === 'undefined'){
        console.log('in fnction')
        Contacts.requestPermission( (err, permission) => {
          // ...
        })
      }
      if(permission === 'authorized'){
        // yay!
        Contacts.getAll((err, contacts) => {
          console.log(contacts);
        })
      }
      if(permission === 'denied'){
        // x.x
      }
    })
  }

  static navigationOptions = {
    title: 'Contacts'
  };

  render() {
    const params = this.props.navigation.state.params;
    return (
      <View style={styles.container}>
        <Text>Contacts List</Text>
        <Button
          onPress={this.checkPermissionAndGet}
          title="Get Contacts"
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});