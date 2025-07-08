const base = require('../../config/webpack.base');

module.exports = base({
  appName: 'shell',
  exposes: {
    './AuthContext': './src/context/AuthContext',
    './Store': './src/store',
    './App': './src/App',
  },
  remotes: {
    admin: 'admin@http://localhost:3001/remoteEntry.js',
    auth: 'auth@http://localhost:3002/remoteEntry.js',
    cart: 'cart@http://localhost:3003/remoteEntry.js',
    dashboard: 'dashboard@http://localhost:3004/remoteEntry.js',
    product: 'product@http://localhost:3005/remoteEntry.js',
  },
  port: 3000,
}); 