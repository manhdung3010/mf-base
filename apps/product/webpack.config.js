const base = require('../../config/webpack.base');
module.exports = base({
  appName: 'product',
  exposes: { './App': './src/App' },
  remotes: { shell: 'shell@http://localhost:3000/remoteEntry.js' },
  port: 3005,
}); 