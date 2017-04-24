import React from 'react';
import { StyleSheet } from 'react-native';

module.exports = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  centerContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
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
  switchContainer: {
    height: 25,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  friendMapContainer: {
    marginTop: 10,
  },
  nameContainer: {
    flex: 1,
    marginBottom: 8,
  },
  settingContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    backgroundColor: '#F5FCFF',
  },
  name: {
    fontSize: 23,
    textAlign: 'left',
  },
  label: {
    fontSize: 18,
    textAlign: 'left',
  },
  addName: {
    fontSize: 20,
    textAlign: 'center',
  },
  switchText: {
    fontSize: 15,
  },
  friendMapText: {
    textAlign: 'center',
    fontSize: 20,
  },
  createGroupText: {
    fontSize: 20,
  },
  phoneNumber: {
    textAlign: 'center',
  },
  groupName: {
    fontSize: 23,
    textAlign: 'center',
  },
  button: {

  },
  listView: {
    paddingTop: 10,
    backgroundColor: '#F5FCFF',
  },
  settingText: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'auto'
  },
  settingDescription: {
    fontSize: 14,
    textAlign: 'auto'
  },
});