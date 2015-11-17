/* This function generates QR-Codes for the MI5 Demonstrator and saves them as images555555555555555

Parameters:
    ordercount:      Describes the number of QR-Codes to generate. When undefined the generator will generate one code
    input:           Sample: generateQRCode(100, {"recipeId":10051,"parameters":[40, 100, 80, 20]}, function(){});
*/
var Encoder = require('qr').Encoder;
var md5 = require('md5');
var randomID = require("random-id");
var encoder = new Encoder;

var rest = require('./rest');

generateQRCode = function(ordercount, input) {

    //Declare variables
    var ID;
    var neworder;
    var neworder_md5;
    var qrinput;
    var targetdirectory = './../QR_Codes/';
    var codename;
    var fullpath;
    var dbentry;

    for (i = 0; i < ordercount; i++) {
        ID = randomID();
        neworder = "recipe=" + input.recipeId + "&" + "parameters=" + "[" + input.parameters + "]" + "&" + "ID=" + ID;
        neworder_md5 = md5(neworder);e
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

        rest.validateVoucher(dbentry);
        try{
            encoder.encode(qrinput, fullpath, options = {dot_size: 5});
        } catch (err){
            console.log('tryerr',err);
        }

    }

    encoder.on('end', function(){
        console.log('ende');
    });
    encoder.on('err', function(err){
        console.log('err', err);
    });
};
generateQRCode(12, {"recipeId":10051,"parameters":[40, 100, 80, 20]});