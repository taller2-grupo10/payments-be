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
