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
  return async function (req, reply) {
    const wallet = await walletService.getWallet(req.body.senderId);
    const tx = await contractInteraction.deposit(wallet, req.body.amountInEthers, reply);
    reply.send(tx);
  };
}

module.exports = { schema, handler };
