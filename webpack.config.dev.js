/*  Test environment based on, but updated to current packages: 
    - https://semaphoreci.com/community/tutorials/testing-react-components-with-enzyme-and-mocha
    - https://semaphoreci.com/community/tutorials/getting-started-with-tdd-in-react */

var config = require('./webpack.config.js');
config.output.publicPath = '/';
config.output.sourceMapFilename = '[name].[chunkhash].map';
config.devtool = '#eval-cheap-module-source-map';
config.devServer = {
  historyApiFallback: true,
};
/*  necessary for enzyme to work
    http://airbnb.io/enzyme/docs/guides/webpack.html */
config.externals = {
  'react/addons': true,
  'react/lib/ExecutionEnvironment': true,
  'react/lib/ReactContext': true,
};

module.exports = config;
