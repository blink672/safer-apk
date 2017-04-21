import React, { Component } from "react";
import { Platform } from 'react-native';
import FCM, {FCMEvent, RemoteNotificationResult, WillPresentNotificationResult, NotificationType} from "react-native-fcm";
import { endpoint, firebaseClient } from  "../endpoint.js";
import AuthAxios from '../AuthAxios.js';

export default class PushController extends Component {
  constructor(props) {
    super(props);
    //TODO: get user id from sql server upon login
    //and pass it along with props
  };

  componentDidMount() {
    // FCM.requestPermissions(); //iOS only

    FCM.getFCMToken()
    .then((token) => {
      console.log('FCMToken: ', token);
      AuthAxios({
        url: '/api/user',
        method: 'put',
        data: {FCMToken: token},
      })
    }).catch(err => {
      console.error('Error in updating FCM Token: ', err);
    });

    FCM.getInitialNotification()
    .then((notif) => {
      // console.log('initial notification: ', notif);
    });

    this.notificationListener = FCM.on(FCMEvent.Notification, (notif) => {
      if (notif.local_notification) { return; }
      if (notif.opened_from_tray) { return; }
      this.showLocalNotification(notif);
    });

    this.refreshTokenListener = FCM.on(FCMEvent.RefreshToken, (token) => {
      console.log('token (refreshUnsubcribe)', token);
      AuthAxios({
        url: '/user',
        method: 'put',
        data: {FCMToken: token}
      })
      .catch((err) => {
        console.error('There was an error in refreshTokenListener: ', err);
      })
    })
  };

  showLocalNotification(notif) {
    FCM.presentLocalNotification({
      title: notif.title,
      body: notif.body,
      priority: 'high',
      click_action: notif.click_action,
      show_in_foreground: true,
      local: true
    });
  }

  render() {
    return null;
  };
};