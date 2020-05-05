import * as RingCentral from 'ringcentral';
// import { RingCentralCallControl } from 'ringcentral-call-control';

// console.log(RingCentral);
// console.log(RingCentral());

const sdk = new RingCentral({
  appKey: process.env.RINGCENTRAL_CLIENT_ID,
  appSecret: process.env.RINGCENTRAL_CLIENT_SECRET,
  server: process.env.RINGCENTRAL_SERVER_URL,
});

console.log(sdk);

// const platform = sdk.platform();

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
