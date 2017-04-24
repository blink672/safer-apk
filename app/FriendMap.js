import React, { Component } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import MapView from 'react-native-maps';

const styles = StyleSheet.create({
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
      console.log(data);
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
          <Text>{this.state.showLabel ? 'Show Only Label' : 'Show GPS'}</Text>
        </View>
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
        <Text style={{textAlign: 'center', fontSize: 20}}>{data.first} checked in at:</Text> 
        <Text style={{textAlign: 'center', fontSize: 20}}>{data.currentLabel}</Text>
        <Text style={{textAlign: 'center', fontSize: 20}}>5 min ago</Text>
      </View>
    );
  }

  renderGPS(data) {
    const { region } = this.props;
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
}

let styles = StyleSheet.create({
  container: {
    flex: 1,
    // flexDirection: 'column',
    // justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  switchContainer: {
    // flex: 1,
    height: 25,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  nameContainer: {
    // justifyContent: 'right',
    flex: 1,
    marginBottom: 8,
  },
  name: {
    fontSize: 23,
    // marginBottom: 8,
    textAlign: 'center',
  },
  year: {
    textAlign: 'right',
  },
  listView: {
    flex: 1,
    paddingTop: 10,
    backgroundColor: '#F5FCFF',
  },
  separator: {
    flex: 1,
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#8E8E8E',
  },
});