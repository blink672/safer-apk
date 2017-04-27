import React from 'react';
import { StyleSheet } from 'react-native';

module.exports = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    backgroundColor: '#F5FCFF',
  },
  centerContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  signUpContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
    backgroundColor: '#F5FCFF',
  },
  mapContainer: {
    // ...StyleSheet.absoluteFillObject,
    height: 350,
    width: 350,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  createGroupContainer: {
    flex: 1,
    paddingLeft: 10,
  },
  splashScreenContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  switchContainer: {
    // paddingTop: 10, 
    paddingLeft: 10,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  friendMapContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    // marginTop: 1,
  },
  nameContainer: {
    flex: 1,
    marginBottom: 10,
    paddingLeft: 10,
    // backgroundColor: 'blue'
  },
  settingContainer: {
    flex: 1,
    padding: 10,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    backgroundColor: '#F5FCFF',
  },
  googleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F5FCFF',
  },
  buttonContainer: {
    backgroundColor: 'black',
    borderStyle: 'solid',
    borderWidth: 5,
    borderRadius: 3,
    margin: 10
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  name: {
    fontSize: 23,
    textAlign: 'left',
    color: 'black',
  },
  label: {
    fontSize: 18,
    textAlign: 'left',
    color: 'black',
    fontStyle: 'italic',
  },
  addName: {
    fontSize: 20,
    textAlign: 'center',
    color: 'black',
  },
  switchText: {
    color: 'black',
    fontSize: 20,
  },
  signUpText: {
    alignItems: 'stretch',
    fontSize: 25,
    color: 'black',
    textAlign: 'center',
  },
  friendMapText: {
    // textAlign: 'center',
    color: 'black',
    fontWeight: 'bold',
    fontSize: 20,
    margin: 10,
  },
  createGroupText: {
    fontSize: 20,
    color: 'black',
  },
  splashScreenText: {
    fontSize: 50,
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
    margin: 10,
  },
  phoneNumber: {
    textAlign: 'center',
    color: 'black',
  },
  groupName: {
    fontSize: 23,
    textAlign: 'center',
    color: 'black',
  },
  button: {

  },
  listView: {
    // flex: 1,
    // flexDirection: 'column',
    padding: 10,
    backgroundColor: '#F5FCFF',
  },
  settingText: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'auto',
    color: 'black',
  },
  settingDescription: {
    fontSize: 14,
    textAlign: 'auto',
    color: 'black',
  },
  fenceAddress: {
    fontSize: 14,
    textAlign: 'auto',
    color: 'black',
    fontStyle: 'italic'
  },
  labelImage: {
    width: 225,
    height: 225,
    alignItems: 'center',
  },
  createGroupTextInput: {
    fontSize: 18,
    textAlign: 'left',
    color: 'black',
  }
});