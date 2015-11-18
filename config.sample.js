/**
 * Configuration
 */
var config = {};

// Secure Config
config.auth = {}; // used with request - keep object properties user and password!
config.auth.user = 'foo';
config.auth.password = 'bar';


config.http = {};

config.rest = {};
config.rest.host = 'https://mi5.itq.de';
config.rest.getTasks = 'getTasks';
config.rest.getOrdersByStatus = 'getOrdersByStatus';
config.rest.updateOrderStatus = 'updateOrderStatus';
config.rest.updateOrder = 'updateOrder';

config.qr = {};
config.qr.url = "http://foo.bar.xy/qr";
config.qr.target = "./QR_Codes/"; // relative to the file that calls generator.js

// Run on localhost
if(process.env.TEST){
  config.rest.host = 'http://localhost:3001';
  config.auth.user = 'foo';
  config.auth.password = 'bar';
  config.rest.placeOrder = 'placeOrder';
}

module.exports = config;