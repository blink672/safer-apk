import React, { Component } from "react";
import { Platform } from 'react-native';
import FCM, {FCMEvent, RemoteNotificationResult, WillPresentNotificationResult, NotificationType} from "react-native-fcm";
import { firebaseClient } from  "../endpoint.js";

export default class PushController extends Component {
  constructor(props) {
    super(props);
  };

  componentDidMount() {
    // FCM.requestPermissions(); //iOS only

    FCM.getFCMToken()
    .then( token => {
      console.log('Token in getFCMToken in PushController.js: ', token);
      this.props.onChangeToken(token);
    });

    FCM.getInitialNotification()
    .then( notif => {
      console.log('initial notification: ', notif);
    });

    this.notificationListener = FCM.on(FCMEvent.Notification, notif => {
      console.log('Notification', notif);
    });
  };

  render() {
    return null;
  };
};