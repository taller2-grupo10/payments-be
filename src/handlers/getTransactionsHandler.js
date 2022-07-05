function schema() {
  return {
    params: {},
  };
}

function handler({ contractInteraction }) {
  return async function (req, reply) {
    const body = await contractInteraction.getTransactions();
    return reply.send(body);
  };
}

module.exports = { handler, schema };
