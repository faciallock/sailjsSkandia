"use strict";
/**
 * OrderController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */



// create new client

let client = SAPAdapter.getClient();



module.exports = {
  findOne: async function (req, res) {
    try {
      if (req.query.imInd == "") {

        return res.serverError({
          msg: "There has been an error with the provided credentials, please log in again to continue."
        });

      }
      await client.open();
      let isAlive = await client.ping();
      if (isAlive) {
        let result = await client.call(
          'ZSD_GET_ORDER_DETAILSX', {
            IM_SALESDOCU: req.query.orderId,
            IM_USER: 'CSR'
          }
        );
        return res.ok({
          msg: result
        });
      } else {
        return res.serverError({
          msg: "Backend is down!"
        });
      }

    } catch (e) {
      SAPAdapter.showError(e);
      return res.serverError({
        msg: e.key
      })
    }

  },
  getBOM: async function (req, res) {

    try {
      await client.open();
      let isAlive = await client.ping();
      if (isAlive) {
        let result = await client.call(
          'ZSD_BOM_LIST', 
          {
            IM_SALESDOCU: req.query.orderId,
            IM_ITEMNO: req.query.lineItemNumber
          }
        );
        return res.ok({
          msg: result
        });
      } else {
        return res.serverError({
          msg: "Backend is down!"
        });
      }

    } catch (e) {
      SAPAdapter.showError(e);
      return res.serverError({
        msg: e.key
      })
    }


    

  },



  getPromotionListByName: async function (req, res) {
    try {
      let objectSearch = {};

      if (req.query.startSearch) {
        objectSearch = {
          IIM_NAME: req.query.iimName,
          IIM_START_SEARCH: 'X'
        };

      } else {
        objectSearch = {
          IIM_NAME: req.query.iimName
        };
      }
      console.log({
        objectSearch
      });
      await client.open();
      let isAlive = await client.ping();
      if (isAlive) {
        let result = await client.call(
          'Z_GET_CUSTOMERLIST_BYNAME', 
          objectSearch
        );
        return res.ok({
          msg: result
        });
      } else {
        return res.serverError({
          msg: "Backend is down!"
        });
      }

    } catch (e) {
      SAPAdapter.showError(e);
      return res.serverError({
        msg: e.key
      })
    }

  },
  getPromotionList: async function (req, res) {
    try {
      await client.open();
      let isAlive = await client.ping();
      if (isAlive) {
        let result = await client.call(
          'Z_GET_PROMOTION_LIST', 
          {
            IIM_KUNNR: req.query.iimKunnr
          }
        );
        return res.ok({
          msg: result
        });
      } else {
        return res.serverError({
          msg: "Backend is down!"
        });
      }

    } catch (e) {
      SAPAdapter.showError(e);
      return res.serverError({
        msg: e.key
      })
    }

  },
  getPromotionDetails: async function (req, res) {
    try {
      await client.open();
      let isAlive = await client.ping();
      if (isAlive) {
        let result = await client.call(
          'Z_GET_PROMOTION_DETAILS', 
          {
            PROMO_NO: req.query.promoNo,
            PROMO_SEQ_NO: req.query.promoSeqNo
          }
        );
        return res.ok({
          msg: result
        });
      } else {
        return res.serverError({
          msg: "Backend is down!"
        });
      }

    } catch (e) {
      SAPAdapter.showError(e);
      return res.serverError({
        msg: e.key
      })
    }
   

  },



  getInventory: async function (req, res) {

    try {
      await client.open();
      let isAlive = await client.ping();
      if (isAlive) {
        let result = await client.call(
          'ZSD_INV_LIST', 
          {
            IM_SALESDOCU: req.query.orderId
          }
        );
        return res.ok({
          msg: result
        });
      } else {
        return res.serverError({
          msg: "Backend is down!"
        });
      }

    } catch (e) {
      SAPAdapter.showError(e);
      return res.serverError({
        msg: e.key
      })
    }
   

  },

  search: async function (req, res) {
    try {
      if (req.body.UserIndicator == "") {

        return res.serverError({
          msg: "There has been an error with the provided credentials, please log in again to continue."
        });
      
      }
      await client.open();
      let isAlive = await client.ping();
      if (isAlive) {
        let result = await client.call(
          'ZGET_PENDING_SORDERS_CUSTOMERX', 
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
            IM_ORDER_DATE_TO: req.body.OrderDateTo    
          }
        );
        return res.ok({
          msg: result
        });
      } else {
        return res.serverError({
          msg: "Backend is down!"
        });
      }

    } catch (e) {
      SAPAdapter.showError(e);
      return res.serverError({
        msg: e.key
      })
    }

  },



  createComment: async function (req, res) {


    try {
      if (!req.param('orderId') && !req.param('comment') && !req.param('userName')) {
        return res.badRequest({
          err: 'bad request params missing'
        })

      }
      await client.open();
      let isAlive = await client.ping();
      if (isAlive) {
        let result = await client.call(
          'ZSD_MODIFY_SOLOG_REACT', 
          {
            IM_SALESDOCU: req.param('orderId'),
            IM_ZCOMMENT: req.param('comment'),
            IM_ERNAM: req.param('userName')
          }
        );
        return res.ok({
          msg: result
        });
      } else {
        return res.serverError({
          msg: "Backend is down!"
        });
      }

    } catch (e) {
      SAPAdapter.showError(e);
      return res.serverError({
        msg: e.key
      })
    }
  



  },
  findOrdersByUser: async function (req, res) {
    try {
      if (req.query.imInd == "") {

        return res.serverError({
          msg: "There has been an error with the provided credentials, please log in again to continue."
        });

      }
      await client.open();
      let isAlive = await client.ping();
      if (isAlive) {
        let result = await client.call(
          'ZGET_PENDING_SORDERS_CUSTOMERX', { IM_IND: req.query.imInd, IM_CUSTNO: '', IM_USERNAME: req.query.userName}
        );
        return res.ok({
          msg: result
        });
      } else {
        return res.serverError({
          msg: "Backend is down!"
        });
      }

    } catch (e) {
      SAPAdapter.showError(e);
      return res.serverError({
        msg: e.key
      })
    }
  }


};
