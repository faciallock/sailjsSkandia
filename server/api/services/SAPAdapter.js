/* var Db = require('mongodb').Db;
var Server = require('mongodb').Server;
var dbPort = 27017;
var dbHost = 'localhost';
var dbName = 'CatDatabase';
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

/* var client = new rfc.Client(abapSystem);
client.connect(function (err) {
    if (err) { // check for login/connection errors
        return console.error('could not connect to server', err);
    } else {
        return console.error('Connected');
    }
});
 */


var mysql = require('mysql');
var client;
module.exports = {
    getClient: function () {
        if (client) return client;
        client = new rfc.Client(abapSystem);
        return client;
        /* pool = mysql.createPool({
            host: 'localhost',
            user: 'root',
            password: 'chanaka',
            database: 'shared_adult'
        });
        return pool; */
    }
};

/* var SAPAdapter = function () {
};

module.exports = SAPAdapter;

SAPAdapter.getClient = function () {
    if (typeof SAPAdapter.client === 'undefined') {
        SAPAdapter.init();
    }
    return SAPAdapter.client;
}

SAPAdapter.init=function() {
    SAPAdapter.client = new rfc.Client(abapSystem);
    console.log(SAPAdapter.client);
    SAPAdapter.client.connect(function (err) {
        if (err) { // check for login/connection errors
            return console.error('could not connect to server', err);
        } else {
            return console.error('Connected');
        }
    });
}; */

/* module.exports = SAPAdapter;

DataBase.GetDB = function () {
    if (typeof DataBase.db === 'undefined') {
        DataBase.InitDB();
    }
    return DataBase.db;
} */
/* 
DataBase.InitDB = function () {
    DataBase.db = new Db(dbName, new Server(dbHost, dbPort, {}, {}), { safe: false, auto_reconnect: true });

    DataBase.db.open(function (e, d) {
        if (e) {
            console.log(e);
        } else {
            console.log('connected to database :: ' + dbName);
        }
    });
}

DataBase.Disconnect = function () {
    if (DataBase.db) {
        DataBase.db.close();
    }
}

DataBase.BsonIdFromString = function (id) {
    var mongo = require('mongodb');
    var BSON = mongo.BSONPure;
    return new BSON.ObjectID(id);
} */

/* var MongoClient = require('mongodb').MongoClient; */
/* var rfc = require('node-rfc');
var abapSystem = {
    user: 'amurugesan',
    passwd: 'amurugesan9',
    ashost: '10.0.0.25',
    sysnr: '00',
    client: '330',
    saprouter: ''
};

var SAPAdapter = function () {

    var client = null;
    var instance = 0;

    async function connect() {

        /* SAPAdapter.client == new rfc.Client(abapSystem);
        console.log(SAPAdapter.client);
        SAPAdapter.client.connect(function (err) {
            if (err) { // check for login/connection errors
                return console.error('could not connect to server', err);
            } else {
                return console.error('Connected');
            }
        });

        try {
            let _client = new rfc.Client(abapSystem);
            _client.connect(function (err) {
                if (err) { // check for login/connection errors
                    return console.error('could not connect to server', err);
                } else {
                    return _client;// console.error('Connected');
                }
            });
            /* let url = 'mongodb://myurl.blablabla';
            let _db = await MongoClient.connect(url);

            return _db
        } catch (e) {
            return e;
        }
    }

    async function Get() {
        try {
            instance++;     // this is just to count how many times our singleton is called.
            console.log(`SAPAdapter called ${instance} times`);

            if (client != null) {
                console.log(`client connection is already alive`);
                return client;
            } else {
                console.log(`getting new client connection`);
                client = await connect();
                return client;
            }
        } catch (e) {
            return e;
        }
    }

    return {
        Get: Get
    }
}


module.exports = SAPAdapter(); */