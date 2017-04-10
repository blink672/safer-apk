import React, { Component } from 'react';
import { View, Button, Text, StyleSheet } from 'react-native';

import FriendMap from './FriendMap.js';

import Contacts from 'react-native-contacts';

class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  };

  componentDidMount(){
    this.getContactPermission();
  }

  getContactPermission(){
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
    title: 'Favorites'
  };

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <Text>Hello world</Text>
        <Button
          onPress={() => navigate('DrawerOpen')}
          title='Open Drawer'
        />
        <Button
          onPress={() => navigate('FriendMap', { 
              friendId: 1234567890,
              friendName: 'Kyle' 
            })
          }
          title="See yo friend yo"
        />
        <Button 
          onPress ={() => navigate('AddFence')}
          title="Geofence"
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});