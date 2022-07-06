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
            transactionHash: { type: "string" },
            blockNumber: { type: "string" },
            blockHash: { type: "string" },
            from: { type: "string" },
            to: { type: "string" },
            amount: { type: "string" },
            createdAt: { type: "string" },
            updatedAt: { type: "string" },
          },
        },
      },
    },
  };
}

function handler({ contractInteraction }) {
  return async function (req, reply) {
    const body = await contractInteraction.getTransactions();
    return reply.send(body);
  };
}

module.exports = { handler, schema };
