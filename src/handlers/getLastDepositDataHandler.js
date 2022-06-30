function schema() {
    return {
      params: {},
    };
  }
  
  function handler({ contractInteraction }) {
    return async function (req, reply) {
      const body = await contractInteraction.getLastDepositData();
      return reply.code(200).send(body);
    };
  }
  
  module.exports = { handler, schema };
  