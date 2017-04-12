import React, { Component } from 'react';
import { AppState, View, Button, Text, StyleSheet } from 'react-native';

// import endpoint from './endpoint.js';
import FriendMap from './FriendMap.js';
import {GoogleSignin, GoogleSigninButton} from 'react-native-google-signin';

export default class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null
    };
  };

  static navigationOptions = {
    title: 'Favorites'
  };

  componentDidMount() {
    this._setupGoogleSignin();
  };

  render() {
    const { navigate } = this.props.navigation;
    if (!this.state.user) {
      return (
        <View style={styles.container}>
          <GoogleSigninButton style={{width: 120, height: 44}} color={GoogleSigninButton.Color.Light} size={GoogleSigninButton.Size.Icon} onPress={() => { this._signIn(); }}/>
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          <Text>Hello {this.state.user.name}</Text>
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
        </View>
      )
    }
  }

  async _setupGoogleSignin() {
    try {
      await GoogleSignin.hasPlayServices({ autoResolve: true });
      await GoogleSignin.configure({
        webClientId: '603421766430-60og8n04mebic8hi49u1mrcmcdmugnd5.apps.googleusercontent.com',
        offlineAccess: false
      });

      const user = await GoogleSignin.currentUserAsync();
      console.log(user);
      this.setState({user});
    }
    catch(err) {
      console.log("Play services error", err.code, err.message);
    }
  }

  _signIn() {
    GoogleSignin.signIn()
    .then((user) => {
      console.log(user);
      this.setState({user: user});
    })
    .catch((err) => {
      console.log('WRONG SIGNIN', err);
    })
    .done();
  }

  _signOut() {
    GoogleSignin.revokeAccess().then(() => GoogleSignin.signOut()).then(() => {
      this.setState({user: null});
    })
    .done();
  }
}

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
