function schema() {
  return {
    params: {
      type: "object",
      properties: {
        senderId: {
          type: "integer",
        },
        amountInEthers: {
          type: "string",
        },
      },
    },
    required: ["senderId", "amountInEthers"],
  };
}

function handler({ contractInteraction, walletService }) {
  return async function (req) {
    senderId = req.body.senderId;
    const wallet = await walletService.getWallet(senderId);
    const amountInEthers = req.body.amountInEthers;    
    return contractInteraction.deposit(senderId, wallet, amountInEthers);
  };
}

module.exports = { schema, handler };
