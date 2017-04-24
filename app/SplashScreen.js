import React, { Component } from 'react';
import { AppState, View, Button, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { googleAuthWebClientId } from './endpoint.js';
import {GoogleSignin, GoogleSigninButton} from 'react-native-google-signin';
import AuthAxios from './AuthAxios.js';
import { distanceBetweenCoordinates } from './geoFencingUtils/geoFencingUtils.js'


export default class SplashScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      initialPosition: 'unknown',
      lastPosition: 'unknown',
    };
  };

  static navigationOptions = {
    title: 'Welcome'
  };
  
  componentDidMount() {
    this._setupGoogleSignin();
    this.geoMonitoring();
  };

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID);
  }

  watchID: ?number = null;

  geoMonitoring() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        console.log('got the position!', position);
        this.setState({initialPosition: position});
      },
      (error) => alert(`We couldn't get your location`),
      {enableHighAccuracy: false, timeout: 20000, maximumAge: 90000000000000}
    );
    this.watchID = navigator.geolocation.watchPosition((position) => {
      this.setState({lastPosition: position});
    });
  }

  saveLocation () {
    console.log('Save location called from splash screen')
    let position = this.state.initialPosition;
    let location = {
      lat: position.coords.latitude,
      long: position.coords.longitude
    };

    AuthAxios({
      url: `/api/user/location`,
      method: 'put',
      data: location
    })
    .then(response => console.log('Location updated'))
    .catch(error => console.log('Location not updated', error));
  }

  async _setupGoogleSignin() {
    const { navigate } = this.props.navigation;
    try {
      console.log('in setup google sign in');
      await GoogleSignin.hasPlayServices({ autoResolve: true });
      await GoogleSignin.configure({
        webClientId: googleAuthWebClientId, //replace with client_id from google-services.json
        offlineAccess: false
      });

      const user = await GoogleSignin.currentUserAsync();
      if (user === null) {//TODO: set up conditional navigation here based on whether use is null
        navigate('SignUp', {location: this.state.initialPosition});
      } else {
        this.saveLocation();
        navigate('HomePageTabs');
      }
      this.setState({user});
    }
    catch(err) {
      console.log("Play services error", err.code, err.message);
    }
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <Text>Safer SplashScreen</Text> 
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
