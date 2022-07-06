function schema() {
  return {
    body: {
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
    response: {
      201: {
        description: "Success",
        type: "object",
        properties: {
          chainId: { type: "integer" },
          data: { type: "string" },
          from: { type: "string" },
          gasLimit: {
            type: "object",
            properties: {
              hex: { type: "string" },
              type: { type: "string" },
            },
          },
          gasPrice: {
            type: "object",
            properties: {
              hex: { type: "string" },
              type: { type: "string" },
            },
          },
          hash: { type: "string" },
          nonce: { type: "integer" },
          r: { type: "string" },
          s: { type: "string" },
          to: { type: "string" },
          type: { type: "string" },
          v: { type: "integer" },
          value: {
            type: "object",
            properties: {
              hex: { type: "string" },
              type: { type: "string" },
            },
          },
        },
      },
    },
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
