
const rfc = require('node-rfc').Client;
const moment = require('moment-timezone');

const abapSystem = {
    user: process.env.user,
    passwd: process.env.passwd,
    ashost: process.env.ashost,
    sysnr: process.env.sysnr,
    client: process.env.client,
    saprouter: ''
  
  }
module.exports.getClient= function () {
    return new rfc(abapSystem);
}
module.exports.resetConn= function (client) {
    return new Promise(function (resolve, reject) {
        client.connect((err)=>{
            if(err){
                reject(err);
            }
            resolve(client);
    
          });
    });
    
}


module.exports.showError= function (exception) {
    let error=moment().utc().tz('America/Detroit').toString() +" | "+exception.key;
    console.log({error});
}
