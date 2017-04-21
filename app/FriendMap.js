import React, { Component } from 'react';
/*import { MapView } from 'react-native-maps';*/
import { View, Text, StyleSheet, Image, Switch, Button } from 'react-native';
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

  switchChange() {
    this.setState({
      showLabel: !this.state.showLabel
    })
    let {id} = this.props.navigation.state.params.data;
    let privacy = (this.state.showLabel ? 'GPS' : 'Label');
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

  subscribeTo(data) {
    AuthAxios({
      url: '/api/subscribe',
      method: 'post',
      data: {phoneNumber: data.phoneNumber}
    })
    .then((response) => {
      console.log('response after subscribing: ', response);
    })
    .catch((err) => {
      console.error('There was an error subscribing to the friend: ', err);
    })
  }

  whichPageToRender () {
    const { data } = this.props.navigation.state.params;
    if(data.showSetting === 'GPS') { return this.renderGPS(data); }
    if(data.showSetting === 'label') { return this.renderLabel(data); }
    if(data.showSetting === 'pending') { return this.renderPending(data); }
  }

  render() {
    return (
      <View>
      <Switch
          onValueChange={this.switchChange}
          value={this.state.showLabel}
        />
        <Text>{this.state.showLabel ? 'Show Only Label' : 'Show GPS'}</Text>
        {this.whichPageToRender()}
      </View>
    )
  }

  renderPending(data) {
    return (
      <View style={{marginTop: 10}}>
        <Text style={{textAlign: 'center', fontSize: 20}}>Friend request still pending...</Text>
      </View>
    );
  }

  renderLabel(data) {
    return (
      <View style={{marginTop: 10}}>
        <Button title='Let me know when they get home' onPress={() => {this.subscribeTo(data)}} />
        <Text style={{textAlign: 'center', fontSize: 20}}>{data.first} checked in at:</Text> 
        <Text style={{textAlign: 'center', fontSize: 20}}>{data.currentLabel}</Text>
        <Text style={{textAlign: 'center', fontSize: 20}}>5 min ago</Text>
      </View>
    );
  }

  renderGPS(data) {
    return (
      <View style={{marginTop: 10}}>
        <Button title='Let me know when they get home' onPress={() => {this.subscribeTo(data)}} />
        <Text style={{textAlign: 'center', fontSize: 20}}>Checked In At:</Text>
        <Image
          style={{justifyContent: 'center', height: 350, width: 350}}
          source={require('./Image/HackReactor2.png')}
        />
        <Text style={{textAlign: 'center', fontSize: 20}}>{data.currentLabel} 12 min Ago.</Text>
      </View>
    );
  }
}