import React, { Component } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { googleAuthWebClientId } from './endpoint.js';
import {GoogleSignin, GoogleSigninButton} from 'react-native-google-signin';
import AuthAxios from './AuthAxios.js';
import styles from './styles.js';

export default class SplashScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
    };
  };

  static navigationOptions = {
    headerVisible: false
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
    let position = this.state.lastPosition || this.state.initialPosition;
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
      this.setState({user});
      setTimeout(() => {
        if (user === null) {
          navigate('SignUp', {location: this.state.initialPosition});
        } else {
          this.saveLocation();
          navigate('HomePageTabs');
        }
      }, 1000)
    }
    catch(err) {
      console.log("Play services error", err.code, err.message);
    }
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.splashScreenContainer}>
        <Image 
          source={require('./Image/safer.png')}
        />
        <Text style={styles.splashScreenText}>SAFER</Text> 
      </View>
    );
  }
};