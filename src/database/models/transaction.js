"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Transaction.init(
    {
      transactionHash: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      blockNumber: DataTypes.STRING,
      blockHash: DataTypes.STRING,
      from: DataTypes.STRING,
      to: DataTypes.STRING,
      amount: DataTypes.STRING,
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "Transaction",
    },
  );
  return Transaction;
};
