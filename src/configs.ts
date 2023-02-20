import packageInfo from '../package.json';

const Configs = {
  AsyncStorage: {
    len: 'len',
    googleToken: 'googleToken',
  },
  ClientId: {
    expo: '7590485089-4lqi0di68ov722nrirqglhipiqutqaec.apps.googleusercontent.com',
    ios: '7590485089-ghf3nngi2bb6f8pupsr59soced7974kq.apps.googleusercontent.com',
  },
  google: {
    userinfoEndpoint: 'https://www.googleapis.com/userinfo/v2/me',
    revocationEndpoint: 'https://oauth2.googleapis.com/revoke',
    tokenEndpoint: 'https://www.googleapis.com/oauth2/v4/token',
  },

  version: packageInfo.version,
};

export default Configs;
