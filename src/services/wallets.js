const ethers = require("ethers");
const { Wallet } = require("./../database/models/index"); //Aca llamamos a la instancia de la tabla de la bd Wallet

const getDeployerWallet = ({ config }) => async () => {
  const provider = new ethers.providers.InfuraProvider(config.network, config.infuraApiKey);
  const wallet = ethers.Wallet.fromMnemonic(config.deployerMnemonic).connect(provider);
  console.log("Deployer wallet" + wallet.address);
  return wallet;
};

const createWallet = () => async () => {
  const provider = new ethers.providers.InfuraProvider("kovan", process.env.INFURA_API_KEY);
  // This may break in some environments, keep an eye on it
  const wallet = ethers.Wallet.createRandom().connect(provider);
  const new_wallet = await Wallet.create({
    address: wallet.address, // d-pons: agregado persistencia de datos
    privateKey: wallet.privateKey,
    createdAt: new Date(),
    updatedAt: new Date(),
  });
  const result = {
    id: new_wallet.id,
    address: new_wallet.address,
    //privateKey: new_wallet.privateKey,
  };
  return result;
};

const getWalletsData = () => async () => {
  const wallets = await Wallet.findAll({ attributes: { exclude: ["privateKey"] } }); // d-pons: busqueda en la bd
  return wallets;
};

const getWalletData = () => async id => {
  const wallet = await Wallet.findByPk(id, { attributes: { exclude: ["privateKey"] } }); // d-pons: busqueda en la bd
  return wallet;
};


const getWallet = ({}) => async (index) => {
  const provider = new ethers.providers.InfuraProvider("kovan", process.env.INFURA_API_KEY);
  const account = await Wallet.findByPk(index)
   
  return new ethers.Wallet(account.privateKey, provider); 

};

module.exports = ({ config }) => ({
  createWallet: createWallet({ config }),
  getDeployerWallet: getDeployerWallet({ config }),
  getWalletsData: getWalletsData({ config }),
  getWalletData: getWalletData({ config }),
  getWallet: getWallet({ config }),
});
