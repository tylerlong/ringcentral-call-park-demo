import RingCentral from 'ringcentral';
import {SessionMessage} from 'ringcentral-call-control';

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
  console.log('logged in');

  const r = await platform.get('/account/~/extension?perPage=300');
  const exts = r.json().records;
  const ext1 = exts.filter(
    (ext: {extensionNumber: string}) =>
      ext.extensionNumber === process.env.RINGCENTRAL_EXTENSION
  )[0];
  console.log(JSON.stringify(ext1, null, 2));
  const ext2 = exts.filter(
    (ext: {extensionNumber: string}) =>
      ext.extensionNumber === process.env.RINGCENTRAL_EXTENSION_2
  )[0];
  console.log(JSON.stringify(ext2, null, 2));

  const subscription = sdk.createSubscription();
  subscription.setEventFilters([
    `/restapi/v1.0/account/~/extension/${ext1.id}/telephony/sessions`,
    `/restapi/v1.0/account/~/extension/${ext2.id}/telephony/sessions`,
  ]);
  subscription.on(
    subscription.events.notification,
    (sessionMessage: SessionMessage) => {
      console.log(JSON.stringify(sessionMessage, null, 2));
    }
  );
  subscription.register();

  console.log('read to go');
})();
