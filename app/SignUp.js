import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import {GoogleSignin, GoogleSigninButton} from 'react-native-google-signin';
import AuthAxios from './AuthAxios.js';
import styles from './styles.js';

export default class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: '',
      phoneNumber: '',
    };
  };

  static navigationOptions = {
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
    .catch(error => console.log('Location not updated in SignUp: ', error));
  }

  _signIn() {
    const phoneNumber = this.state.phoneNumber;
    if (phoneNumber.length !== 10) { return alert('Phone number needs to be 10 digits'); }
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
      this.props.navigation.navigate('AddFence', {SignUp: true});
    });
  }


  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.signUpContainer}>
        <Text style={styles.signUpText}> SAFER </Text>
        <Text style={styles.signUpText}>
          Please enter your phone number
        </Text>
        <TextInput
          style={styles.signUpText}
          onChangeText={(text) => this.setState( {phoneNumber: text} )}
          maxLength = {10}
          value={this.state.text}
          underlineColorAndroid={'black'}
        />

          <View style={styles.googleContainer}>
              <GoogleSigninButton
                style={{width: 312, height: 48, alignItems: 'center'}}
                color={GoogleSigninButton.Color.Dark}
                size={GoogleSigninButton.Size.Wide}
                onPress={() => this._signIn() }
              />
          </View>

      </View>
    )
  }
};