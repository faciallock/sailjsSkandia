/**
 * SAPController
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
    login: async function (req, res) {
        try{
        if (!req.param('userId') && !req.param('userId') && !req.param('type')) {
            return res.badRequest({ err: 'bad request params missing' })

        }
            client.invoke('ZSDJ_USER_VALIDATION_REACT',
            { USER_ID: req.param('userId'), PASSWORD: req.param('password'), IM_CSR: req.param('type') },
            //{ USER_ID: 'BOVERTON', PASSWORD: 'SAPTEST', IM_CSR: 'C' },
            function (err, response) {
                if (err) {
                    return console.error('Error invoking STFC_STRUCTURE:', err);
                    res.serverError({ err: "true :( " + err });
                }
                //console.log('Result STFC_STRUCTURE:', res);
                if (response.EMESSAGE ==="Authentication failed"){
                    res.status(401);
                    return res.send({ err: 'unauthorized', token: "", currentAuthority: "admin"});
                    

                }else{
                    const token = JWTService.issuer({ user: response.USER_ID }, '1 day');
                    //return res.ok(token);
                    return res.ok({ msg: response, token: token, currentAuthority: "admin" })
                }
                
            }); 
        }
        catch (err) {
            return res.serverError(err);
        }
       
    },
    currentUser: async function(req, res){
        const payload = {
            $desc: "",
            $params: {
                pageSize: {
                    desc: 'test',
                    exp: 2,
                },
            },
            $body: {
                name: 'Serati Ma',
                avatar: 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png',
                userid: '00000001',
                notifyCount: 12,
            },
            name: 'Skandia User',
            avatar: 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png',
            userid: '00000001',
            notifyCount: 12
        };
        return res.ok(payload);

    }
  

};

