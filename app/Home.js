import React, { Component } from 'react';
import { AppState, View, Button, Text, StyleSheet } from 'react-native';
import PushNotification from 'react-native-push-notification';

// import endpoint from './endpoint.js';
import FriendMap from './FriendMap.js';
import PushController from './PushController.js';

class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleAppStateChange = this.handleAppStateChange.bind(this);
  };

  static navigationOptions = {
    title: 'Favorites'
  };

  componentDidMount() {
    AppState.addEventListener('change', this.handleAppStateChange);
  };

  componentWillUnmount() {
    AppState.removeEventListener('change', this.handleAppStateChange);
  };

  handleAppStateChange(appState) {
    if (appState === 'background') {
      console.log('in background');
      
      // PushNotification.configure({
      //   onNotification: function(notification) {
      //     console.log( 'NOTIFICATION:', notification );
      //   },
      //   popInitialNotification: true,
      // });

      PushNotification.localNotificationSchedule({
        message: "Please work", // (required)
        date: new Date(Date.now() + (3 * 1000)) // in 3 secs
      });
      console.log('after PushNotification');
    }
  };

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <Text>Notifications???</Text>
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
        <PushController />
      </View>
    );
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});


// This won't work without editing the server files to res.json('validated!');
    // fetch(endpoint + '/api/validate', {
    //   method: 'POST'
    // })
    //   .then(function(response) {
    //     return response.json();
    //   })
    //   .then(function(data) {
    //     console.log('data: ', data);
    //     this.setState({
    //       data: data
    //     });
    //   }.bind(this))
    //   .catch(function(error) {
    //     console.log('There was an error in fetching your data: ', error);
    //     return error;
    //   });
