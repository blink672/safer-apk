import React, { Component } from 'react';
import { Text, StyleSheet } from 'react-native';
import { googleAuthWebClientId } from './endpoint.js';
import {GoogleSignin, GoogleSigninButton} from 'react-native-google-signin';
import AuthAxios from './AuthAxios.js';

export default class SplashScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
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
        this.setState({initialPosition: position});
      },
      (error) => alert(`We couldn't get your location`),
      {enableHighAccuracy: false, timeout: 20000, maximumAge: 90000000000000}
    );
    this.watchID = navigator.geolocation.watchPosition((position) => {
      this.setState({lastPosition: position}, () => {this.saveLocation()});
    });
  }

  saveLocation () {
    console.log('Save location called from splash screen')
    console.log('last position: ', this.state.lastPosition);
    console.log('initial position: ', this.state.initialPosition);
    let position = this.state.lastPosition || this.state.initialPosition;
    console.log('position: ', position);
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
    .catch(error => console.log('There was an error in SaveLocation: ', error));
  }

  async _setupGoogleSignin() {
    const { navigate } = this.props.navigation;
    try {
      await GoogleSignin.hasPlayServices({ autoResolve: true });
      await GoogleSignin.configure({
        webClientId: googleAuthWebClientId, //replace with client_id from google-services.json
        offlineAccess: false
      });

      const user = await GoogleSignin.currentUserAsync();
      if (user === null) {
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
