var ids = {
  facebook: {
    clientID: 'get_your_own',
    clientSecret: 'get_your_own',
    callbackURL: 'http://127.0.0.1:1337/auth/facebook/callback'
  },
  twitter: {
    consumerKey: 'get_your_own',
    consumerSecret: 'get_your_own',
    callbackURL: "http://127.0.0.1:1337/auth/twitter/callback"
  },
  github: {
    clientID: 'get_your_own',
    clientSecret: 'get_your_own',
    callbackURL: "http://127.0.0.1:1337/auth/github/callback"
  },
  google: {
    clientID: 'get_your_own',
    clientSecret: 'get_your_own',
    callbackURL: 'http://127.0.0.1:1337/auth/google/callback'
  },
  instagram: {
    clientID: '63e3941cb3594ed09282597981132ca0',
    clientSecret: '7f24636d7676463aa0815abab6a569b4',
    callbackURL: 'localhost:3000/'
  }
};

module.exports = ids;