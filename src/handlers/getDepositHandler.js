function schema() {
  return {
    params: {
      type: "object",
      properties: {
        txHash: {
          type: "string",
        },
      },
    },
    required: ["txHash"],
    response: {
      200: {
        description: "Success",
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
  };
}

function handler({ contractInteraction }) {
  return async function (req, reply) {
    const body = await contractInteraction.getDepositReceipt(req.params.txHash);
    if (!body) {
      return reply.code(404).send({ error: "Transaction not found" });
    }
    return reply.send(body);
  };
}

module.exports = { handler, schema };
