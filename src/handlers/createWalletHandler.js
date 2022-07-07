function schema() {
  return {
    response: {
      201: {
        description: "Success",
        type: "object",
        properties: {
          id: { type: "integer" },
          address: { type: "string" },
        },
      },
    },
  };
}

function handler({ walletService }) {
  return async function (req, reply) {
    const body = await walletService.createWallet();
    return reply.code(201).send(body);
  };
}

module.exports = { handler, schema };
