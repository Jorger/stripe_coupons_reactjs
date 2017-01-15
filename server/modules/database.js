"use strict";
const MongoClient = require("mongodb").MongoClient,
      esquemas    = {users   : ""};

let conectaMongo = (callback) => {
    let urlMongo = `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@${process.env.MONGO_DB}/stripe_coupons`;
    MongoClient.connect(urlMongo, (err, database) => {
        if(err) throw err;
        esquemas.users = database.collection("users");
        callback(err, database);
    });
};

let closeMongo = () => {
    MongoClient.close();
}

//Para retornar las colecciones...
let coleccion = (esquema) => esquemas[esquema];
module.exports.coleccion = coleccion;
module.exports.conectaMongo = conectaMongo;
module.exports.closeMongo = closeMongo;