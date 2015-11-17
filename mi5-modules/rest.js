/**
 *
 * @type {*|exports|module.exports}
 */
var urljoin = require('url-join');
var request = require('request');
var Promise = require('bluebird');

var config = require('./../config.js');

function rest(){}

rest.prototype.validateVoucher = function(dbentry){
  var options = {
    url:  urljoin(config.rest.host, config.rest.validateVoucher),
    rejectUnauthorized: false, // TODO certificate needs to be bundled correctly
    form: {voucher: JSON.stringify(dbentry)},
    auth: config.auth
  };

  return new Promise(function(resolve, reject){
    request.post(options, function(err, res, body){
      if(err) reject(err);
      try {
        body = JSON.parse(body);
        resolve(body);
      } catch (err){
        console.log(err, body);
        reject('could not validate Voucher');
      }
    });
  });
};

module.exports = new rest();