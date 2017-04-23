import React, { Component } from 'react';
import FriendMap from './FriendMap.js';
import HomeFavorite from './HomeFavorite.js';
import { AppState, View, Button, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { endpoint, googleAuthWebClientId } from './endpoint.js';
import {GoogleSignin, GoogleSigninButton} from 'react-native-google-signin';
import PushController from './FCM/PushController.js';
import AuthAxios from './AuthAxios.js';
import axios from 'axios';
import { distanceBetweenCoordinates } from './geoFencingUtils/geoFencingUtils.js'


export default class HomeScreen extends Component {
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
    title: 'Favorites'
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
      this.checkFences(point);
    });
  }

  checkFences(currentPoint) {
    AuthAxios({
      url: `/api/labels`
    })
    .then(({data}) => {
      let fences = data;
      console.log(data)
      for (let fence of fences) {
        let proximity = distanceBetweenCoordinates(currentPoint.lat, currentPoint.lng, fence.lat, fence.lng);
        const radius = 0.5;
        if (proximity < radius) {
          console.log(`You're in`, fence.label)
          this.setState({currentlyAt: fence.label}, () => this.saveLocation());
          break;  
        } else {
          console.log('getting in the else block')
          this.setState({currentlyAt: 'Elsewhere'}, () => this.saveLocation());
        }
      }
    })
    .catch((error) => {
      console.log(`Oh no, we couldn't get your fences!`)
    })
  }

  saveLocation () {
    console.log('Save location called', this.state.currentlyAt)
    let position = JSON.parse(this.state.lastPosition);
    let location = {
      lat: position.coords.latitude,
      long: position.coords.longitude,
      currentLabel: this.state.currentlyAt
    };

    AuthAxios({
      url: `/api/user`,
      method: 'put',
      data: location
    })
    .then(response => console.log('Location updated'))
    .catch(error => console.log('Location not updated'))
  }

  componentDidMount() {
    this._setupGoogleSignin();

    this.geoMonitoring();
  };

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID);
  }

  render() {
    const { navigate } = this.props.navigation;
    // if (!this.state.user && this.state.phoneNumber.length < 10) {
    //   return (
    //     <View>
    //       <Text style={{fontSize: 25}}>
    //         Please enter your phone number
    //       </Text>
    //       <TextInput
    //         style={{fontSize: 25}}
    //         onChangeText={(text) => this.setState( {phoneNumber: text} )}
    //         // placeholder='Insert Group Name'
    //         value={this.state.text}
    //       />
    //     </View>
    //   )
    // }
    // if (!this.state.user && this.state.phoneNumber.length === 10) {
    //   return (
    //       <View style={styles.container}>
    //         <Text>Your phone number: {this.state.phoneNumber}</Text>
    //         <GoogleSigninButton
    //           style={{width: 312, height: 48}}
    //           color={GoogleSigninButton.Color.Dark}
    //           size={GoogleSigninButton.Size.Wide}
    //           onPress={() => { this._signIn(); }}
    //         />
    //       </View>
    //   );
    // }
    // if (this.state.user) {
      return (
        <View style={styles.container}>
          <PushController />
          <HomeFavorite navigate={navigate}/>
        </View>
      )
    // }
  }

          // <TouchableOpacity onPress={() => {this._signOut()} }>
          //   <Text>Log Out</Text>
          // </TouchableOpacity>

  async _setupGoogleSignin() {
    try {
      await GoogleSignin.hasPlayServices({ autoResolve: true });
      await GoogleSignin.configure({
        webClientId: googleAuthWebClientId, //replace with client_id from google-services.json
        offlineAccess: false
      });

      const user = await GoogleSignin.currentUserAsync();
      this.setState({user});
    }
    catch(err) {
      console.log("Play services error", err.code, err.message);
    }
  }

  _signIn() {
    GoogleSignin.signIn()
    .then((user) => {
      this.setState({user: user});
    })
    .then(() => {
      AuthAxios({
        url: '/api/user/',
        method: 'put',
        data: {phoneNumber: this.state.phoneNumber}
      })
    })
    .then((result) => {
      console.log('phone number updated: ', result);
    })
    .catch((err) => {
      console.log('Sign in error: ', err);
    })
    .done();
  }

  _signOut() {
    GoogleSignin.revokeAccess()
    .then(() => {
      GoogleSignin.signOut();
      console.log('Google access revoked');
    })
    .then(() => {
      this.setState({user: null});
    })
    .done();
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    backgroundColor: '#F5FAFF',
    flex: 1,
    // flexDirection: 'column',
    // justifyContent: 'center',
    // alignItems: 'center',
  }
});
