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
        type: "integer",
      },
    },
  };
}

function handler({ contractInteraction }) {
  return async function (req, reply) {
    const body = await contractInteraction.getWalletBalance(req.params.id);
    reply.code(200).send(body);
  };
}

module.exports = { handler, schema };
