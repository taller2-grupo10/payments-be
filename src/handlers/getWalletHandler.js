function schema() {
  return {
    params: {
      type: "object",
      properties: {
        id: {
          type: "integer",
        },
      },
    },
    required: ["id"],
    response: {
      200: {
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
    const body = await walletService.getWalletData(req.params.id);
    reply.code(200).send(body);
  };
}

module.exports = { handler, schema };
