import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, Switch, Button } from 'react-native';
import styles from './styles.js';
import MapView from 'react-native-maps';
import AuthAxios from './AuthAxios.js';

const dariostyles = StyleSheet.create({
  mapContainer: {
    ...StyleSheet.absoluteFillObject,
    height: 400,
    width: 400,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

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

  static navigationOptions = ({navigation}) => ({
    title: navigation.state.params.data.first
  });

  render() {
    const { data } = this.props.navigation.state.params;
    if(data.showSetting === 'GPS' && data.currentLabel === 'Elsewhere') {return this.renderElsewhere(data)}
    if(data.showSetting === 'GPS') { return this.renderGPS(data); }
    if(data.showSetting === 'label') { return this.renderLabel(data); }
    if(data.showSetting === 'pending') { return this.renderPending(data); }
  }

  render() {
    return (
      <View style={styles.container}>
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
        <Text style={styles.friendMapText}>Friend request still pending...</Text>
      </View>
    );
  }

  renderLabel(data) {
    return (
      <View style={styles.friendMapContainer}>
        <Button title='Let me know when they get home' onPress={() => {this.subscribeTo(data)}} />
        <Text style={styles.friendMapText}>{data.first} checked in at:</Text> 
        <Text style={styles.friendMapText}>{data.currentLabel}</Text>
        <Text style={styles.friendMapText}>5 min ago</Text>
      </View>
    );
  }

  renderGPS(data) {
    const { region } = this.props;
    return (
      <View style={styles.friendMapContainer}>
        <Button title='Let me know when they get home' onPress={() => {this.subscribeTo(data)}} />
        <Text style={styles.friendMapText}>Checked In At:</Text>
        {this.renderMapView(data)}
        <Text style={styles.friendMapText}>{data.currentLabel} 12 min Ago.</Text>
      </View>
    );
  }

  renderMapView(data) {
    return (
      <View style={dariostyles.mapContainer}>
        <MapView
          style={dariostyles.map}
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
  }ß

  renderElsewhere(data) {
    return (
      <View style={dariostyles.mapContainer}>
        <MapView
         style={dariostyles.map}
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