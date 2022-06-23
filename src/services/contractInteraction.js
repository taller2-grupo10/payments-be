const ethers = require("ethers");
const getDepositHandler = require("../handlers/getDepositHandler");
const { Wallet } = require("./../database/models/index");
const { Transaction } = require("./../database/models/index");

const getContract = (config, wallet) => {
  return new ethers.Contract(config.contractAddress, config.contractAbi, wallet);
};

const deposit = ({ config }) => async (senderWallet, amountToSend) => {
  const basicPayments = await getContract(config, senderWallet);
  const creation = new Date();
  const tx = await basicPayments.deposit({
    value: await ethers.utils.parseEther(amountToSend).toHexString(),
  });
  tx.wait(1).then(
    async receipt => {
      //console.log("Transaction mined");
      const firstEvent = receipt && receipt.events && receipt.events[0];
      //console.log(firstEvent);
      if (firstEvent && firstEvent.event == "DepositMade") {
        const newTransaction = await Transaction.create({
          transactionHash: firstEvent.transactionHash,
          blockNumber: firstEvent.blockNumber,
          blockHash: firstEvent.blockHash,
          from: senderWallet.address,
          to: firstEvent.address,
          amount: amountToSend,
          createdAt: creation,
          updatedAt: new Date(),
        });
      } else {
        console.error(`Payment not created in tx ${tx.hash}`);
      }
    },
    error => {
      const reasonsList = error.results && Object.values(error.results).map(o => o.reason);
      const message = error instanceof Object && "message" in error ? error.message : JSON.stringify(error);
      console.error("reasons List");
      console.error(reasonsList);

      console.error("message");
      console.error(message);
    },
  );
  return tx;
};

const getDepositReceipt = ({}) => async depositTxHash => {
  return Transaction.findByPk(depositTxHash);
};

const getWalletBalance = ({ config }) => async walletId => {
  const provider = new ethers.providers.InfuraProvider("kovan", process.env.INFURA_API_KEY);
  const wallet = await Wallet.findByPk(walletId);
  const balance = await provider.getBalance(wallet.address);
  return { balance: ethers.utils.formatEther(balance), address: wallet.address, id: wallet.id };
};

module.exports = dependencies => ({
  deposit: deposit(dependencies),
  getDepositReceipt: getDepositReceipt(dependencies),
  getWalletBalance: getWalletBalance(dependencies),
});
