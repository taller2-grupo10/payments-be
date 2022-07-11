"use strict";

const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
const config = require("../config/config")[env];
const db = {};
var SequelizeMock = require("sequelize-mock");

let sequelize;
if (process.env.TEST === "true") {
  sequelize = new SequelizeMock();
} else if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

if (process.env.TEST !== "true") {
  fs.readdirSync(__dirname)
    .filter(file => {
      return file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js";
    })
    .forEach(file => {
      const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
      db[model.name] = model;
    });
} else {
  var Wallet = sequelize.define("wallet", {
    id: { primaryKey: true },
    address: "0xd2129D691b5A3aF490e55937e44c60F2D78d400f",
    privateKey: "0x03aa0574be2794a4df3fa87821a9ae7d5f24e75bc1737cf1556766426b68429a",
  });
  Wallet.findByPk = (id, opts) => Wallet.findById(id, opts);
  db["Wallet"] = Wallet;
  var Transaction = sequelize.define("transaction", {
    transactionHash: "hash",
    blockNumber: Sequelize.STRING,
    blockHash: Sequelize.STRING,
    from: Sequelize.STRING,
    to: Sequelize.STRING,
    amount: Sequelize.STRING,
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE,
  });
  Transaction.findByPk = (id, opts) => Transaction.findById(id, opts);
  db["Transaction"] = Transaction;
}

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
