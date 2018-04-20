/**
 * OrderController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
var rfc = require('node-rfc');
var abapSystem = {
    user: 'amurugesan',
    passwd: 'amurugesan9',
    ashost: '10.0.0.25',
    sysnr: '00',
    client: '330',
    saprouter: ''
};

// create new client
var client = new rfc.Client(abapSystem);
client.connect(function (err) {
    if (err) { // check for login/connection errors
        return console.error('could not connect to server', err);
    } else {
        return console.error('Connected');
    }



});
module.exports = {
    findOne: async function (req, res) {
        try{
        client.invoke('ZSD_GET_ORDER_DETAILS',
            { IM_SALESDOCU: req.query.orderId, IM_USER: 'CSR' },
            function (err, response) {
                if (err) {
                    return console.error('Error invoking STFC_STRUCTURE:', err);
                    res.send({ error: "true :( " + err });
                }
                console.log('Result STFC_STRUCTURE:', res);
                return res.ok({ msg: response })
            });
        }catch(e){
            console.log(e);
        }
        
    },
    findOrdersByUser: async function (req, res){
        console.log(req.query.imInd);
        console.log(req.query.userName);
        try {
        client.invoke('ZGET_PENDING_SORDERS_CUSTOMER',
            { IM_IND: req.query.imInd,IM_CUSTNO: '', IM_USERNAME: req.query.userName },
            function (err, response) {
                if (err) {
                    return console.error('Error invoking STFC_STRUCTURE:', err);
                    res.send({ error: "true :( " + err });
                }
                console.log('Result STFC_STRUCTURE:', response);
                return res.ok({ msg: response })
            });
        }catch(e){
            console.log(e);
        } 
    }
    

};

