/**
 * SAPController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
let client = SAPAdapter.getClient();


function getRoles(userType) {
  switch (userType) {
    case "C":
      return {
        orders: {
            c: true,
            r: true,
            u: true,
            d: true
          },
          comments: {
            c: true,
            r: true,
            u: true,
            d: true
          }
      }

      break;

    default:
      break;
  }
  return [{
    test: 'test'
  }]
}
module.exports = {
  login: async function (req, res) {
    let roles = [];

    try {
      if (!req.param('userId') && !req.param('password')) {
        return res.badRequest({
          err: 'bad request params missing'
        })

      }
      let client = SAPAdapter.getClient();
      await client.open();
      let isAlive = await client.ping();
      if (isAlive) {
        let response = await client.call(
          'ZSDJ_USER_VALIDATION_REACTX', {
            USER_ID: req.param('userId'),
            PASSWORD: req.param('password')
          }
        );


        if (response.EMESSAGE === "Authentication failed") {
          res.status(401);
          return res.send({
            err: 'unauthorized',
            token: "",
            currentAuthority: "admin"
          });


        } else {

          if (response.EMESSAGE === "No Sales Order Bom exist") {

            res.status(401);
            return res.send({
              err: 'unauthorized',
              token: "",
              currentAuthority: "admin"
            });

          } else {
            const token = JWTService.issuer({
              user: response.USER_ID
            }, '1 day');
            console.log(response);
            let currentAuthority = "user";
            if (response.USER_TYPE === "S" || response.USER_TYPE === "M" || response.USER_TYPE === "D" || response.USER_TYPE === "C") {
              currentAuthority = "admin";
            }

            return res.ok({
              msg: response,
              roles: getRoles(response.USER_TYPE),
              token: token,
              currentAuthority
            })

          }


        }



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
  validateToken: async function (req, res) {
    let roles = [];
    //console.log(req.connection.remoteAddress);
    console.log({"token":req.param('token')});
    try {
      if (!req.param('token')) {
        return res.badRequest({
          err: 'bad request params missing'
        })

      }
      let client = SAPAdapter.getClient();
      await client.open();
      let isAlive = await client.ping();
      if (isAlive) {
        let response = await client.call(
          'ZSDJ_USER_VAL_TOKEN_SSO_REACT', {
            TOKEN_SSO: req.param('token')
          }
        );
        if (response.EMESSAGE === "Authentication failed") {
          res.status(401);
          return res.send({
            err: 'unauthorized',
            token: "",
            currentAuthority: "admin"
          });


        } else {

          if (response.EMESSAGE === "No Sales Order Bom exist") {

            res.status(401);
            return res.send({
              err: 'unauthorized',
              token: "",
              currentAuthority: "admin"
            });

          } else {
            const token = JWTService.issuer({
              user: response.USER_ID
            }, '2 day');
            //console.log(response);
            //console.log({"validated":response.CUSTOMER});

            SAPAdapter.showMessage("validated", response.CUSTOMER)
            let currentAuthority = "user";
            if (response.USER_TYPE === "S" || response.USER_TYPE === "M" || response.USER_TYPE === "D" || response.USER_TYPE === "C") {
              currentAuthority = "admin";
            }

            return res.ok({
              msg: response,
              roles: getRoles(response.USER_TYPE),
              token: token,
              currentAuthority
            })
            //return res.ok({ token })

          }


        }
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
  getDealerSSO: async function (req, res) {
    console.log(req.param('userId'));
    try {
      if (!req.param('userId')) {
        return res.badRequest({
          err: 'bad request params missing'
        })

      }
      const token = JWTService.issuer({
        user: req.param('userId')
      }, '2 day');
      let client = SAPAdapter.getClient();
      await client.open();
      let isAlive = await client.ping();
      if (isAlive) {
        let response = await client.call(
          'ZSDJ_DEAL_VALIDATION_SSO_REACT', {
            USER_ID: req.param('userId'),
            TOKEN_SSO: token
          }
        );
        if (response.EMESSAGE === "Authentication failed") {
          res.status(401);
          return res.send({
            err: 'unauthorized',
            token: "",
            currentAuthority: "admin"
          });


        } else {

          if (response.EMESSAGE === "No Sales Order Bom exist") {

            res.status(401);
            return res.send({
              err: 'unauthorized',
              token: "",
              currentAuthority: "admin"
            });

          } else {
            const token = JWTService.issuer({
              user: response.USER_ID
            }, '2 day');
           // console.log({"authenticated":response.CUSTOMER});

            SAPAdapter.showMessage("authenticated", response.CUSTOMER)
            let currentAuthority = "user";
            if (response.USER_TYPE === "S" || response.USER_TYPE === "M" || response.USER_TYPE === "D" || response.USER_TYPE === "C") {
              currentAuthority = "admin";
            }

            //return res.ok({ msg: response, roles: getRoles(response.USER_TYPE), token: token, currentAuthority })
            return res.ok({
              token
            })

          }


        }
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
  fetchType: async function (req, res) {
      let data;
    try {
        if (!req.param('userId') && !req.param('password')) {
            return res.badRequest({
              err: 'bad request params missing'
            })
    
          }
        let client = SAPAdapter.getClient();
          await client.open();
        let isAlive = await client.ping();
        if (isAlive) {
          let response = await client.call(
            'ZSDJ_USER_TYPE_REACT', {
                USER_ID: req.param('userId')
              }
          );
          let roles = {};
          let userType = (typeof response !== undefined) ? "" : response.USER_TYPE;
          switch (userType) {
            case "C":
              roles = {
                comments: {
                  c: false,
                  r: true,
                  u: true,
                  d: true
                }
              };
              break;
            case "D":
              roles = {
                comments: {
                  c: true,
                  r: true,
                  u: true,
                  d: true
                }
              };
              break;
            default:
              break;
          }
          data = {
            user: response,
            roles
          };
          return res.ok({
            data
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

  printFile: async function (req, res) {
    try {
        if (!req.param('orderId')) {
            return res.badRequest({
              err: 'Params missing'
            })
          }
        let client = SAPAdapter.getClient();
          await client.open();
        let isAlive = await client.ping();
        if (isAlive) {
          let response = await client.call(
            'Z_PRINT_ORDER_BY_ID', {
                ORDER_ID: req.param('orderId')
              }
          );
          if (response && response.FILE) {

            console.log({"Order ID Downloaded": response.ORDER_ID});
            

            var stream = require('stream');
            var fileContents = Buffer.from(response.FILE, 'base64'); // 



            var readStream = new stream.PassThrough();
            readStream.end(fileContents);

            res.set("Content-disposition", "attachment; filename=" + req.param('orderId') + ".pdf");
            res.set('Content-Type', 'application/pdf');

            readStream.pipe(res);



            //res.pipe(binary, 'binary');
            //return res.ok({ response.FILE });

          } else {
            return res.ok({
              data: "NO FILE FOUND"
            });
          }
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
  currentUser: async function (req, res) {
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
