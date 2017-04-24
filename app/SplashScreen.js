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
      phoneNumber: '',
      currentlyAt: ''
    };
  };

  static navigationOptions = {
    title: 'Welcome'
  };
  
  watchID: ?number = null;

  geoMonitoring() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        var initialPosition = JSON.stringify(position);
        this.setState({initialPosition});
      },
      (error) => alert(`We couldn't get your location`),
      {enableHighAccuracy: false, timeout: 20000, maximumAge: 90000000000000}
    );
    this.watchID = navigator.geolocation.watchPosition((position) => {
      var lastPosition = JSON.stringify(position);
      this.setState({lastPosition});

      let point = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };
    });
  }

  // TODO: check fences once confirmed that user is logged in (this function calls saveLocation)
  checkFences(currentPoint) {
    let phoneNumber = '1234567'
    AuthAxios({
      url: `/api/labels/?id=${phoneNumber}`
    })
    .then(({data}) => {
      let fences = data;
      for (let fence of fences) {
        let proximity = distanceBetweenCoordinates(currentPoint.lat, currentPoint.lng, fence.lat, fence.lng);
        const radius = 0.5;
        if (proximity < radius) {
          this.setState({currentlyAt: fence.label}, () => this.saveLocation());
          break;  
        } else {
          this.setState({currentlyAt: 'Elsewhere'}, () => this.saveLocation());
        }
      }
    })
    .catch((error) => {
      alert(`Oh no, we couldn't get your fences!`)
    })
  }

  saveLocation () {
    console.log('Save location called', this.state.currentlyAt)
    let location = {};
    let position = JSON.parse(this.state.lastPosition);
    location.lat = position.coords.latitude;
    location.lng = position.coords.longitude;
    location.label = this.state.currentlyAt;
    location.user = '1234567'

    AuthAxios({
      url: `/api/users/location`,
      method: 'put',
      data: location
    })
    .then(response => console.log('Location updated'))
    .catch(error => alert('Location not updated'))
  }

  componentDidMount() {
    this._setupGoogleSignin();
  };

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID);
  }

  // if (this.state.user) {
  //   return (
  //     <View>
  //       <PushController />
  //       <HomeFavorite />
  //     </View>
  //   )
  // }


  render() {
    const { navigate } = this.props.navigation;
    return (
      <Text>Safer SplashScreen</Text> 
    );
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
      if (user === null) {//TODO: set up conditional navigation here based on whether use is null
        navigate('SignUp');
      } else {
        navigate('HomePageTabs');
      }
      this.setState({user});
    }
    catch(err) {
      console.log("Play services error", err.code, err.message);
    }
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
