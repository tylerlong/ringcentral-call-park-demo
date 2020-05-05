import * as RingCentral from 'ringcentral';
import {RingCentralCallControl, SessionMessage} from 'ringcentral-call-control';

const sdk = new RingCentral({
  appKey: process.env.RINGCENTRAL_CLIENT_ID,
  appSecret: process.env.RINGCENTRAL_CLIENT_SECRET,
  server: process.env.RINGCENTRAL_SERVER_URL,
});

const platform = sdk.platform();

(async () => {
  await platform.login({
    username: process.env.RINGCENTRAL_USERNAME,
    extension: process.env.RINGCENTRAL_EXTENSION,
    password: process.env.RINGCENTRAL_PASSWORD,
  });
  const rcCallControl = new RingCentralCallControl({sdk: sdk});
  const subscription = sdk.createSubscription();
  subscription.setEventFilters([
    '/restapi/v1.0/account/~/extension/~/telephony/sessions',
  ]);
  subscription.on(
    subscription.events.notification,
    (sessionMessage: SessionMessage) => {
      rcCallControl.onNotificationEvent(sessionMessage);
    }
  );
  subscription.register();
})();

// platform
//   .login({
//     username: '...',
//     password: '...'
//   })
//   .then(function() {
//     var rcCallControl = new RingCentralCallControl({ sdk: sdk });
//     var subscription = sdk.createSubscription();

//     subscription.setEventFilters(['/restapi/v1.0/account/~/extension/~/telephony/sessions']);
//     subscription.on(subscription.events.notification, function(msg) {
//        rcCallControl.onNotificationEvent(msg)
//     });
//     subscription.register();
//     return rcCallControl;
//   })
