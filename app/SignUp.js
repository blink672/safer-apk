import React, { Component } from 'react';
import { View, Button, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import {GoogleSignin, GoogleSigninButton} from 'react-native-google-signin';
import FriendMap from './FriendMap.js';
import AuthAxios from './AuthAxios.js';

export default class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: '',
      phoneNumber: '',
    };
  };

  static navigationOptions = {
    title: 'Sign Up',
    headerVisible: false
  };

  saveLocation () {
    let position = this.props.navigation.state.params.location;
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
    .catch((err) => {
      console.log('Sign in error: ', err);
    })
    .then(() => {
      this.saveLocation();
    })
    .catch((err) => {
      console.log('Error saving location to db: ', err);
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

