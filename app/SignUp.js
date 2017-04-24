import React, { Component } from 'react';
import { View, Button, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import {GoogleSignin, GoogleSigninButton} from 'react-native-google-signin';
import FriendMap from './FriendMap.js';
import AuthAxios from './AuthAxios.js';

export default class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: 
      phoneNumber: '',
    };
  };

  static navigationOptions = {
    title: 'Sign Up',
    headerVisible: false
  };

  watchID: ?number = null;


  componentDidMount() {
    this.geoMonitoring();
  }

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

      // let point = {
      //   lat: position.coords.latitude,
      //   lng: position.coords.longitude,
      // };


  saveLocation () {
    console.log('Save location called', this.state.currentlyAt)
    let location = {};
    let position = this.state.lastPosition;
    location.lat = position.coords.latitude;
    location.lng = position.coords.longitude;
    location.label = this.state.currentlyAt;

    AuthAxios({
      url: `/api/users/location`,
      method: 'put',
      data: location
    })
    .then(response => console.log('Location updated'))
    .catch(error => alert('Location not updated'))
  }

  _signIn() {
    GoogleSignin.signIn()
    .then((user) => {
      this.setState({user: user});
    })
    .then(() => {
      return AuthAxios({
        url: '/api/user/',
        method: 'put',
        data: {phoneNumber: this.state.phoneNumber}
      })
    })
    .then(() => {
      console.log('in sign up:: ', this.state.user);
      this.checkFences(point); //TODO: move this to fire once a user is logged in
    })
    .catch((err) => {
      console.log('Sign in error: ', err);
    })
    .done(() => {
      this.props.navigation.navigate('AddFence');
    });
  }


  render() {
    const { navigate } = this.props.navigation;
    return (
      <View>
        <Text style={{fontSize: 25}}>
          Please enter your phone number
        </Text>
        <TextInput
          style={{fontSize: 25}}
          onChangeText={(text) => this.setState( {phoneNumber: text} )}
          // placeholder='Insert Group Name'
          value={this.state.text}
        />

        {(this.state.phoneNumber.length === 10) && (
          <View style={styles.container}>
            <Text>Your phone number: {this.state.phoneNumber}</Text>
            <GoogleSigninButton
              style={{width: 312, height: 48}}
              color={GoogleSigninButton.Color.Dark}
              size={GoogleSigninButton.Size.Wide}
              onPress={() => { this._signIn(); }}
            />
          </View>
        )}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start'
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'auto'
  },
  description: {
    fontSize: 14,
    textAlign: 'auto'
  }

});

