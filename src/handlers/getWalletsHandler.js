function schema() {
  return {
    params: {},
    response: {
      200: {
        description: "Success",
        type: "array",
        items: {
          type: "object",
          properties: {
            id: { type: "integer" },
            address: { type: "string" },
          },
        },
      },
    },
  };
}

function handler({ walletService }) {
  return async function (req, reply) {
    const body = await walletService.getWalletsData();
    return reply.code(200).send(body);
  };
}

module.exports = { handler, schema };
