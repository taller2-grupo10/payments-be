require("dotenv").config();
const network = "kovan";
const deployArtifact = require(`../deployments/${network}/BasicPayments`);
const deployerMnemonic = process.env.MNEMONIC;
const infuraApiKey = process.env.INFURA_API_KEY;
const PORT = process.env.PORT || 7000;
const HOST = process.env.HOST || "0.0.0.0";


module.exports = {
  contractAddress: deployArtifact.address,
  contractAbi: deployArtifact.abi,
  deployerMnemonic,
  infuraApiKey,
  network,
  PORT,
  HOST,
};
