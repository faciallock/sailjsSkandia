/**
 * OrderController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
var rfc = require('node-rfc');
/* var abapSystem = {
    user: 'amurugesan',
    passwd: 'amurugesan9',
    ashost: '10.0.0.25',
    sysnr: '00',
    client: '330',
    saprouter: ''
}; */

var abapSystem = {
    user: process.env.user,
    passwd: process.env.passwd,
    ashost: process.env.ashost,
    sysnr: process.env.sysnr,
    client: process.env.client,
    saprouter: ''

}
console.log(process.env.user);
// create new client
var client = new rfc.Client(abapSystem);
client.connect(function (err) {
    if (err) { // check for login/connection errors
        return console.error('could not connect to server', err);
    } else {
        console.log(process.env.user);
        return console.error('Connected');
    }



});
module.exports = {
    findOne: async function (req, res) {
        try{
        client.invoke('ZSD_GET_ORDER_DETAILSX',
            { IM_SALESDOCU: req.query.orderId, IM_USER: 'CSR' },
            function (err, response) {
                if (err) {
                    console.error('Error invoking STFC_STRUCTURE:', err);

                    client.close();
                    client.connect(function (err) {
                        if (err) {
                            console.error('could not connect to server', err);
                        } else {
                            console.error('Connected');
                        }
                    });
                    return res.serverError({msg:"Error"});
                }
                else{
                    return res.ok({ msg: response })

                }
            });
        }catch(e){
            console.log(e);
            return res.ok({ msg: e })
        }
        
    },
    getBOM: async function (req, res) {
        try {
            client.invoke('ZSD_BOM_LIST',
                { IM_SALESDOCU: req.query.orderId, IM_ITEMNO: req.query.lineItemNumber},
                function (err, response) {
                    if (err) {
                        console.error('Error invoking STFC_STRUCTURE:', err);
    
                        client.close();
                        client.connect(function (err) {
                            if (err) {
                                console.error('could not connect to server', err);
                            } else {
                                console.error('Connected');
                            }
                        });
                        return res.serverError({msg:"Error"});
                    }
                    else{
                        return res.ok({ msg: response })
    
                    }
                });
        } catch (e) {
            console.log(e);
            return res.ok({ msg: e })
        }

    },

    
    
    getPromotionListByName: async function (req, res) {
        try {
            

            let objectSearch={}

            if(req.query.startSearch){
                objectSearch={ IIM_NAME: req.query.iimName,IIM_START_SEARCH:'X' };

            }else{
                objectSearch={ IIM_NAME: req.query.iimName };
            }
            console.log({objectSearch});

            client.invoke('Z_GET_CUSTOMERLIST_BYNAME',
                    objectSearch,
                function (err, response) {
                    if (err) {
                        console.error('Error invoking STFC_STRUCTURE:', err);
    
                        client.close();
                        client.connect(function (err) {
                            if (err) {
                                console.error('could not connect to server', err);
                            } else {
                                console.error('Connected');
                            }
                        });
                        return res.serverError({msg:"Error"});
                    }
                    else{
                        return res.ok({ msg: response })
    
                    }
                });
        } catch (e) {
            console.log(e);
            return res.ok({ msg: e })
        }

    },
    getPromotionList: async function (req, res) {
        try {
            client.invoke('Z_GET_PROMOTION_LIST',
                { IIM_KUNNR: req.query.iimKunnr },
                function (err, response) {
                    if (err) {
                        console.error('Error invoking STFC_STRUCTURE:', err);
    
                        client.close();
                        client.connect(function (err) {
                            if (err) {
                                console.error('could not connect to server', err);
                            } else {
                                console.error('Connected');
                            }
                        });
                        return res.serverError({msg:"Error"});
                    }
                    else{
                        return res.ok({ msg: response })
    
                    }
                });
        } catch (e) {
            console.log(e);
            return res.ok({ msg: e })
        }

    },
    getPromotionDetails: async function (req, res) {
        try {
            client.invoke('Z_GET_PROMOTION_DETAILS',
                { PROMO_NO: req.query.promoNo, PROMO_SEQ_NO:req.query.promoSeqNo },
                function (err, response) {
                    if (err) {
                        console.error('Error invoking STFC_STRUCTURE:', err);
    
                        client.close();
                        client.connect(function (err) {
                            if (err) {
                                console.error('could not connect to server', err);
                            } else {
                                console.error('Connected');
                            }
                        });
                        return res.serverError({msg:"Error"});
                    }
                    else{
                        return res.ok({ msg: response })
    
                    }
                });
        } catch (e) {
            console.log(e);
            return res.ok({ msg: e })
        }

    },


    
    getInventory: async function (req, res) {
        try {
            client.invoke('ZSD_INV_LIST',
                { IM_SALESDOCU: req.query.orderId },
                function (err, response) {
                    if (err) {
                        console.error('Error invoking STFC_STRUCTURE:', err);
    
                        client.close();
                        client.connect(function (err) {
                            if (err) {
                                console.error('could not connect to server', err);
                            } else {
                                console.error('Connected');
                            }
                        });
                        return res.serverError({msg:"Error"});
                    }
                    else{
                        return res.ok({ msg: response })
    
                    }
                });
        } catch (e) {
            console.log(e);
            return res.ok({ msg: e })
        }

    },

    search: async function (req, res) {
        try {

                // IM_IND Indicator for role
                // IM_CUSTNO for Dealers
                // IM_USERNAME username
                // IM_ORDER_NO Order number
                // IM_SIDEMARK Sidemark
                // IM_CUSTOMER Customer number (when looking up for a customer)
                // IM_NAME Name
                // IM_ORDER_DATE Order Date
                // IM_SHIPPED_DATE Shipped date
                // IM_SHIP_BY Ship by
                // IM_TOTAL_PRICE Total price
                // IM_STATUS Status

           if(req.body.UserIndicator == ""){

                    return res.serverError({msg:"There has been an error with the provided credentials, please log in again to continue."});

           }

            client.invoke('ZGET_PENDING_SORDERS_CUSTOMERX',
                {    
                   IM_IND: req.body.UserIndicator,
                   IM_CUSTNO: req.body.DealerNumber,
                   IM_USERNAME: req.body.UserName,

                   IM_ORDER_NO: req.body.OrderNumber, 
                   IM_SIDEMARK: req.body.Sidemark,
                   IM_CUSTOMER: req.body.CustomerNumber, 
                   IM_NAME: req.body.Name, 
                   IM_ORDER_DATE: req.body.OrderDate,
                   IM_SHIPPED_DATE: req.body.ShippedDate,
                   IM_SHIP_BY: req.body.ShippedBy,
                   IM_TOTAL_PRICE: req.body.TotalPrice,
                   IM_STATUS: req.body.Status,
                   IM_SHIPPED_DATE_TO: req.body.ShippedDateTo,
                   IM_ORDER_DATE_TO:req.body.OrderDateTo
                
                
                },


                function (err, response) {
                    if (err) {
                        console.error('Error invoking STFC_STRUCTURE:', err);
    
                        client.close();
                        client.connect(function (err) {
                            if (err) {
                                console.error('could not connect to server', err);
                            } else {
                                console.error('Connected');
                            }
                        });
                        return res.serverError({msg:"Error"});
                    }
                    else{
                        return res.ok({ msg: response })
    
                    }
                });
        } catch (e) {
            console.log(e);
            return res.ok({ msg: e })
        }

    },



    createComment: async function (req, res) {
        console.log(req.query);
        console.log(req.param('comment'));
        try {
            if (!req.param('orderId') && !req.param('comment') && !req.param('userName')) {
                return res.badRequest({ err: 'bad request params missing' })

            }
            client.invoke('ZSD_MODIFY_SOLOG_REACT',
                { IM_SALESDOCU: req.param('orderId'), IM_ZCOMMENT: req.param('comment'), IM_ERNAM: req.param('userName')  },
                function (err, response) {
                    if (err) {
                        console.error('Error invoking STFC_STRUCTURE:', err);
    
                        client.close();
                        client.connect(function (err) {
                            if (err) {
                                console.error('could not connect to server', err);
                            } else {
                                console.error('Connected');
                            }
                        });
                        return res.serverError({msg:"Error"});
                    }
                    else{
                        return res.ok({ msg: response })
    
                    }
                });
        } catch (e) {
            console.log(e);
            return res.ok({ msg: e })
        }
    },
    findOrdersByUser: async function (req, res){
        console.log(req.query.imInd);
        console.log(req.query.userName);


        if(req.query.imInd == ""){

            return res.serverError({msg:"There has been an error with the provided credentials, please log in again to continue."});

       }



        try {
            client.invoke('ZGET_PENDING_SORDERS_CUSTOMERX',
            { IM_IND: req.query.imInd,IM_CUSTNO: '', IM_USERNAME: req.query.userName },
            function (err, response) {
                if (err) {
                    console.error('Error invoking STFC_STRUCTURE:', err);

                    client.close();
                    client.connect(function (err) {
                        if (err) {
                            console.error('could not connect to server', err);
                        } else {
                            console.error('Connected');
                        }
                    });
                    return res.serverError({msg:"Error"});
                }
                else{
                    return res.ok({ msg: response })

                }
                
            });
        }catch(e){
            console.log(e);
            return res.ok({ msg: e })
        } 
    }
    

};


