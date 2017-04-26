import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, Switch, Button } from 'react-native';
import styles from './styles.js';
import MapView from 'react-native-maps';
import AuthAxios from './AuthAxios.js';

export default class FriendMap extends Component {
  constructor(props) {
    super(props);
    let {showFriendSetting} = this.props.navigation.state.params.data;
    let showLabel = (showFriendSetting === 'label' ? true : false); 

    this.state =  {
      showLabel: showLabel
    };
    this.switchChange = this.switchChange.bind(this);
    this.subscribeTo = this.subscribeTo.bind(this);
  }

  static navigationOptions = ({navigation}) => ({
    title: navigation.state.params.data.first
  });

  switchChange() {
    this.setState({
      showLabel: !this.state.showLabel
    })
    let {id} = this.props.navigation.state.params.data;
    let privacy = (this.state.showLabel ? 'GPS' : 'label');
    AuthAxios({
      url: `/api/friends/${id}`,
      method: 'put',
      data: {privacy: privacy}
    })
    .then(({data}) => {
    })
    .catch(err => {
      console.log(err);
    }) 
  }

  subscribeTo(data, privacy) {
    AuthAxios({
      url: '/api/subscribe',
      method: 'post',
      data: {phoneNumber: data.phoneNumber}
    })
    .catch((err) => {
      console.error('There was an error subscribing to the friend: ', err);
    })
  }

  addFriend (contact) {
    AuthAxios({
      url: '/api/friends',
      method: 'post',
      data: {phoneNumber: contact.phoneNumber}
    }).catch((error) => {
      console.log('There was an error in adding your friend: ', error);
      return error;
    });

    this.setState({
      buttonPressed: true
    });
  }

  whichPageToRender() {
    const { data } = this.props.navigation.state.params;
    if(data.showSetting === 'GPS' && data.currentLabel === 'Elsewhere') {return this.renderElsewhere(data)}
    if(data.showSetting === 'GPS') { return this.renderGPS(data); }
    if(data.showSetting === 'label') { return this.renderLabel(data); }
    if(data.showSetting === 'pending') { return this.renderPending(data); }
    if(data.showSetting === 'request') { return this.renderRequest(data); }
  }

  render() {
    const { data } = this.props.navigation.state.params;
    return (
      <View style={styles.container}>
        { (data.showSetting === 'GPS' || data.showSetting === 'label') &&
          <Button title='Let me know when they get home' onPress={() => {this.subscribeTo(data)}} /> }
        <View style={styles.switchContainer}>
          <Switch
              onValueChange={this.switchChange}
              value={this.state.showLabel}
            />
          <Text style={styles.switchText}>{this.state.showLabel ? 'Show Only Label' : 'Show GPS'}</Text>
        </View>
        {this.whichPageToRender()}
      </View>
    )
  }

  renderPending(data) {
    return (
      <View style={styles.friendMapContainer}>
        <Button title='Confirm Friend' onPress={() => this.addFriend(data)} />
        <Text style={styles.friendMapText}>You have a pending friend request from {data.first} {data.last}!</Text>
      </View>
    );
  }

  renderRequest(data) {
    return (
      <View style={styles.friendMapContainer}>
          <Text style={styles.friendMapText}>You've sent a friend request to {data.first} {data.last}.</Text>
      </View>
    );
  }

  renderLabel(data) {
    let path;
    if( data.currentLabel === 'School' ) { path = require('./Image/school.png') };
    if( data.currentLabel === 'Home' ) { path = require('./Image/home.png') };
    if( data.currentLabel === 'Office' ) { path = require('./Image/office.png') };
    if( data.currentLabel === 'Bar' ) { path = require('./Image/bar.png') };
    if( data.currentLabel === 'Gym' ) { path = require('./Image/gym.png') };
    return (
      <View style={styles.friendMapContainer}>
        <Text style={styles.friendMapText}>{data.first} checked in at:</Text> 
        <Image
          source={path}
          style={styles.labelImage}
        />
        <Text style={styles.friendMapText}>{data.currentLabel} 5 min ago</Text>
      </View>
    );
  }

  renderGPS(data) {
    const { region } = this.props;
    return (
      <View style={styles.friendMapContainer}>
        <Text style={styles.friendMapText}>Checked In At:</Text>
        {this.renderMapView(data)}
        <Text style={styles.friendMapText}>{data.currentLabel} 12 min Ago.</Text>
      </View>
    );
  }

  renderMapView(data) {
    return (
      <View style={styles.mapContainer}>
        <MapView
          style={styles.map}
          region={{
            latitude: data.lat,
            longitude: data.long,
            latitudeDelta: 0.04,
            longitudeDelta: 0.04,
          }}
        >
          <MapView.Marker 
            title={data.currentLabel}
            coordinate={{
             latitude: data.lat,
             longitude: data.long
            }}
          />
          <MapView.Circle
            center={{
              latitude: data.lat,
              longitude: data.long
            }}
            radius={300}
            fillColor={'#AED8CA', 'rgba(174,216,202,0.5)'}
          />
        </MapView>
      </View>
    );
  }

  renderElsewhere(data) {
    return (
      <View style={styles.mapContainer}>
        <MapView
         style={styles.map}
         region={{
          latitude: data.lat,
          longitude: data.long,
          latitudeDelta: 0.04,
          longitudeDelta: 0.04,
          }}
        >
          <MapView.Marker 
           title={data.currentLabel}
           coordinate={{
             latitude: data.lat,
             longitude: data.long
            }}
          />
        </MapView>
      </View>
    );
  }

};