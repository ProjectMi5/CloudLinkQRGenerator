/* This function generates QR-Codes for the MI5 Demonstrator and saves them as images

Parameters:
    ordercount:      Describes the number of QR-Codes to generate. When undefined the generator will generate one code
    input:           Sample: generateQRCode(100, {"recipeId":10051,"parameters":[40, 100, 80, 20]}, function(){});
*/
var Encoder = require('qr').Encoder;
var md5 = require('md5');
var randomID = require("random-id");
var events = require('events');
var util = require("util");
var encoder = new Encoder;


var MI5_QR = exports.MI5_QR = function(){
    events.EventEmitter.call(this);
};

util.inherits(MI5_QR, events.EventEmitter);


encoder.on('error', function (err) {
    //console.log('err',err);
});
encoder.on('end', function (end) {
    //console.log('end');
});

MI5_QR.prototype.generateQRCode = function(ordercount, input, callback) {

    //Declare variables
    var ID;
    var neworder;
    var neworder_md5;
    var qrinput;
    var targetdirectory = './QR_Codes/';
    var codename;
    var fullpath;
    var dbentry;

    for (i = 0; i < ordercount; i++) {
        ID = randomID();
        neworder = "recipe=" + input.recipeId + "&" + "parameters=" + "[" + input.parameters + "]" + "&" + "ID=" + ID;
        neworder_md5 = md5(neworder);
        qrinput = "http://mi5.itq.de/orderViaQRcode" + neworder_md5;
        codename = "order" + i + "recipe" + input.recipeId;
        fullpath = targetdirectory + codename;
        dbentry = {
            ID: ID,
            recipe: input.recipeId,
            parameters: input.parameters,
            valid: true,
            voucher: neworder_md5
        };
        this.emit('Order generated', dbentry);
        encoder.encode(qrinput, fullpath, options = {dot_size: 5});
    }

    callback();
};
