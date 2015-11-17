/**
 * Sample Configuration
 */
var config = {};

config.rest = {};
config.rest.host = 'https://foo.bar.xy';
config.rest.validateVoucher = 'validateVoucher';
config.auth = {}; // used with request - keep object properties user and password!
config.auth.user = 'foo';
config.auth.password = 'bar';

config.qr = {};
config.qr.url = "http://foo.bar.xy/qr";
config.qr.target = "./QR_Codes/"; // relative to the file that calls generator.js

module.exports = config;