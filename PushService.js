import PushNotification from 'react-native-push-notification';
import {Platform} from 'react-native';
import Config from 'react-native-config';

export default class PushService {
    static init() {
        PushService.onRegistration = null
        PushService.tab = null
    }

    static setCallbacks(onRegistration, onNotification) {
        PushService.onRegistration = onRegistration;
        PushService.onNotification = onNotification;
    }

    static configure() {
        PushNotification.configure({

            onRegister: function(token) {
                if (PushService.onRegistration) {
                    PushService.onRegistration(token)
                }
            },

            // (required) Called when a remote or local notification is opened or received
            onNotification: function(notification) {
                if (PushService.onNotification) {
                    PushService.onNotification(notification)
                }
                // process the notification

                // required on iOS only (see fetchCompletionHandler docs: https://facebook.github.io/react-native/docs/pushnotificationios.html)
                if(Platform.os === 'iOS') notification.finish(PushNotification.FetchResult.NoData);
            },

            // ANDROID ONLY: GCM Sender ID (optional - not required for local notifications, but is need to receive remote push notifications)
            senderID: Config.SENDER_ID,

            // IOS ONLY (optional): default: all - Permissions to register.
            permissions: {
                alert: true,
                badge: true,
                sound: true,
            },

            // Should the initial notification be popped automatically
            // default: true
            popInitialNotification: true,

            /**
             * (optional) default: true
             * - Specified if permissions (ios) and token (android and ios) will requested or not,
             * - if not, you must call PushNotificationsHandler.requestPermissions() later
             */
            requestPermissions: true,
        })
    }
}

PushService.init();